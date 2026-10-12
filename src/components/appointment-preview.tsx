import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "21627035389";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, je souhaite demander un rendez-vous au cabinet du Dr Youssef Tafnouti. Pouvez-vous me communiquer vos disponibilités ?"
);

export function AppointmentPreview() {
  return (
    <section id="rendez-vous" className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 md:py-20">
        <CalendarDays className="mx-auto size-10 text-primary" aria-hidden />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Rendez-vous au cabinet
        </p>
        <h2 className="section-title mt-3 text-3xl text-foreground sm:text-4xl">
          Demandez votre rendez-vous
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Contactez directement le cabinet par WhatsApp ou par téléphone pour
          connaître les disponibilités et convenir d’un rendez-vous. Votre demande
          doit être confirmée par le cabinet ; aucun créneau n’est réservé automatiquement.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="min-h-12 rounded-full px-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Demander un rendez-vous au cabinet sur WhatsApp"
            >
              <MessageCircle className="size-4" aria-hidden />
              Demander sur WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full px-6">
            <a href="tel:+21627035389">
              <Phone className="size-4" aria-hidden />
              Appeler le cabinet
            </a>
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Aucun renseignement médical sensible ne doit être envoyé via ce formulaire de contact.
        </p>
      </div>
    </section>
  );
}
