import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroSlide } from '../constants/foodImages';
import { addUtmToPath } from '../utils/utm';

const AUTO_ADVANCE_MS = 5000;

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;
  const activeSlide = slides[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (slideCount === 0) return null;

  return (
    <div className="absolute inset-0 bg-cream group">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {activeSlide?.cta && (
        <div className="absolute inset-x-0 bottom-16 md:bottom-20 flex justify-center px-4 pointer-events-none">
          <Link
            to={addUtmToPath(activeSlide.cta.href, { utm_content: 'hero_slider_cta' })}
            className="btn-primary py-3 px-6 pointer-events-auto shadow-sm"
          >
            {activeSlide.cta.label}
          </Link>
        </div>
      )}

      {slideCount > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-paper/90 border border-border-warm text-ink hover:bg-cream transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-paper/90 border border-border-warm text-ink hover:bg-cream transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-6 bg-teal'
                    : 'w-2 bg-paper/80 border border-border-warm hover:bg-cream'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
