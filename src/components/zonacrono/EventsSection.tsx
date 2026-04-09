import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: "santarosa10k",
    date: "2026-05-15",
    name: "Santa Rosa 10K",
    location: "Carúpano, VE",
    categories: "10K · 5K Caminata",
  },
  {
    id: "bici-race",
    date: "2026-06-22",
    name: "Bici Race Carúpano",
    location: "Carúpano, VE",
    categories: "80K Ruta · 40K MTB",
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleDateString("es-MX", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return { day, month, year };
}

const EventsSection = () => {
  return (
    <section id="eventos" className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-2 border bg-card px-4 py-1.5">
            <span className="h-2 w-2 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Próximos Eventos
            </span>
          </div>
          <h2 className="font-satoshi text-4xl font-black text-foreground md:text-5xl">
            CALENDARIO <span className="text-primary">2026</span>
          </h2>
        </div>

        {/* Event cards */}
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
          {events.map((event) => {
            const { day, month, year } = formatDate(event.date);
            return (
              <div
                key={event.name}
                className="group flex flex-col border bg-card transition-colors hover:border-primary"
              >
                {/* Date header */}
                <div className="flex items-center gap-4 border-b bg-muted px-6 py-4">
                  <div className="text-center">
                    <span className="font-mono text-3xl font-bold text-foreground">
                      {day}
                    </span>
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">
                      {month} {year}
                    </div>
                  </div>
                  <Calendar className="ml-auto h-5 w-5 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-satoshi text-lg font-black uppercase text-foreground">
                    {event.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground">
                    {event.categories}
                  </div>

                  <Link
                    href={`/${event.id}`}
                    className="btn-mechanical mt-6 bg-primary text-center text-primary-foreground flex items-center justify-center"
                  >
                    Ver Evento
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
