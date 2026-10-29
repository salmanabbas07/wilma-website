import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PageBanner.css';

/**
 * Reusable PageBanner component
 * Displays page title, breadcrumb navigation, and dark background matching reference.
 */
export default function PageBanner({
  title = 'Williams Housekeeping',
  subtitle = '',
  breadcrumbs = [{ name: 'Domov', path: '/' }]
}) {
  return (
    <section className="page-banner relative bg-[#081738] text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
      {/* Subtle decorative glow & empty image placeholder background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#081738] to-[#050e24] opacity-90 pointer-events-none" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#0B70A6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb */}
        <nav aria-label="Drobtice" className="flex items-center gap-2 text-sm text-slate-400">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path || idx}>
              {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-600" />}
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-[#F3B209] transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-[#F3B209] font-medium">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-[#F3B209] font-medium">{title}</span>
        </nav>
      </div>
    </section>
  );
}
