import { Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { TenantData } from "@/types/tenant";

interface FooterProps {
  data: TenantData;
}

function Footer({ data }: FooterProps) {
    const navLinks = [
        { name: "Inscripciones", href: data.registrationLink },
        { name: "Información", href: "#informacion" },
        { name: "Patrocinantes", href: "#patrocinantes" },
    ];
    
    return (
        <footer className="bg-brand-dark-purple text-white">
            <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-12 mb-8">
            {/* Brand */}
            <div>
                <Image src={data.logo} alt={`${data.name} Logo`} width={140} height={140} className="object-contain mb-4" />
                <p className="text-white/80 mb-4">
                {data.name} {data.year}. Un evento deportivo que une a la comunidad de {data.location}.
                </p>
                <div className="flex gap-4">
                <a 
                    href="#" 
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white/90"
                    aria-label="Instagram"
                    target="_blank"
                >
                    <Instagram className="w-5 h-5" />
                </a>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-2">
                {navLinks.map((link) => (
                    <li key={link.name}>
                    <a 
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* Contact */}
            <div id="contacto">
                <h4 className="text-lg font-bold mb-4">Contacto</h4>
                <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">
                    {data.location}
                    </span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <a href={`mailto:info@${data.id}.com`} className="text-white/80 hover:text-white transition-colors">
                    info@{data.id}.com
                    </a>
                </li>
                
                </ul>
            </div>
            </div>
            </div>
            <div className="flex flex-col  container mx-auto px-4 text-center text-sm font-normal text-white/80 py-4 gap-4">
                <p>
                © {data.year || new Date().getFullYear()} {data.name}. Todos los derechos reservados.
                </p>
                <p>
                    Desarrollado por{" "}
                    <a
                        href="https://jodaz.xyz"
                        className="font-bold uppercase hover:text-red-400"
                    >
                        jodaz studio
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
