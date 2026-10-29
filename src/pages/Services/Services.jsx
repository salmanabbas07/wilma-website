import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Filter
} from 'lucide-react';
import PageBanner from '../../components/PageBanner/PageBanner';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import CTASection from '../../components/CTASection/CTASection';
import Button from '../../components/Button/Button';
import { servicesData } from '../../data/services';
import './Services.css';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.id === selectedCategory);

  return (
    <div className="services-page">
      {/* 1. Page Banner */}
      <PageBanner
        title="Storitve"
        subtitle="Celovite storitve čiščenja, gospodinjstva in kadrovske podpore za hotele ter poslovne objekte."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
      />

      {/* 2. Services Grid (matching screenshot 3) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Naše storitve"
            title="Odkrijte naš nabor profesionalnih storitev"
            subtitle="Zagotavljamo visoko prilagodljivost, vrhunske higienske standarde in profesionalen kader."
            centered={true}
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0B70A6] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Vse storitve
            </button>
            {servicesData.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedCategory(s.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === s.id
                    ? 'bg-[#0B70A6] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Service Cards Grid - reusing ServiceCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
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
        </div>
      </section>

      {/* 3. Service Quality Features */}
      <section className="py-16 bg-gray-50/80 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-green mb-1.5">
                    100% Zanesljivost in varnost
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Vsi naši sodelavci so skrbno izbrani, preverjeni in usposobljeni za varno delo v vaših objektih.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F3B209] flex items-center justify-center shrink-0 border border-amber-100">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-green mb-1.5">
                    Hitra odzivnost v 24 urah
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Hitra organizacija in razporeditev kadrov v primeru povečanega obsega dela ali nepričakovanih potreb.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-green mb-1.5">
                    Evropski higienski standardi
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Natančno izvajanje vseh veljavnih higienskih protokolov in dosledna uporaba ustreznih čistilnih sredstev.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Potrebujete prilagojen paket storitev za vaš objekt?"
        subtitle="Skupaj bomo definirali optimalen obseg podpore in urnik storitev, prilagojen vašemu poslovanju."
        primaryBtnText="Pošljite povpraševanje"
        primaryBtnTo="/kontakt"
      />
    </div>
  );
}
