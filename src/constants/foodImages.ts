import heroNotebookImg from '../assets/writing.png';
import recipeIdeasImg from '../assets/Gemini_Generated_Image_oeccz9oeccz9oecc.png';

export type HeroSlide = {
  src: string;
  alt: string;
  cta?: {
    label: string;
    href: string;
  };
};

/** Hero slider slides */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: heroNotebookImg,
    alt: 'Person writing a recipe in a notebook',
  },
  {
    src: recipeIdeasImg,
    alt: 'Colorful smoothie bowl with fresh fruit toppings',
    cta: {
      label: 'Get recipe ideas',
      href: '/recipe-ideas',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
    alt: 'Cooking ingredients prepared on a kitchen counter',
  },
];

/** Legacy exports */
export const FOOD_IMAGES = {
  heroNotebook: HERO_SLIDES[0],
  banner: [
    {
      src: 'https://images.unsplash.com/photo-1498837167922-ddd27525cd34?w=1200&q=80',
      alt: 'Table spread with fresh ingredients',
    },
    {
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
      alt: 'Gourmet plated dish',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      alt: 'Restaurant dining table',
    },
  ],
};
