import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  Baby,
  Activity,
  CalendarDays,
  MapPin,
  Mail,
  Phone,
  ShieldPlus,
  Smile,
  Sparkles,
  Stethoscope,
  Map as MapIcon,
} from "lucide-react";
import heroImage from "@/assets/cabinet-hero.jpg";
import cabinetImage from "@/assets/cabinet-detail.jpg";
import { AppointmentPreview } from "@/components/appointment-preview";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr Youssef Tafnouti — Médecin dentiste à Ariana" },
      {
        name: "description",
        content:
          "Cabinet dentaire du Dr Youssef Tafnouti à Ariana, Tunisie. Implantologie, esthétique dentaire, orthodontie invisible, chirurgie, parodontologie, endodontie et pédodontie.",
      },
      { property: "og:title", content: "Dr Youssef Tafnouti — Médecin dentiste à Ariana" },
      {
        property: "og:description",
        content:
          "Cabinet dentaire à Ariana : implantologie, esthétique dentaire, orthodontie invisible et soins dentaires pour toute la famille.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://docteur-youssef-tafnouti.web.app/og-youssef-tafnouti.png?v=2" },
      { property: "og:image:secure_url", content: "https://docteur-youssef-tafnouti.web.app/og-youssef-tafnouti.png?v=2" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Dr Youssef Tafnouti — Cabinet dentaire à Ariana" },
      { name: "twitter:image", content: "https://docteur-youssef-tafnouti.web.app/og-youssef-tafnouti.png?v=2" },
      { property: "og:url", content: "https://docteur-youssef-tafnouti.web.app/" },
    ],
    links: [{ rel: "canonical", href: "https://docteur-youssef-tafnouti.web.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "Dr Youssef Tafnouti — Médecin dentiste",
          address: {
            "@type": "PostalAddress",
            streetAddress: "48 Avenue Habib Bourguiba, 2e étage",
            addressLocality: "Ariana",
            addressCountry: "TN",
          },
          telephone: ["+216 27 035 389", "+216 52 934 545"],
          email: "tafnoutiyoussef@yahoo.fr",
        }),
      },
    ],
  }),
  component: Index,
});

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=48%20Avenue%20Habib%20Bourguiba%2C%20Ariana%2C%20Tunisie";

const NAV_ITEMS = [
  { href: "#presentation", label: "Présentation" },
  { href: "#soins", label: "Soins" },
  { href: "#cabinet", label: "Cabinet" },
  { href: "#rendez-vous", label: "Rendez-vous" },
  { href: "#contact", label: "Contact" },
];

