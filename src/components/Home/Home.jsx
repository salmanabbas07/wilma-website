import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Shield,
  Clock,
  Award,
  Target,
  Handshake
} from 'lucide-react';
import HeroCarousel from '../HeroCarousel/HeroCarousel';
import ReviewCarousel from '../ReviewCarousel/ReviewCarousel';
import SectionHeading from '../SectionHeading/SectionHeading';
import ServiceCard from '../ServiceCard/ServiceCard';
import BlogCard from '../BlogCard/BlogCard';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import Button from '../Button/Button';
import CTASection from '../CTASection/CTASection';
import { servicesData } from '../../data/services';
import { blogPostsData } from '../../data/blogPosts';
import { processStepsData } from '../../data/processSteps';
import './Home.css';

/**
 * Home Component
 * Preserves all content, brand identity, and functionality while providing:
 * - Smooth Hero Banner Carousel
 * - Smooth Rating / Review Carousel
 * - Polished UI layout with clean custom CSS
 * - Consistent responsive behavior across all screen sizes
 */
export default function Home() {
  const whyChooseFeatures = [
    {
      icon: Users,
      title: 'Strokovno in usposobljeno osebje',
      description:
        'Rigorozno preverjanje preteklih izkušenj, referenc in doslednega odnosa do dela.'
    },
    {
      icon: Clock,
      title: '24/7 Podpora partnerjem',
      description:
        'Stalna odzivnost naše koordinacijske ekipe in takojšnje reševanje nujnih primerov.'
    },
    {
      icon: Shield,
      title: 'Prilagodljive rešitve po meri',
      description:
        'Enostavno in hitro prilagajanje števila osebja trenutni zasedenosti vaših objektov.'
    },
    {
      icon: Sparkles,
      title: 'Hitra odzivnost in zamenjava',
      description:
        'Zagotovljena hitra menjava osebja v primeru odsotnosti ali nepredvidenih situacij.'
    },
    {
      icon: Award,
      title: 'Evropski standardi kakovosti',
      description:
        'Popolna skladnost z veljavnimi evropskimi higienskimi standardi in protokoli čiščenja.'
    }
  ];

  return (
    <div className="home-page">
      {/* 1. HERO BANNER CAROUSEL */}
      <HeroCarousel />

      {/* 2. ABOUT COMPANY INTRODUCTION */}
      <section className="about-intro-section" aria-label="O podjetju">
        <div className="home-section-container">
          <div className="about-intro-grid">
            {/* Left Column: Image Stack */}
            <div className="about-media-stack">
              <div className="about-main-img-card">
                <ImagePlaceholder
                  aspectRatio="aspect-[4/5]"
                  rounded="rounded-2xl"
                  label="Glavna predstavitvena slika podjetja"
                />
              </div>

              {/* Overlapping Quality Highlight Card */}
              <div className="about-badge-card">
                <ImagePlaceholder
                  aspectRatio="aspect-square"
                  rounded="rounded-xl"
                  label="Poudarek kakovosti"
                />
              </div>
            </div>

            {/* Right Column: Information & Bullet Points */}
            <div className="about-content-col">
              <div className="about-pill-badge">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>O podjetju</span>
              </div>

              <h2 className="about-title">
                Vrhunske ekipe za hotelsko gospodinjstvo in poslovne prostore
              </h2>

              <p className="about-desc-primary">
                Zavezani smo k zagotavljanju brezhibne čistoče, urejenosti in visoke ravni higiene za hotele, letovišča ter poslovne objekte po vsej Sloveniji. Naš cilj je ustvariti prijetno in varno bivalno okolje za vaše goste.
              </p>

              <p className="about-desc-secondary">
                Zanesljivost, diskretnost in profesionalni odnos so temelj vsakega našega sodelovanja. Z usposobljenimi ekipami in stalnim nadzorom kakovosti prevzemamo celotno skrb za urejenost vaših prostorov.
              </p>

              {/* 4 Feature Bullet points with checkmarks */}
              <div className="about-features-grid">
                <div className="about-feature-item">
                  <CheckCircle2 className="about-feature-icon" />
                  <span>Stalna razpoložljivost osebja</span>
                </div>
                <div className="about-feature-item">
                  <CheckCircle2 className="about-feature-icon" />
                  <span>Nadzor kakovosti na terenu</span>
                </div>
                <div className="about-feature-item">
                  <CheckCircle2 className="about-feature-icon" />
                  <span>Preverjeni in usposobljeni kadri</span>
                </div>
                <div className="about-feature-item">
                  <CheckCircle2 className="about-feature-icon" />
                  <span>Brezplačna in hitra menjava</span>
                </div>
              </div>

              <div>
                <Button
                  to="/o-nas"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                >
                  Več o našem delu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW SECTION */}
      <section className="services-overview-section" aria-label="Naše storitve">
        <div className="home-section-container">
          <SectionHeading
            badge="Naše storitve"
            title="Prilagojene rešitve za vsak objekt"
            subtitle="Izberite profesionalne storitve čiščenja in vzdrževanja, prilagojene specifičnim potrebam vaše dejavnosti."
            centered={true}
          />

          <div className="services-cards-grid">
            {servicesData.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                image={service.image}
                description={service.description}
                features={service.features}
                aspectRatio="aspect-[16/10]"
              />
            ))}
          </div>

          <div className="services-action-center">
            <Button
              to="/storitve"
              variant="outline"
              size="lg"
              icon={ArrowRight}
            >
              Prikaži vse storitve in podrobnosti
            </Button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (Dark Section) */}
      <section className="why-choose-section" aria-label="Zakaj izbrati nas">
        <div className="home-section-container">
          <SectionHeading
            badge="Prednosti sodelovanja"
            title="Zakaj izbrati naše storitve?"
            subtitle="Zagotavljamo visoke standarde, stabilnost in profesionalnost pri vsakem projektu."
            centered={true}
            onDark={true}
          />

          <div className="why-features-grid">
            {whyChooseFeatures.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="why-feature-card group">
                  <div className="why-icon-box">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="why-card-title">
                    {item.title}
                  </h3>
                  <p className="why-card-desc">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MISSION & WORK WITH US */}
      <section className="mission-section" aria-label="Poslanstvo in sodelovanje">
        <div className="home-section-container">
          <div className="mission-grid">
            {/* Card 1: Poslanstvo */}
            <div className="mission-card">
              <div>
                <div className="mission-icon-box blue">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="mission-card-title">
                  Naše poslanstvo
                </h3>
                <p className="mission-card-desc">
                  Ustvarjamo brezhibno čista in varna okolja za hotelske goste in poslovne partnerje z najvišjo stopnjo zanesljivosti ter predanosti stroki.
                </p>
              </div>
              <div className="mission-card-footer">
                <Button to="/o-nas" variant="ghost" size="sm" icon={ArrowRight}>
                  Preberite več o viziji
                </Button>
              </div>
            </div>

            {/* Card 2: Sodelujte z nami */}
            <div className="mission-card">
              <div>
                <div className="mission-icon-box gold">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="mission-card-title">
                  Sodelujte z nami
                </h3>
                <p className="mission-card-desc">
                  Iščete zanesljivega partnerja za dolgoročno sodelovanje ali sezonsko okrepitev ekipe? Naša prilagodljiva kadrovska struktura ponuja takojšnjo rešitev za vaše objekte.
                </p>
              </div>
              <div className="mission-card-footer">
                <Button to="/kontakt" variant="ghost" size="sm" icon={ArrowRight}>
                  Stopite v stik z nami
                </Button>
              </div>
            </div>
          </div>

          {/* Banner Tag */}
          <div className="mission-banner-pill">
            Williams Housekeeping &bull; Vrhunske ekipe za hotelsko gospodinjstvo &bull; Evropski standardi kakovosti
          </div>
        </div>
      </section>

      {/* 6. PARTNER TESTIMONIALS CAROUSEL */}
      <ReviewCarousel />

      {/* 7. 5-STEP HIRING & TRAINING SYSTEM */}
      <section className="process-section" aria-label="Izbirni postopek">
        <div className="process-container-narrow">
          <SectionHeading
            badge="Izbirni postopek"
            title="Celovit 5-stopenjski sistem izbire in usposabljanja"
            subtitle="Zagotavljamo preverjeno, strokovno usposobljeno in motivirano osebje za vaše objekte."
            centered={true}
          />

          <div className="process-timeline">
            {processStepsData.map((stepItem) => (
              <div key={stepItem.step} className="process-step-item">
                {/* Step Number Circle */}
                <div className="process-step-badge">
                  {stepItem.step}
                </div>

                {/* Step Content */}
                <div className="process-step-card">
                  <h3 className="process-step-title">
                    {stepItem.title}
                  </h3>
                  <p className="process-step-desc">
                    {stepItem.description}
                  </p>
                  <ul className="process-bullets">
                    {stepItem.items.map((bullet, idx) => (
                      <li key={idx} className="process-bullet-item">
                        <CheckCircle2 className="process-check-icon" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWS & BLOG SECTION */}
      <section className="blog-section" aria-label="Novice in strokovni članki">
        <div className="home-section-container">
          <SectionHeading
            badge="Novice &amp; Blog"
            title="Aktualne novice in strokovni nasveti"
            subtitle="Ostanite na tekočem s trendi in dobrimi praksami v hotelskem in poslovnem sektorju."
            centered={true}
          />

          <div className="blog-cards-grid">
            {blogPostsData.slice(0, 3).map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                category={post.category}
                excerpt={post.excerpt}
                readTime={post.readTime}
              />
            ))}
          </div>

          <div className="blog-action-center">
            <Button to="/blog" variant="darkNavy" size="lg" icon={ArrowRight}>
              Vsi članki in objave
            </Button>
          </div>
        </div>
      </section>

      {/* 9. REUSABLE CTA SECTION */}
      <CTASection
        title="Potrebujete zanesljivo ekipo za vaše prostore?"
        subtitle="Stopite v stik z našo ekipo in pripravili vam bomo neobvezujočo ponudbo, prilagojeno vašim zahtevam."
        badge="POVVPRAŠEVANJE &amp; REZERVACIJE"
        primaryBtnText="Pošljite povpraševanje"
        primaryBtnTo="/kontakt"
        secondaryBtnText="Pokličite nas: +386 69 803 622"
      />
    </div>
  );
}
