import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../Button/Button';
import './ContactForm.css';

/**
 * ContactForm Component
 * Fully validated client-side in Slovenian
 * Handles: Ime in priimek, E-poštni naslov, Telefonska številka, Zadeva, Sporočilo
 * Shows transparent demo success notification with no fake backend delivery claims.
 */
export default function ContactForm({ className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Prosimo, vnesite vaše ime in priimek.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Prosimo, vnesite vaš e-poštni naslov.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Vnesite veljaven e-poštni naslov (npr. ime@podjetje.si).';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Prosimo, izberite ali vnesite zadevo sporočila.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Prosimo, vnesite vsebino vašega sporočila.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Sporočilo mora vsebovati vsaj 10 znakov.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate brief client-side processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 400);
  };

  return (
    <div className={`contact-form-wrapper bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      {submitted ? (
        <div className="py-10 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-brand-green mb-3">
            Sporočilo je bilo uspešno prejeto (Predogled)
          </h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Hvala za vaše povpraševanje! To je demonstracijski prikaz spletne strani; podatki so bili uspešno validirani na ravni odjemalca.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="primary"
            size="md"
          >
            Pošljite novo sporočilo
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Ime in priimek */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Ime in priimek <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Npr. Janez Novak"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-gray-200 focus:border-[#0B70A6] focus:ring-[#0B70A6]/20'
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* E-pošta */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                E-poštni naslov <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ime@primer.si"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-gray-200 focus:border-[#0B70A6] focus:ring-[#0B70A6]/20'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Telefon */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Telefonska številka <span className="text-gray-400 font-normal text-[11px]">(neobvezno)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+386 69 803 622"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#0B70A6] focus:ring-2 focus:ring-[#0B70A6]/20 transition-all focus:outline-none"
              />
            </div>

            {/* Zadeva */}
            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Zadeva povpraševanja <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all bg-white focus:outline-none focus:ring-2 ${
                  errors.subject
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-gray-200 focus:border-[#0B70A6] focus:ring-[#0B70A6]/20'
                }`}
                aria-invalid={!!errors.subject}
              >
                <option value="">Izberite vrsto storitve...</option>
                <option value="hotel-housekeeping">Hotelsko gospodinjstvo</option>
                <option value="seasonal-teams">Sezonske ekipe za čiščenje</option>
                <option value="temporary-support">Začasna podpora gospodinjstvu</option>
                <option value="subcontracting">Prilagodljivo podizvajanje</option>
                <option value="commercial-cleaning">Poslovno in pisarniško čiščenje</option>
                <option value="specialized-cleaning">Specialno in globinsko čiščenje</option>
                <option value="other">Drugo splošno vprašanje</option>
              </select>
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>
          </div>

          {/* Sporočilo */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Vaše sporočilo / Podrobnosti povpraševanja <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Opišite vaše zahteve, lokacijo objekta, pričakovan obseg dela ali vprašanje..."
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-y ${
                errors.message
                  ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                  : 'border-gray-200 focus:border-[#0B70A6] focus:ring-[#0B70A6]/20'
              }`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              icon={Send}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Pošiljanje...' : 'Pošljite povpraševanje'}
            </Button>

            <span className="text-xs text-gray-400 text-center sm:text-right">
              Polja z zvezdico (<span className="text-red-500">*</span>) so obvezna.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
