import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { addUtmToPath } from '../../utils/utm';

export default function ImportRecipeWithImage() {
  useSEO({
    title: 'How to Import Recipes from Images',
    description: 'Learn how to import recipes from images using ChefMind. Upload a photo of a recipe and let our AI extract all the details automatically. Perfect for cookbooks, handwritten recipes, and recipe cards.',
    keywords: 'import recipe from image, recipe photo, recipe scanner, AI recipe extraction, cookbook recipes, handwritten recipes',
    url: '/stories/import-recipe-with-image',
    type: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Import Recipes from Images',
      description: 'Learn how to import recipes from images using ChefMind. Upload a photo of a recipe and let our AI extract all the details automatically.',
      author: {
        '@type': 'Organization',
        name: 'ChefMind'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ChefMind'
      },
      datePublished: '2024-01-01',
      dateModified: '2024-01-01'
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <article className="bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            How to Import Recipes from Images
          </h1>
          <p className="text-lg text-gray-600">
            Transform photos of recipes into digital format with ChefMind's AI-powered image recognition
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Why Import Recipes from Images?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Have you ever found a great recipe in a cookbook, on a recipe card, or handwritten in a notebook? 
              Instead of manually typing everything, ChefMind can extract the recipe details directly from a photo. 
              Our AI-powered system recognizes text, ingredients, and instructions from images, making it easy to 
              digitize your recipe collection.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Convert cookbook recipes to digital format in seconds</li>
              <li>Preserve handwritten family recipes</li>
              <li>Save recipes from recipe cards and magazines</li>
              <li>Extract recipes from screenshots and photos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Step-by-Step Guide
            </h2>
            
            <div className="space-y-6">
              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Sign In to Your Account
                </h3>
                <p className="text-gray-700">
                  First, make sure you're signed in to ChefMind with your Google account. 
                  This ensures your imported recipes are saved to your personal collection.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Navigate to the Home Page
                </h3>
                <p className="text-gray-700">
                  Go to the ChefMind homepage where you'll find the recipe import section. 
                  You'll see two options: "Import from URL" and "Import from Image".
                </p>
              </div>

              <div className="bg-[#EBF4F6] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Switch to Image Mode
                </h3>
                <p className="text-gray-700 mb-3">
                  Click on the "Import from Image" option to switch from URL mode to image upload mode. 
                  You'll see a drag-and-drop area appear.
                </p>
                <div className="bg-white rounded p-4 border border-[#7AB2B2]">
                  <p className="text-sm text-gray-600 italic">
                    💡 Tip: Make sure your image is clear and well-lit. The better the photo quality, 
                    the more accurate the recipe extraction will be.
                  </p>
                </div>
              </div>

              <div className="bg-[#7AB2B2] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#09637E] mb-3 flex items-center">
                  <span className="bg-[#088395] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  Upload Your Recipe Image
                </h3>
                <p className="text-gray-700 mb-3">
                  You can upload your recipe image in two ways:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Drag and Drop:</strong> Simply drag your image file into the upload area</li>
                  <li><strong>Click to Browse:</strong> Click on the upload area to open your file browser and select an image</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Supported formats include JPG, PNG, and other common image formats. 
                  Maximum file size is 10MB.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3 flex items-center">
                  <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">5</span>
                  Review the Preview
                </h3>
                <p className="text-gray-700">
                  Once uploaded, you'll see a preview of your image. You can remove it and try a different 
                  image if needed. When you're ready, click the "Import Recipe" button.
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-pink-800 mb-3 flex items-center">
                  <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">6</span>
                  AI Processing
                </h3>
                <p className="text-gray-700 mb-3">
                  ChefMind's AI will analyze your image and extract:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Recipe title</li>
                  <li>Ingredients with amounts and units</li>
                  <li>Step-by-step instructions</li>
                  <li>Additional details if available</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  This process usually takes just a few seconds.
                </p>
              </div>

              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-teal-800 mb-3 flex items-center">
                  <span className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">7</span>
                  Review and Edit
                </h3>
                <p className="text-gray-700">
                  After extraction, you'll see the parsed recipe with all the details. 
                  Review the information and make any necessary edits. You can adjust ingredient amounts, 
                  modify instructions, or add personal notes before saving.
                </p>
              </div>

              <div className="bg-cyan-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-cyan-800 mb-3 flex items-center">
                  <span className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">8</span>
                  Save to Your Collection
                </h3>
                <p className="text-gray-700">
                  Once you're satisfied with the recipe, click "Save Recipe" to add it to your collection. 
                  The recipe will be immediately available in your recipe list and accessible from any device.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Best Practices for Image Import
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📸</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Use Clear, High-Quality Images</h4>
                  <p className="text-gray-600 text-sm">
                    Ensure good lighting and focus. Blurry or dark images may result in less accurate extraction.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">📄</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Capture the Full Recipe</h4>
                  <p className="text-gray-600 text-sm">
                    Make sure the entire recipe is visible in the image, including all ingredients and instructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✍️</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Review Extracted Text</h4>
                  <p className="text-gray-600 text-sm">
                    Always review the extracted recipe before saving. AI is powerful but may need minor corrections.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🔄</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Edit as Needed</h4>
                  <p className="text-gray-600 text-sm">
                    Don't hesitate to make adjustments. You can edit ingredients, instructions, and other details 
                    to match your preferences.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">📚 Cookbook Recipes</h3>
                <p className="text-gray-600 text-sm">
                  Digitize your favorite recipes from physical cookbooks without typing everything manually.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">✍️ Handwritten Recipes</h3>
                <p className="text-gray-600 text-sm">
                  Preserve family recipes written by hand and make them easily accessible digitally.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">📋 Recipe Cards</h3>
                <p className="text-gray-600 text-sm">
                  Convert your collection of recipe cards into a searchable digital format.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">📱 Screenshots</h3>
                <p className="text-gray-600 text-sm">
                  Save recipes from social media, apps, or websites by taking a screenshot and uploading it.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">
              Troubleshooting
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Image Not Processing?</h3>
                <p className="text-gray-600 text-sm">
                  Make sure the image file is under 10MB and in a supported format (JPG, PNG, etc.). 
                  Try taking a new photo with better lighting if extraction fails.
                </p>
              </div>
              <div className="border-l-4 border-[#088395] bg-[#EBF4F6] p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Incorrect Text Extraction?</h3>
                <p className="text-gray-600 text-sm">
                  If the AI doesn't extract the recipe correctly, you can manually edit all fields before saving. 
                  The extraction is a starting point that you can refine.
                </p>
              </div>
              <div className="border-l-4 border-green-400 bg-green-50 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm">
                  Check out our <Link to={addUtmToPath('/faq', { utm_content: 'story_import_image_faq' })} className="text-[#088395] hover:underline">FAQ page</Link> for more 
                  information, or try the manual recipe creation option if image import doesn't work for your specific case.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-[#EBF4F6] rounded-lg p-6 mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ready to Try It?</h3>
            <p className="text-gray-700 mb-4">
              Start importing recipes from images today and build your digital recipe collection!
            </p>
            <Link 
              to={addUtmToPath('/', { utm_content: 'story_import_image_cta' })} 
              className="inline-block bg-[#088395] px-6 py-3 rounded-lg hover:bg-[#09637E] transition-colors !text-white font-medium"
            >
              Go to Homepage →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
