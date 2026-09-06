import { useCallback, useEffect, useState } from 'react';
import type { HeroSlide } from '../constants/foodImages';

const AUTO_ADVANCE_MS = 6000;

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (slideCount === 0) return null;

  return (
    <div className="absolute inset-0 bg-ink overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          } ${index === activeIndex ? '[transition:opacity_1s_ease,transform_8s_ease]' : ''}`}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {slideCount > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? 'w-7 bg-paper' : 'w-1.5 bg-paper/50 hover:bg-paper/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
