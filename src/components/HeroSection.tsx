import Image from "next/image";
import { TenantData } from "@/types/tenant";

interface HeroSectionProps {
  data: TenantData;
}

function HeroSection({ data }: HeroSectionProps) {
    return (
        <section className="relative h-screen w-full flex flex-col justify-end">
            <div
                className="flex flex-col w-full h-full gradient-to-b from-black/100 to-black/100"
                style={{
                    backgroundImage: `url(${data.heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            ></div>
            <div className="absolute top-1/3 md:top-1/2 md:right-[10%] transform -translate-y-1/2 w-fit min-h-64 flex items-center justify-center mb-8 rounded-lg flex flex-col px-8">
                <div className="text-center mb-4">
                    {data.subtitle && (
                      <p className="text-white text-sm md:text-lg mb-2 font-permanent">{data.subtitle}</p>
                    )}
                    <h1 className="text-6xl md:text-8xl font-permanent font-bold text-yellow-500 md:mb-2 drop-shadow-lg text-wrap" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        {data.title}
                    </h1>
                    {data.year && (
                      <p className="text-yellow-500 text-2xl md:text-4xl font-permanent font-bold drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          {data.year}
                      </p>
                    )}
                </div>
                <Image
                    src={data.logo}
                    alt={`${data.name} logo`}
                    width={400}
                    height={400}
                    className="h-50 md:min-h-96 md:w-96 object-contain"
                />
            </div>
            <div className="absolute bottom-32 md:bottom-40 left-4 md:left-8 right-4 md:right-auto max-w-2xl bg-black/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg">
                <p className="text-white text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {data.description}
                </p>
            </div>
        </section>
    );
}

export default HeroSection;
