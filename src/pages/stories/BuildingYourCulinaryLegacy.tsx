import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

export default function BuildingYourCulinaryLegacy() {
  useSEO({
    title: 'Building Your Culinary Legacy: Documenting Recipes for Future Generations',
    description: 'Learn how to build and document your culinary legacy for future generations. Discover how ChefMind helps you create a lasting recipe collection that your family will treasure for years to come.',
    keywords: 'culinary legacy, recipe documentation, family cookbook, recipe collection, cooking heritage, recipe legacy',
    url: '/stories/building-your-culinary-legacy',
    type: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Building Your Culinary Legacy: Documenting Recipes for Future Generations',
      description: 'Learn how to build and document your culinary legacy for future generations.',
      author: {
        '@type': 'Organization',
        name: 'ChefMind'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ChefMind'
      },
      datePublished: '2024-01-25',
      dateModified: '2024-01-25'
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <article className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Building Your Culinary Legacy: Documenting Recipes for Future Generations
          </h1>
          <p className="text-lg text-gray-600">
            Create a lasting culinary legacy that will be treasured by your family for generations to come
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              What is a Culinary Legacy?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Your culinary legacy is more than a collection of recipes—it's a living document of your family's food traditions, 
              cooking techniques, and the stories that make each dish meaningful. It's the knowledge and wisdom you pass down 
              to future generations, ensuring that your family's unique culinary identity continues to thrive.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Building a culinary legacy means documenting not just what you cook, but how you cook it, why it matters, and 
              the memories and traditions associated with each recipe. It's about creating a resource that your children, 
              grandchildren, and beyond can turn to for guidance, inspiration, and connection to their heritage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Why Build Your Culinary Legacy?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#EBF4F6] p-6 rounded-lg">
                <h3 className="font-semibold text-[#09637E] mb-3">Preserve Family Traditions</h3>
                <p className="text-gray-700 text-sm">
                  Keep your family's unique cooking methods, secret ingredients, and time-honored techniques alive for future 
                  generations to discover and enjoy.
                </p>
              </div>
              <div className="bg-[#7AB2B2] p-6 rounded-lg">
                <h3 className="font-semibold text-[#09637E] mb-3">Share Knowledge</h3>
                <p className="text-gray-700 text-sm">
                  Document your cooking expertise so others can learn from your experience, techniques, and culinary wisdom.
                </p>
              </div>
              <div className="bg-[#EBF4F6] p-6 rounded-lg">
                <h3 className="font-semibold text-[#09637E] mb-3">Create Connections</h3>
                <p className="text-gray-700 text-sm">
                  Build bridges between generations through shared recipes and cooking experiences that bring families together.
                </p>
              </div>
              <div className="bg-[#7AB2B2] p-6 rounded-lg">
                <h3 className="font-semibold text-[#09637E] mb-3">Document Your Journey</h3>
                <p className="text-gray-700 text-sm">
                  Record your culinary evolution—from favorite childhood dishes to signature recipes you've perfected over the years.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              How ChefMind Helps You Build Your Legacy
            </h2>
            <div className="space-y-6">
              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Comprehensive Recipe Documentation
                </h3>
                <p className="text-gray-700 mb-3">
                  ChefMind provides a structured way to document every aspect of your recipes. Import from websites, upload 
                  images of handwritten recipes, or create recipes from scratch. Each recipe can include detailed ingredients, 
                  step-by-step instructions, and personal notes about the story behind the dish.
                </p>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Preserve Multiple Sources
                </h3>
                <p className="text-gray-700 mb-3">
                  Your culinary legacy likely comes from many sources—family recipes, cookbooks, online discoveries, and your 
                  own creations. ChefMind helps you gather all of these in one organized, searchable collection. No matter 
                  where a recipe comes from, it becomes part of your documented legacy.
                </p>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Edit and Refine Over Time
                </h3>
                <p className="text-gray-700 mb-3">
                  As you continue cooking and experimenting, your recipes evolve. ChefMind makes it easy to update and refine 
                  recipes, documenting your culinary journey. Future generations will see not just the final recipe, but how 
                  it developed over time.
                </p>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  Secure and Accessible
                </h3>
                <p className="text-gray-700 mb-3">
                  Your culinary legacy is safely stored in the cloud, accessible from any device. Unlike physical cookbooks 
                  that can be lost or damaged, your digital recipe collection is preserved and can be easily shared with 
                  family members or passed down to future generations.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              What to Include in Your Culinary Legacy
            </h2>
            <div className="bg-[#EBF4F6] rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#09637E] mb-3">Essential Elements:</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Family favorites:</strong> Recipes that have been passed down through generations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Signature dishes:</strong> Recipes you've perfected and are known for</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Holiday traditions:</strong> Special recipes associated with celebrations and family gatherings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Cultural heritage:</strong> Recipes that connect you to your cultural background</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Personal creations:</strong> Original recipes you've developed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#088395] mr-2">•</span>
                  <span><strong>Stories and memories:</strong> The context and meaning behind each recipe</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Getting Started: Building Your Legacy Step by Step
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#088395] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">1</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Start with Your Favorites</h3>
                  <p className="text-gray-600 text-sm">
                    Begin by documenting your most cherished recipes—the ones you make regularly and the ones that hold special 
                    meaning. These are the foundation of your culinary legacy.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#088395] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">2</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Gather from All Sources</h3>
                  <p className="text-gray-600 text-sm">
                    Collect recipes from cookbooks, websites, handwritten notes, and family members. Use ChefMind's import 
                    features to bring everything together in one place.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#088395] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">3</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Add Personal Context</h3>
                  <p className="text-gray-600 text-sm">
                    As you add each recipe, include notes about its origin, significance, and any special memories or traditions 
                    associated with it. These details are what transform a recipe collection into a legacy.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#088395] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">4</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Keep It Growing</h3>
                  <p className="text-gray-600 text-sm">
                    Your culinary legacy is a living document. Continue adding new recipes, refining existing ones, and documenting 
                    your ongoing culinary journey. The more you add, the richer your legacy becomes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              The Gift of a Culinary Legacy
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Building your culinary legacy is one of the greatest gifts you can give to future generations. It's a way to 
              share not just recipes, but the love, care, and tradition that goes into every dish. It's a connection to the 
              past and a guide for the future.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              With ChefMind, creating and maintaining your culinary legacy is easier than ever. Start building yours today, 
              and give your family a treasure that will be cherished for generations to come.
            </p>
            <div className="bg-[#7AB2B2] rounded-lg p-6 my-6">
              <h3 className="font-semibold text-[#09637E] mb-3">A Legacy That Lasts</h3>
              <p className="text-gray-700">
                Your recipes, techniques, and stories are valuable. By documenting them in ChefMind, you're ensuring they 
                survive and thrive, becoming a resource that your family can turn to for years to come. Start building your 
                culinary legacy today.
              </p>
            </div>
            <div className="bg-[#EBF4F6] rounded-lg p-6 mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Begin Your Legacy</h3>
              <p className="text-gray-700 mb-4">
                Start documenting your culinary legacy with ChefMind today
              </p>
              <Link
                to="/"
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
