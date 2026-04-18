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

  return {
    title: data.title,
    description: data.description,
    keywords: data.metadata.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.metadata.ogImage],
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

  return <EventHubTemplate tenant={data} bcvRate={bcvRate} />;
}

