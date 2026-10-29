import React from 'react';
import { Sparkles } from 'lucide-react';
import './SectionHeading.css';

/**
 * Reusable Section Heading
 * Consistent green headings (#0B4D26) or white on dark
 */
export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  onDark = false,
  className = '',
  titleTag = 'h2'
}) {
  const HeadingTag = titleTag;
  const theme = onDark ? 'dark' : 'light';

  return (
    <div
      className={`section-heading-wrapper ${
        centered ? 'centered' : 'left'
      } ${className}`}
    >
      {badge && (
        <div className={`section-heading-badge ${theme}`}>
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{badge}</span>
        </div>
      )}

      {title && (
        <HeadingTag className={`section-heading-title ${theme}`}>
          {title}
        </HeadingTag>
      )}

      {subtitle && (
        <p className={`section-heading-subtitle ${theme}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
