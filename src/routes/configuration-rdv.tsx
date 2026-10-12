"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Hourglass,
  Info,
  MessageCircle,
  Plus,
  ShieldCheck,
  TimerReset,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configuration-rdv")({
  head: () => ({
    meta: [
      { title: "Configuration des rendez-vous — Dr Youssef Tafnouti" },
      { name: "description", content: "Maquette privée de configuration du futur système de rendez-vous du cabinet." },
      { property: "og:title", content: "Configuration des rendez-vous — Dr Youssef Tafnouti" },
      { property: "og:description", content: "Maquette privée de configuration du futur système de rendez-vous du cabinet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AppointmentConfiguration,
});

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const DURATIONS = [15, 30, 45, 60];
const BUFFERS = [0, 5, 10, 15];
const MINIMUM_DELAYS = ["2 h", "12 h", "24 h"];
const BOOKING_HORIZONS = [14, 30, 60];

type TimeRange = { start: string; end: string };

const INITIAL_RANGES: Record<string, TimeRange[]> = Object.fromEntries(
  DAYS.map((day) => [day, day === "Samedi" || day === "Dimanche"
    ? [{ start: "09:00", end: "13:00" }]
    : [{ start: "09:00", end: "12:30" }, { start: "14:00", end: "18:00" }]])
);

function AppointmentConfiguration() {
  const [duration, setDuration] = useState(30);
  const [buffer, setBuffer] = useState(5);
  const [minimumDelay, setMinimumDelay] = useState("12 h");
  const [bookingHorizon, setBookingHorizon] = useState(30);
  const [enabledDays, setEnabledDays] = useState(() => new Set(DAYS.slice(0, 6)));
  const [ranges, setRanges] = useState<Record<string, TimeRange[]>>(INITIAL_RANGES);

  function toggleDay(day: string) {
    setEnabledDays((current) => {
      const next = new Set(current);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  function updateRange(day: string, index: number, field: keyof TimeRange, value: string) {
    setRanges((current) => ({
      ...current,
      [day]: (current[day] ?? []).map((range, rangeIndex) =>
        rangeIndex === index ? { ...range, [field]: value } : range
      ),
    }));
  }

  function addRange(day: string) {
    setRanges((current) => ({
      ...current,
      [day]: [...(current[day] ?? []), { start: "14:00", end: "18:00" }],
    }));
  }

  function removeRange(day: string, index: number) {
    setRanges((current) => ({
      ...current,
      [day]: (current[day] ?? []).filter((_, rangeIndex) => rangeIndex !== index),
    }));
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/95">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="size-4" aria-hidden /> Retour au site
          </Link>
          <Badge variant="outline" className="border-primary/30 bg-secondary text-secondary-foreground">
            Maquette privée
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Configuration rendez-vous</p>
          <h1 className="section-title mt-2 text-3xl text-foreground sm:text-4xl">Préparer l’agenda du cabinet</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cet écran présente le futur parcours de configuration. Aucune connexion ni donnée n’est enregistrée.
          </p>
        </div>

        <ol className="mt-10 space-y-5">
          <SetupStep number="1" icon={CalendarCheck} title="Connecter Google Calendar" status="Non connecté">
            <p className="text-sm leading-relaxed text-muted-foreground">
              La connexion permettra de lire les périodes occupées et de générer les créneaux sans afficher les détails privés de l’agenda.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold text-primary">1. Autoriser la connexion</p>
                <Button type="button" variant="outline" disabled className="mt-3 w-full">
                  Se connecter avec Google
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold text-muted-foreground">2. Choisir le calendrier à synchroniser</p>
                <Button type="button" variant="outline" disabled className="mt-3 w-full justify-between font-normal">
                  Disponible après connexion
                  <ChevronDown aria-hidden />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              La connexion se fera sur la page sécurisée de Google. Aucun mot de passe Google ne sera demandé ici.
            </p>
          </SetupStep>

          <SetupStep number="2" icon={MessageCircle} title="WhatsApp du cabinet" status="Non vérifié">
            <div className="mt-1 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Numéro professionnel</Label>
                <Input id="whatsapp-number" type="tel" defaultValue="+216 27 035 389" />
              </div>
              <Button type="button" variant="outline" disabled>Vérifier le numéro</Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">La vérification sera disponible après connexion du service.</p>
          </SetupStep>

          <SetupStep number="3" icon={Clock3} title="Horaires du cabinet" status="Non configuré">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Activez les jours travaillés et composez une ou deux plages, par exemple une le matin et une l’après-midi.
            </p>
            <div className="mt-2 divide-y divide-border rounded-lg border border-border">
              {DAYS.map((day) => {
                const enabled = enabledDays.has(day);
                return (
                  <div key={day} className="grid gap-3 p-3 sm:grid-cols-[7rem_1fr] sm:items-start sm:px-4">
                    <div className="flex min-h-10 items-center justify-between gap-3">
                      <Label htmlFor={`day-${day}`}>{day}</Label>
                      <Switch id={`day-${day}`} checked={enabled} onCheckedChange={() => toggleDay(day)} />
                    </div>
                    {enabled ? (
                      <div className="space-y-2">
                        {(ranges[day] ?? []).map((range, index) => (
                          <div key={`${day}-${index}`} className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2">
                            <Input
                              aria-label={`Début plage ${index + 1} ${day}`}
                              type="time"
                              value={range.start}
                              onChange={(event) => updateRange(day, index, "start", event.target.value)}
                            />
                            <span className="text-xs text-muted-foreground">à</span>
                            <Input
                              aria-label={`Fin plage ${index + 1} ${day}`}
                              type="time"
                              value={range.end}
                              onChange={(event) => updateRange(day, index, "end", event.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              disabled={(ranges[day] ?? []).length === 1}
                              onClick={() => removeRange(day, index)}
                              aria-label={`Supprimer la plage ${index + 1} du ${day}`}
                            >
                              <Trash2 aria-hidden />
                            </Button>
                          </div>
                        ))}
                        {(ranges[day] ?? []).length < 2 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => addRange(day)}>
                            <Plus aria-hidden /> Ajouter une plage
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex min-h-10 items-center text-sm text-muted-foreground">Cabinet fermé</div>
                    )}
                  </div>
                );
              })}
            </div>
          </SetupStep>

          <SetupStep number="4" icon={TimerReset} title="Règles de réservation" status="À définir">
            <div className="grid gap-6 sm:grid-cols-2">
              <OptionGroup icon={Clock3} label="Durée d’un rendez-vous">
                {DURATIONS.map((minutes) => (
                  <OptionButton key={minutes} selected={duration === minutes} onClick={() => setDuration(minutes)}>
                    {minutes} min
                  </OptionButton>
                ))}
              </OptionGroup>
              <OptionGroup icon={TimerReset} label="Temps tampon entre rendez-vous">
                {BUFFERS.map((minutes) => (
                  <OptionButton key={minutes} selected={buffer === minutes} onClick={() => setBuffer(minutes)}>
                    {minutes} min
                  </OptionButton>
                ))}
              </OptionGroup>
              <OptionGroup icon={Hourglass} label="Délai minimum avant réservation">
                {MINIMUM_DELAYS.map((delay) => (
                  <OptionButton key={delay} selected={minimumDelay === delay} onClick={() => setMinimumDelay(delay)}>
                    {delay}
                  </OptionButton>
                ))}
              </OptionGroup>
              <OptionGroup icon={CalendarRange} label="Horizon de réservation">
                {BOOKING_HORIZONS.map((days) => (
                  <OptionButton key={days} selected={bookingHorizon === days} onClick={() => setBookingHorizon(days)}>
                    {days} jours
                  </OptionButton>
                ))}
              </OptionGroup>
            </div>
          </SetupStep>

          <SetupStep number="5" icon={CheckCircle2} title="Tout est prêt" status="Maquette">
            <div className="rounded-lg border border-primary/20 bg-secondary/50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Aucune intégration n’est encore active</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    L’activation finale restera indisponible tant que Google Calendar et WhatsApp ne seront pas connectés.
                  </p>
                  <p className="mt-3 text-xs font-medium text-foreground">
                    Réglages choisis : {duration} min · tampon {buffer} min · délai {minimumDelay} · horizon {bookingHorizon} jours
                  </p>
                </div>
              </div>
            </div>
            <Button type="button" disabled className="mt-4 w-full sm:w-auto">Activer les rendez-vous</Button>
          </SetupStep>
        </ol>

        <div className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          Aucun mot de passe n’est demandé sur cette page et aucune modification n’est sauvegardée.
        </div>
      </div>
    </main>
  );
}

function OptionGroup({ icon: Icon, label, children }: {
  icon: typeof Clock3;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {label}
      </legend>
      <div className="mt-3 grid grid-cols-2 gap-2">{children}</div>
    </fieldset>
  );
}

function OptionButton({ selected, onClick, children }: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button type="button" variant={selected ? "default" : "outline"} onClick={onClick} className="h-10">
      {children}
    </Button>
  );
}

function SetupStep({ number, icon: Icon, title, status, children }: {
  number: string;
  icon: typeof CalendarCheck;
  title: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-[3rem_1fr] sm:p-6">
      <div className="flex size-10 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">{number}</div>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon className="size-5 text-primary" aria-hidden />
            <h2 className="section-title text-xl text-foreground">{title}</h2>
          </div>
          <Badge variant="outline" className={cn("bg-muted text-muted-foreground")}>{status}</Badge>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </li>
  );
}