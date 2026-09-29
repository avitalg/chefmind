import heroBreakfastAvif from '../assets/breakfast-spread.avif'
import heroBreakfastWebp from '../assets/breakfast-spread.webp'
import heroBreakfast768Avif from '../assets/breakfast-spread-768.avif'
import heroBreakfast768Webp from '../assets/breakfast-spread-768.webp'
import recipeIdeasImg from '../assets/recipe-ideas-hero.webp'
import dining480Avif from '../assets/stories/dining-480.avif'
import dining480Webp from '../assets/stories/dining-480.webp'
import dining720Avif from '../assets/stories/dining-720.avif'
import dining720Webp from '../assets/stories/dining-720.webp'
import gourmet480Avif from '../assets/stories/gourmet-480.avif'
import gourmet480Webp from '../assets/stories/gourmet-480.webp'
import gourmet720Avif from '../assets/stories/gourmet-720.avif'
import gourmet720Webp from '../assets/stories/gourmet-720.webp'
import ingredients480Avif from '../assets/stories/ingredients-480.avif'
import ingredients480Webp from '../assets/stories/ingredients-480.webp'
import ingredients720Avif from '../assets/stories/ingredients-720.avif'
import ingredients720Webp from '../assets/stories/ingredients-720.webp'

export type HeroSlide = {
  src: string
  alt: string
  caption?: string
  cta?: {
    label: string
    href: string
  }
}

export type ResponsivePhoto = {
  src: string
  avifSrcSet: string
  webpSrcSet: string
  width: number
  height: number
  alt: string
}

/** Full-bleed hero. 768w covers a phone at 2x; 1024w is the desktop source. */
export const HERO_BREAKFAST = {
  avifSrcSet: `${heroBreakfast768Avif} 768w, ${heroBreakfastAvif} 1024w`,
  webpSrcSet: `${heroBreakfast768Webp} 768w, ${heroBreakfastWebp} 1024w`,
  src: heroBreakfastWebp,
  width: 1024,
  height: 558,
  alt: 'Breakfast spread with eggs, bacon, toast, pancakes, and fresh pastries',
}

/** Hero slider slides */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: heroBreakfastWebp,
    alt: HERO_BREAKFAST.alt,
    caption: 'Morning favorites, saved in one place',
  },
  {
    src: recipeIdeasImg,
    alt: 'Colorful smoothie bowl with fresh fruit toppings',
    caption: 'Fresh inspiration for every meal',
    cta: {
      label: 'Get recipe ideas',
      href: '/recipe-ideas',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&h=800&q=60',
    alt: 'Cooking ingredients prepared on a kitchen counter',
    caption: 'From ingredients to dinner, fast',
  },
]

const storyPhoto = (
  alt: string,
  avif480: string,
  avif720: string,
  webp480: string,
  webp720: string
): ResponsivePhoto => ({
  alt,
  src: webp720,
  avifSrcSet: `${avif480} 480w, ${avif720} 720w`,
  webpSrcSet: `${webp480} 480w, ${webp720} 720w`,
  width: 720,
  height: 900,
})

/**
 * 4:5 kitchen photos. 480w is enough for a desktop column at 1x;
 * 720w covers a full-width phone at about 2x.
 */
export const STORY_PHOTOS: ResponsivePhoto[] = [
  storyPhoto(
    'Table spread with fresh ingredients',
    ingredients480Avif,
    ingredients720Avif,
    ingredients480Webp,
    ingredients720Webp
  ),
  storyPhoto('Gourmet plated dish', gourmet480Avif, gourmet720Avif, gourmet480Webp, gourmet720Webp),
  storyPhoto('Restaurant dining table', dining480Avif, dining720Avif, dining480Webp, dining720Webp),
]

/** Column width of the homepage story grid (max-w-6xl, px-4, 3 columns, gap-8). */
export const STORY_IMAGE_SIZES =
  '(min-width: 72rem) 22rem, (min-width: 40rem) calc((100vw - 6rem) / 3), calc(100vw - 2rem)'

/** Legacy exports */
export const FOOD_IMAGES = {
  heroNotebook: HERO_SLIDES[0],
  banner: STORY_PHOTOS,
}
