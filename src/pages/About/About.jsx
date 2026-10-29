import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Target,
  Handshake,
  Users,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import PageBanner from '../../components/PageBanner/PageBanner';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import CTASection from '../../components/CTASection/CTASection';
import Button from '../../components/Button/Button';
import { testimonialsData } from '../../data/testimonials';
import { processStepsData } from '../../data/processSteps';
import './About.css';

export default function About() {
  const companyFeatures = [
    {
      icon: Users,
      title: 'Predana ekipa strokovnjakov',
      description: 'Visoko motivirani kadri z ustreznimi kompetencami in strokovnim pristopom.'
    },
    {
      icon: ShieldCheck,
      title: 'Popolna skladnost s standardi',
      description: 'Dosledno upoštevanje vseh zakonskih in evropskih higienskih smernic.'
    },
    {
      icon: Award,
      title: 'Neprekinjen nadzor kakovosti',
      description: 'Redni pregledi nadzornikov na terenu in stalna optimizacija delovnih procesov.'
    },
    {
      icon: Clock,
      title: 'Zanesljivost in prilagodljivost',
      description: 'Hitra prilagoditev dinamiki in sezonski zasedenosti vašega objekta.'
    }
  ];

  return (
    <div className="about-page">
      {/* 1. Page Banner */}
      <PageBanner
        title="O nas"
        subtitle="Spoznajte našo filozofijo, vrednote in predanost vrhunskim storitvam v hotelirstvu."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
      />

      {/* 2. Company Introduction (recreating screenshot 2) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with secondary overlapping placeholder */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <ImagePlaceholder
                  aspectRatio="aspect-[4/5]"
                  rounded="rounded-2xl"
                  label="Predstavitev ekipe Williams"
                  className="shadow-xl border-2 border-gray-100"
                />

                <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-1/2 sm:w-56 shadow-2xl rounded-2xl bg-white p-2">
                  <ImagePlaceholder
                    aspectRatio="aspect-square"
                    rounded="rounded-xl"
                    label="Naša zaveza kakovosti"
                    className="border border-[#0B70A6]/30 bg-blue-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Company Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>O podjetju</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-green leading-tight mb-4">
                Vrhunske ekipe za hotelsko gospodinjstvo in poslovne prostore
              </h2>

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Zavezani smo k zagotavljanju brezhibne čistoče, urejenosti in visoke ravni higiene za hotele, letovišča ter poslovne objekte po vsej Sloveniji. Naš cilj je ustvariti prijetno in varno bivalno okolje za vaše goste.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Zanesljivost, diskretnost in profesionalni odnos so temelj vsakega našega sodelovanja. Z usposobljenimi ekipami in stalnim nadzorom kakovosti prevzemamo celotno skrb za urejenost vaših prostorov.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>Stalna razpoložljivost osebja</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>Nadzor kakovosti na terenu</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>Preverjeni in usposobljeni kadri</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>Brezplačna in hitra menjava</span>
                </div>
              </div>

              <div>
                <Button to="/kontakt" variant="primary" size="md" icon={ArrowRight}>
                  Pošljite povpraševanje
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Poslanstvo & Delajte z nami (Two cards matching screenshot 2) */}
      <section className="py-16 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-green mb-3">
                  Naše poslanstvo
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Zagotavljati brezhibno čistočo in celovito podporo, ki hotelirjem ter upraviteljem objektov omogoča popolno osredotočenost na zadovoljstvo njihovih gostov.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Button to="/storitve" variant="ghost" size="sm" icon={ArrowRight}>
                  Oglejte si naše storitve
                </Button>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F3B209] flex items-center justify-center mb-6">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-green mb-3">
                  Delajte z nami
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Pridružite se naši rastoči ekipi ali postanite naš zaupanja vreden partner pri zagotavljanju vrhunskih nastanitvenih storitev po vsej Sloveniji.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Button to="/kontakt" variant="ghost" size="sm" icon={ArrowRight}>
                  Stopite v stik z nami
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 py-3.5 px-6 rounded-xl bg-white border border-gray-200 text-center text-xs sm:text-sm text-gray-600 font-medium">
            Williams Housekeeping &bull; Zanesljive ekipe za hotelsko gospodinjstvo &bull; Evropski standardi kakovosti
          </div>
        </div>
      </section>

      {/* 4. 5-Step Hiring & Training System (matching screenshot 2) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Izbirni postopek"
            title="Celovit 5-stopenjski sistem izbire in usposabljanja"
            subtitle="Naš strukturiran pristop zagotavlja preverjene kadre in najvišjo stopnjo zanesljivosti."
            centered={true}
          />

          <div className="relative pl-6 sm:pl-10 space-y-8 before:content-[''] before:absolute before:left-5 sm:before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-200">
            {processStepsData.map((stepItem) => (
              <div key={stepItem.step} className="relative group">
                <div className="absolute -left-6 sm:-left-10 top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center text-brand-blue font-black text-sm sm:text-base shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all">
                  {stepItem.step}
                </div>

                <div className="ml-5 sm:ml-6 bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-green mb-2">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    {stepItem.description}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    {stepItem.items.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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

      {/* 5. Testimonials Section (matching screenshot 2) */}
      <section className="py-16 sm:py-24 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Mnenja partnerjev"
            title="Kaj pravijo naši hotelski partnerji"
            subtitle="Zadovoljstvo naših naročnikov in njihovih gostov je naše glavno vodilo."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.slice(0, 2).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <CTASection
        title="Želite izvedeti več o naših rešitvah?"
        subtitle="Z veseljem odgovorimo na vsa vaša vprašanja in pripravimo prilagojeno ponudbo za vaše objekte."
        primaryBtnText="Stopite v stik z nami"
        primaryBtnTo="/kontakt"
      />
    </div>
  );
}
