import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { addUtmToPath } from '../../utils/utm';

export default function PreservingFamilyRecipes() {
  useSEO({
    title: 'Preserving Family Recipes: Keeping Traditions Alive',
    description: 'Discover how to preserve your family recipes and keep culinary traditions alive for future generations. Learn how ChefMind helps you digitize and organize your family\'s most cherished recipes.',
    keywords: 'family recipes, recipe preservation, family traditions, cooking memories, recipe collection, family cookbook',
    url: '/stories/preserving-family-recipes',
    type: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Preserving Family Recipes: Keeping Traditions Alive',
      description: 'Discover how to preserve your family recipes and keep culinary traditions alive for future generations.',
      author: {
        '@type': 'Organization',
        name: 'ChefMind'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ChefMind'
      },
      datePublished: '2024-01-15',
      dateModified: '2024-01-15'
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <article className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Preserving Family Recipes: Keeping Traditions Alive
          </h1>
          <p className="text-lg text-gray-600">
            How to safeguard your family's culinary heritage and pass down treasured recipes to future generations
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              The Power of Family Recipes
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Family recipes are more than just instructions for cooking—they're vessels of memory, tradition, and love. 
              That secret ingredient your grandmother always added, the way your mother kneaded the dough, the special 
              occasion when a recipe was first made—these stories are woven into every dish. But as time passes, these 
              precious recipes can be lost, forgotten, or damaged.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Preserving family recipes isn't just about keeping a list of ingredients; it's about maintaining a 
              connection to your heritage, honoring those who came before you, and ensuring future generations can 
              experience the same flavors and memories that shaped your family.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              The Challenge of Recipe Preservation
            </h2>
            <div className="bg-[#EBF4F6] rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#09637E] mb-3">Common Preservation Challenges:</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Fading handwriting:</strong> Old recipe cards and notebooks deteriorate over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Lost recipes:</strong> Recipes stored in memory or on paper can be easily misplaced</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Incomplete instructions:</strong> Family recipes often rely on "a pinch of this" or "until it looks right"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Scattered sources:</strong> Recipes spread across cookbooks, cards, and family members</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Language barriers:</strong> Recipes passed down in different languages or dialects</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              How ChefMind Helps Preserve Your Family Recipes
            </h2>
            <div className="space-y-6">
              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Digitize Handwritten Recipes
                </h3>
                <p className="text-gray-700 mb-3">
                  Have a treasured recipe card in your grandmother's handwriting? Simply take a photo and upload it to ChefMind. 
                  Our AI-powered image recognition extracts all the details—ingredients, measurements, and instructions—preserving 
                  the recipe digitally while you can still keep the original safe.
                </p>
                <div className="bg-white rounded p-4 border border-[#7AB2B2]">
                  <p className="text-sm text-gray-600 italic">
                    💡 Tip: Take clear, well-lit photos of recipe cards. The better the image quality, the more accurate the extraction will be.
                  </p>
                </div>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Organize Your Family Collection
                </h3>
                <p className="text-gray-700 mb-3">
                  Gather recipes from multiple sources—cookbooks, websites, handwritten notes, and family members. ChefMind 
                  helps you organize everything in one secure, accessible place. No more searching through drawers or calling 
                  relatives to find that one special recipe.
                </p>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Add Personal Notes and Memories
                </h3>
                <p className="text-gray-700 mb-3">
                  When you create or edit recipes in ChefMind, you can add personal notes, memories, and stories. Document 
                  who the recipe came from, special occasions when it was served, or family traditions associated with it. 
                  These details become part of your family's culinary legacy.
                </p>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  Standardize and Complete Recipes
                </h3>
                <p className="text-gray-700 mb-3">
                  Family recipes often have vague measurements or missing steps. ChefMind's editing tools let you standardize 
                  measurements, add missing instructions, and clarify ambiguous steps—all while preserving the original essence 
                  of the recipe.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Creating Your Family Recipe Collection
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Start by gathering recipes from family members, old cookbooks, and recipe boxes. Use ChefMind to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Import recipes from family websites or blogs</li>
              <li>Upload photos of handwritten recipe cards</li>
              <li>Create new recipes from memory, documenting family favorites</li>
              <li>Edit and refine recipes to ensure they're complete and accurate</li>
            </ul>
            <div className="bg-[#7AB2B2] rounded-lg p-6">
              <h3 className="font-semibold text-[#09637E] mb-3">Share the Legacy</h3>
              <p className="text-gray-700 mb-4">
                Once your recipes are in ChefMind, they're safely stored in the cloud. Share access with family members 
                so everyone can contribute and enjoy the collection. Your family's culinary traditions will live on for 
                generations to come.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Getting Started
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Ready to preserve your family's culinary heritage? Start by signing in to ChefMind and begin collecting 
              your family recipes. Whether you're digitizing old recipe cards, importing from family websites, or creating 
              recipes from memory, ChefMind makes it easy to build and maintain your family recipe collection.
            </p>
            <div className="bg-[#EBF4F6] rounded-lg p-6 mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Start Preserving Today</h3>
              <p className="text-gray-700 mb-4">
                Join thousands of families preserving their culinary traditions with ChefMind
              </p>
              <Link
                to={addUtmToPath('/', { utm_content: 'story_preserving_cta' })}
                className="inline-block bg-[#088395] px-6 py-3 rounded-lg hover:bg-[#09637E] transition-colors !text-white font-medium"
              >
                Get Started →
              </Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
