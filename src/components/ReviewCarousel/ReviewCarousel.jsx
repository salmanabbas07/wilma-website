import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { testimonialsData } from '../../data/testimonials';
import './ReviewCarousel.css';

/**
 * ReviewCarousel Component
 * Requirements:
 * - Functional smooth carousel for partner ratings/reviews
 * - Preserves existing rating info and reviews
 * - Shows 2 cards on desktop, 1 on mobile/small screens
 * - Automatic smooth sliding at consistent 5s interval
 * - Clean timer reset on manual interaction
 * - Pause on hover/focus
 * - Touch swipe support
 */
export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalReviews = testimonialsData.length;

  // Update visible cards count on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalReviews - visibleCount);

  // Keep currentIndex bounded when visibleCount changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Helper to restart autoplay timer on manual interactions
  const resetAutoplayTimer = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
  }, [isPaused, handleNext]);

  // Autoplay management
  useEffect(() => {
    if (isPaused) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      return;
    }

    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused, handleNext]);

  // Manual navigation handlers that reset the timer
  const handleManualNext = () => {
    handleNext();
    resetAutoplayTimer();
  };

  const handleManualPrev = () => {
    handlePrev();
    resetAutoplayTimer();
  };

  const handleManualDot = (idx) => {
    handleDotClick(idx);
    resetAutoplayTimer();
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 45;
      if (distance > minSwipeDistance) {
        handleManualNext();
      } else if (distance < -minSwipeDistance) {
        handleManualPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Calculate percentage offset for sliding
  const getTransform = () => {
    if (visibleCount === 1) {
      return `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))`;
    }
    return `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 0.75}rem))`;
  };

  const totalDots = maxIndex + 1;

  return (
    <section
      className="review-carousel-section"
      aria-label="Mnenja strank in partnerjev"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="review-carousel-container">
        {/* Section Heading */}
        <SectionHeading
          badge="Mnenja partnerjev"
          title="Kaj pravijo naši hotelski partnerji"
          subtitle="Preberite izkušnje vodij hotelov in nastanitvenih obratov, ki nam zaupajo skrb za svoje prostore."
          centered={true}
        />

        {/* Carousel Viewport / Wrapper */}
        <div
          className="review-carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Vrtiljak mnenj hotelskih partnerjev"
        >
          <div
            className="review-carousel-track"
            style={{ transform: getTransform() }}
          >
            {testimonialsData.map((testimonial, idx) => {
              const initials = testimonial.author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);

              return (
                <div
                  key={testimonial.id}
                  className="review-slide-item"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} od ${totalReviews}: ${testimonial.author}`}
                >
                  <div className="review-card">
                    <div>
                      {/* Top Row: 5 Stars + Quote Icon */}
                      <div className="review-card-top">
                        <div
                          className="review-stars"
                          aria-label={`Ocena: ${testimonial.rating} od 5 zvezdic`}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`review-star-icon ${
                                i < testimonial.rating
                                  ? ''
                                  : 'text-gray-200 fill-transparent'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="review-quote-badge" aria-hidden="true">
                          <Quote className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Review Quote */}
                      <p className="review-text">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Metadata */}
                    <div className="review-author-row">
                      <div className="review-avatar" aria-hidden="true">
                        {initials || 'WH'}
                      </div>
                      <div className="review-author-meta">
                        <div className="review-author-name">
                          {testimonial.author}
                        </div>
                        <div className="review-author-role">
                          {testimonial.position}
                        </div>
                        {testimonial.company && (
                          <div className="review-author-company">
                            {testimonial.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls: Arrows and Indicator Dots */}
        <div className="review-controls-row">
          <button
            type="button"
            onClick={handleManualPrev}
            className="review-arrow-btn"
            aria-label="Prejšnja mnenja"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicator Dots */}
          <div
            className="review-dots-container"
            role="tablist"
            aria-label="Izbira mnenja"
          >
            {Array.from({ length: totalDots }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => handleManualDot(dotIdx)}
                className={`review-dot ${
                  dotIdx === currentIndex ? 'active' : ''
                }`}
                role="tab"
                aria-selected={dotIdx === currentIndex}
                aria-label={`Pojdi na stran mnenj ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleManualNext}
            className="review-arrow-btn"
            aria-label="Naslednja mnenja"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