const SOINS = [
  {
    icon: Anchor,
    title: "Implantologie",
    text: "Remplacement des dents absentes par des implants, après un bilan complet et un plan de traitement personnalisé.",
  },
  {
    icon: Sparkles,
    title: "Esthétique dentaire",
    text: "Éclaircissement, facettes et harmonisation du sourire, en fonction de votre situation et de vos attentes.",
  },
  {
    icon: Smile,
    title: "Orthodontie invisible",
    text: "Aligneurs transparents pour redresser les dents en douceur, sans bagues apparentes.",
  },
  {
    icon: Stethoscope,
    title: "Chirurgie dentaire",
    text: "Extractions et actes chirurgicaux réalisés dans le respect des protocoles et du confort du patient.",
  },
  {
    icon: ShieldPlus,
    title: "Parodontologie",
    text: "Prévention et traitement des maladies des gencives et des tissus de soutien de la dent.",
  },
  {
    icon: Activity,
    title: "Endodontie",
    text: "Traitement des racines dentaires (traitement de canal) pour soulager la douleur et préserver la dent.",
  },
  {
    icon: Baby,
    title: "Pédodontie",
    text: "Soins dentaires adaptés aux enfants, dans une approche douce et rassurante.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Presentation />
        <Soins />
        <Cabinet />
        <AppointmentPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#accueil" className="flex min-w-0 flex-col leading-tight">
          <span className="section-title truncate text-lg text-primary sm:text-xl">
            Dr Youssef Tafnouti
          </span>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Médecin dentiste · Ariana
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="tel:+21627035389"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Phone className="size-4" aria-hidden />
          <span className="hidden sm:inline">Appeler</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 md:grid-cols-2 md:items-center md:pb-20 md:pt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Cabinet dentaire à Ariana
          </p>
          <h1 className="section-title mt-3 text-4xl leading-tight text-foreground sm:text-5xl">
            Une dentisterie moderne, <br className="hidden sm:block" />au service de votre sourire
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Le Dr Youssef Tafnouti vous accueille dans son cabinet au cœur de
            l'Avenue Habib Bourguiba, pour des soins dentaires adaptés à chaque
            patient, du plus jeune au plus âgé.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 rounded-full px-5">
              <a href="#rendez-vous">
                <CalendarDays className="size-4" aria-hidden />
                Prendre rendez-vous
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
              <a href="tel:+21627035389">
                <Phone className="size-4" aria-hidden />
                Appeler
              </a>
            </Button>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <MapIcon className="size-4" aria-hidden />
              Itinéraire
            </a>
            <a
              href="mailto:tafnoutiyoussef@yahoo.fr"
              className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              <Mail className="size-4" aria-hidden />
              Email
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="Salle de soins du cabinet dentaire du Dr Youssef Tafnouti à Ariana"
            width={1600}
            height={1104}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

function Presentation() {
  return (
    <section id="presentation" className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <SectionTitle kicker="Présentation" title="Votre dentiste à Ariana" />
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              Le Dr Youssef Tafnouti, médecin dentiste, exerce au 48 Avenue
              Habib Bourguiba à Ariana. Il vous accompagne dans le suivi de
              votre santé bucco-dentaire, de la prévention aux traitements
              les plus spécifiques.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Chaque consultation commence par une écoute attentive et un
              bilan complet, afin de vous proposer un plan de traitement clair
              et adapté à votre situation. Le cabinet accueille les adultes
              comme les enfants.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="section-title text-lg text-foreground">Prise de rendez-vous</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Contactez directement le cabinet pour convenir d'un horaire.
            </p>
            <div className="mt-4 space-y-2 text-sm font-medium">
              <a href="tel:+21627035389" className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="size-4" aria-hidden /> +216 27 035 389
              </a>
              <a href="tel:+21652934545" className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="size-4" aria-hidden /> +216 52 934 545
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Soins() {
  return (
    <section id="soins" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <SectionTitle
        kicker="Soins"
        title="Des soins pour toute la famille"
        align="center"
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SOINS.map((soin) => (
          <article
            key={soin.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <soin.icon className="size-5" aria-hidden />
            </div>
            <h3 className="section-title mt-4 text-lg text-foreground">{soin.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{soin.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Cabinet() {
  return (
    <section id="cabinet" className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
        <img
          src={cabinetImage}
          alt="Instrumentation du cabinet dentaire, soigneusement préparée"
          width={1104}
          height={800}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
        />
        <div>
          <SectionTitle kicker="Le cabinet" title="Un cadre clair et apaisé" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Situé au 2e étage du 48 Avenue Habib Bourguiba, le cabinet a été
            aménagé pour offrir un environnement propre, calme et rassurant.
            L'équipement moderne et la rigueur des protocoles d'hygiène
            garantissent des soins réalisés dans les meilleures conditions.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
              Instrumentation stérilisée et protocoles d'hygiène stricts
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
              Accueil des adultes et des enfants
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
              Explications claires avant chaque traitement
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <SectionTitle kicker="Informations pratiques" title="Contact & accès" align="center" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <MapPin className="size-5" aria-hidden />
          </div>
          <h3 className="section-title mt-4 text-lg">Adresse</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            48 Avenue Habib Bourguiba
            <br />
            2e étage, Ariana, Tunisie
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <MapIcon className="size-4" aria-hidden />
            Ouvrir dans Google Maps
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Phone className="size-5" aria-hidden />
          </div>
          <h3 className="section-title mt-4 text-lg">Téléphone</h3>
          <div className="mt-2 space-y-1 text-sm">
            <a href="tel:+21627035389" className="block text-muted-foreground hover:text-foreground">
              +216 27 035 389
            </a>
            <a href="tel:+21652934545" className="block text-muted-foreground hover:text-foreground">
              +216 52 934 545
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Mail className="size-5" aria-hidden />
          </div>
          <h3 className="section-title mt-4 text-lg">Email</h3>
          <a
            href="mailto:tafnoutiyoussef@yahoo.fr"
            className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
          >
            tafnoutiyoussef@yahoo.fr
          </a>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <MapIcon className="size-4" aria-hidden />
          Voir l'itinéraire
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="section-title text-xl">Dr Youssef Tafnouti</p>
            <p className="mt-1 text-sm text-primary-foreground/70">Médecin dentiste</p>
          </div>
          <div className="text-sm leading-relaxed text-primary-foreground/80">
            <p>48 Avenue Habib Bourguiba, 2e étage</p>
            <p>Ariana, Tunisie</p>
            <p className="mt-2">
              <a href="tel:+21627035389" className="hover:underline">+216 27 035 389</a>
              {" · "}
              <a href="tel:+21652934545" className="hover:underline">+216 52 934 545</a>
            </p>
            <p>
              <a href="mailto:tafnoutiyoussef@yahoo.fr" className="hover:underline">
                tafnoutiyoussef@yahoo.fr
              </a>
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-primary-foreground/80 md:items-end">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-primary-foreground/20 pt-6 text-xs leading-relaxed text-primary-foreground/60">
          Les informations présentées sur ce site sont fournies à titre
          purement informatif et ne remplacent en aucun cas une consultation
          médicale. Pour tout diagnostic ou traitement, veuillez consulter
          votre chirurgien-dentiste.
        </p>
      </div>
    </footer>
  );
}

function SectionTitle({
  kicker,
  title,
  align = "left",
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h2 className="section-title mt-2 text-3xl text-foreground sm:text-4xl">{title}</h2>
    </div>
  );
}
