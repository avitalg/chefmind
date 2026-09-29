import { Link } from 'react-router-dom'
import { type ResponsivePhoto, STORY_IMAGE_SIZES, STORY_PHOTOS } from '../../constants/foodImages'

interface HomeFeatureGridProps {
  onSignIn: () => void
  onImport: () => void
}

const BROWSE = [
  { label: 'Import from URL', href: '#import-recipe' },
  { label: 'From a photo', href: '#import-recipe' },
  { label: 'Create a recipe', href: '/create' },
  { label: 'Recipe ideas', href: '/recipe-ideas' },
]

const FEATURES = [
  {
    title: 'Import from anywhere',
    description:
      'Paste a recipe URL or upload a photo of a card. We pull out the ingredients and steps.',
  },
  {
    title: 'Write your own',
    description: 'Keep family favorites, kitchen experiments, and the dishes you make from memory.',
  },
  {
    title: 'Cook from one library',
    description:
      'Edit amounts, tweak steps, and find everything in one place — wherever you sign in.',
  },
]

const STORIES: Array<{
  photo: ResponsivePhoto
  category: string
  title: string
  href: string
}> = [
  {
    photo: STORY_PHOTOS[0],
    category: 'Import',
    title: 'Save a recipe from any blog',
    href: '#import-recipe',
  },
  {
    photo: STORY_PHOTOS[1],
    category: 'Create',
    title: 'Write the ones you already know',
    href: '/create',
  },
  {
    photo: STORY_PHOTOS[2],
    category: 'Ideas',
    title: 'Cook from what’s in the fridge',
    href: '/recipe-ideas',
  },
]

export default function HomeFeatureGrid({ onSignIn, onImport }: HomeFeatureGridProps) {
  return (
    <section id="features" className="scroll-mt-6">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <p className="text-xs tracking-[0.2em] uppercase text-body mb-3">Browse</p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-6">Find a way in</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {BROWSE.map((item) =>
            item.href.startsWith('#') ? (
              <button key={item.label} type="button" onClick={onImport} className="index-link">
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.href} className="index-link">
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 grid sm:grid-cols-3 gap-10 sm:gap-12">
        {FEATURES.map((feature) => (
          <article key={feature.title}>
            <h3 className="font-display text-xl text-ink mb-2">{feature.title}</h3>
            <p className="text-sm text-body leading-relaxed">{feature.description}</p>
          </article>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        <p className="text-xs tracking-[0.2em] uppercase text-body mb-8">From the kitchen</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {STORIES.map((story) => {
            const inner = (
              <>
                <div className="photo-tile overflow-hidden mb-4">
                  <picture className="block w-full">
                    <source
                      type="image/avif"
                      srcSet={story.photo.avifSrcSet}
                      sizes={STORY_IMAGE_SIZES}
                    />
                    <source
                      type="image/webp"
                      srcSet={story.photo.webpSrcSet}
                      sizes={STORY_IMAGE_SIZES}
                    />
                    <img
                      src={story.photo.src}
                      alt={story.photo.alt}
                      width={story.photo.width}
                      height={story.photo.height}
                      sizes={STORY_IMAGE_SIZES}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <p className="text-xs tracking-[0.18em] uppercase text-teal mb-1">
                  {story.category}
                </p>
                <h3 className="font-display text-2xl text-ink leading-snug group-hover:text-teal transition-colors">
                  {story.title}
                </h3>
              </>
            )

            if (story.href.startsWith('#')) {
              return (
                <button
                  key={story.title}
                  type="button"
                  onClick={onImport}
                  className="group text-left"
                >
                  {inner}
                </button>
              )
            }

            return (
              <Link key={story.title} to={story.href} className="group">
                {inner}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-body mb-6">Free to use. Sign in with Google to keep your recipes.</p>
        <button type="button" onClick={onSignIn} className="btn-primary">
          Get started — Sign in
        </button>
      </div>
    </section>
  )
}
