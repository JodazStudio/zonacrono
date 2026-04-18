import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { TenantData } from "@/types/tenant";
import EventHubTemplate from "@/components/event-hub/EventHubTemplate";

function getTenantData(tenantId: string): TenantData | null {
  try {
    const filePath = path.join(process.cwd(), "src/data/tenants", `${tenantId}.json`);
    if (!fs.existsSync(filePath)) return null;
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error loading tenant data:", error);
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<{ event: string }> }): Promise<Metadata> {
  const params = await props.params;
  const data = getTenantData(params.event);
  if (!data) return { title: "Not Found" };

  const ogTitle = data.metadata.ogTitle || data.title;
  const ogDescription = data.metadata.ogDescription || data.description;
  const twitterTitle = data.metadata.twitterTitle || ogTitle;
  const twitterDescription = data.metadata.twitterDescription || ogDescription;

  return {
    title: data.title,
    description: data.description,
    keywords: data.metadata.keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: data.metadata.twitterCard || "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
    },
  };
}

async function getExchangeRate() {
  try {
    const res = await fetch("https://api.akomo.xyz/api/exchange-rates", { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const data = await res.json();
    const rate = data.rates.find((r: any) => r.label === "USD");
    if (rate) {
      return parseFloat(rate.value.replace(",", "."));
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
  return 54.20; // Default fallback
}

export default async function EventPage(props: { params: Promise<{ event: string }> }) {
  const params = await props.params;
  const [data, bcvRate] = await Promise.all([
    getTenantData(params.event),
    getExchangeRate()
  ]);

  if (!data) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.title,
    description: data.description,
    startDate: data.eventDate,
    location: {
      '@type': 'Place',
      name: data.location,
      address: data.location
    },
    image: data.metadata.ogImage,
    organizer: {
      '@type': 'Organization',
      name: data.organizers?.[0]?.name || "Zonacrono",
      url: "https://zonacrono.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventHubTemplate tenant={data} bcvRate={bcvRate} />
    </>
  );
}

