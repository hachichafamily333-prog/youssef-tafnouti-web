"use client";

import { useState } from "react";
import { fr } from "date-fns/locale";
import {
  BriefcaseBusiness,
  CalendarDays,
  CalendarSync,
  Check,
  Clock3,
  Coffee,
  Info,
  LockKeyhole,
  MessageCircle,
  Timer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PREVIEW_DATES = [
  new Date(2026, 9, 5),
  new Date(2026, 9, 6),
  new Date(2026, 9, 8),
  new Date(2026, 9, 12),
];

const EXAMPLE_SLOTS = [
  { time: "09:20", disabled: false },
  { time: "10:05", disabled: false },
  { time: "14:35", disabled: false },
  { time: "16:10", disabled: true },
];

const AVAILABILITY_RULES = [
  { icon: BriefcaseBusiness, label: "Horaires configurés" },
  { icon: Timer, label: "Durée du rendez-vous" },
  { icon: Coffee, label: "Pauses et indisponibilités" },
  { icon: CalendarSync, label: "Événements Google Calendar" },
];

const STATUS_ITEMS = [
  { label: "Disponible", className: "border-primary/30 bg-secondary text-secondary-foreground" },
  { label: "Sélectionné", className: "border-primary bg-primary text-primary-foreground" },
  { label: "Indisponible", className: "border-border bg-muted text-muted-foreground line-through" },
  { label: "En attente de confirmation", className: "border-primary/30 bg-accent text-accent-foreground" },
  { label: "Confirmé", className: "border-primary/40 bg-primary/10 text-primary" },
  { label: "Refusé", className: "border-destructive/30 bg-destructive/10 text-destructive" },
];

export function AppointmentPreview() {
  const [date, setDate] = useState<Date | undefined>(PREVIEW_DATES[0]);
  const [time, setTime] = useState("10:05");

  return (
    <section id="rendez-vous" className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="gap-1.5 border-primary/30 bg-background text-primary">
            <Info className="size-3.5" aria-hidden />
            Aperçu — disponibilités non synchronisées
          </Badge>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Prendre rendez-vous
          </p>
          <h2 className="section-title mt-2 text-3xl text-foreground sm:text-4xl">
            Préparez votre demande en quelques instants
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Cette interface est une maquette. Les dates et horaires ci-dessous sont uniquement des
            exemples et ne reflètent pas les disponibilités du cabinet.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[1fr_1.2fr]">
          <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <StepHeading number="1" icon={CalendarDays} title="Choisissez une date" />
            <div className="mt-5 flex justify-center overflow-x-auto">
              <Calendar
                mode="single"
                locale={fr}
                selected={date}
                onSelect={setDate}
                defaultMonth={new Date(2026, 9, 1)}
                modifiers={{ preview: PREVIEW_DATES }}
                disabled={(day) => !PREVIEW_DATES.some((item) => item.toDateString() === day.toDateString())}
                className="pointer-events-auto rounded-lg border border-border bg-background [--cell-size:2.5rem]"
              />
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <StepHeading number="2" icon={Clock3} title="Créneaux générés pour cette date" />
            <div className="mt-5 rounded-lg border border-primary/20 bg-secondary/45 p-4">
              <div className="flex items-start gap-3">
                <CalendarSync className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-foreground">Génération automatique après connexion</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Pour chaque date, la liste sera recalculée selon les réglages du docteur et son agenda synchronisé.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {AVAILABILITY_RULES.map(({ icon: RuleIcon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RuleIcon className="size-4 shrink-0 text-primary" aria-hidden />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">Exemples de maquette</p>
              <Badge variant="outline" className="border-border bg-muted text-muted-foreground">Non synchronisés</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {EXAMPLE_SLOTS.map((slot) => (
                <Button
                  key={slot.time}
                  type="button"
                  variant={time === slot.time ? "default" : "outline"}
                  disabled={slot.disabled}
                  onClick={() => setTime(slot.time)}
                  className={cn("h-11", slot.disabled && "line-through")}
                >
                  {time === slot.time && <Check aria-hidden />}
                  {slot.time}
                </Button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Ces heures illustrent seulement l’affichage futur. Elles ne sont ni permanentes, ni réservables.
            </p>

            <div className="mt-8 border-t border-border pt-7">
              <StepHeading number="3" icon={Info} title="Vos coordonnées" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="appointment-name">Nom et prénom</Label>
                  <Input id="appointment-name" placeholder="Votre nom" autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-phone">Téléphone</Label>
                  <Input id="appointment-phone" type="tel" placeholder="+216 __ ___ ___" autoComplete="tel" />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-7">
              <StepHeading number="4" icon={MessageCircle} title="Envoyer la demande" />
              <Button type="button" disabled className="mt-5 h-12 w-full sm:w-auto">
                <LockKeyhole aria-hidden />
                Connexion agenda requise
              </Button>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Le futur bouton « Demander ce rendez-vous sur WhatsApp » utilisera le +216 27 035 389.
                Aucun message ni rendez-vous n’est créé dans cet aperçu.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            États prévus
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {STATUS_ITEMS.map((status) => (
              <span
                key={status.label}
                className={cn("inline-flex min-h-8 items-center rounded-md border px-3 py-1 text-xs font-medium", status.className)}
              >
                {status.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHeading({ number, icon: Icon, title }: { number: string; icon: typeof CalendarDays; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
        {number}
      </span>
      <Icon className="size-5 text-primary" aria-hidden />
      <h3 className="section-title text-lg text-foreground">{title}</h3>
    </div>
  );
}