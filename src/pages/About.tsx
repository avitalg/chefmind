import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { addUtmToPath } from '../utils/utm';

const About = () => {
  useSEO({
    title: 'About ChefMind',
    description: 'Learn about ChefMind, a modern recipe management application that makes it easy to collect, organize, and customize recipes from any website.',
    keywords: 'about chefmind, recipe management, cooking app, recipe collection',
    url: '/about',
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">About ChefMind</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            ChefMind is your intelligent recipe companion, designed to transform how you collect, 
            organize, and personalize recipes. Whether you're discovering new dishes from your 
            favorite food blogs, capturing recipes from images, or creating your own culinary 
            masterpieces, ChefMind makes recipe management effortless and enjoyable.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">Why ChefMind?</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li><strong>AI-Powered Import:</strong> Instantly extract recipes from any website URL or upload an image - our advanced AI handles all the parsing</li>
            <li><strong>Image-to-Recipe Magic:</strong> Simply snap a photo of a recipe and watch it transform into a structured, editable format</li>
            <li><strong>Complete Customization:</strong> Edit ingredients, adjust quantities, modify instructions, and personalize every detail to match your preferences</li>
            <li><strong>Recipe Ideas Generator:</strong> Discover new recipes based on ingredients you have, sparking creativity in your kitchen</li>
            <li><strong>Find by Ingredients:</strong> Search your collection by available ingredients to make the most of what's in your pantry</li>
            <li><strong>Secure & Private:</strong> Your recipes are yours alone - secure Google authentication ensures your collection stays private</li>
            <li><strong>Accessible Everywhere:</strong> Beautiful, responsive design that works seamlessly on desktop, tablet, and mobile devices</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="bg-[#cbf3f0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#2ec4b6]">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Import or Create</h3>
              <p className="text-gray-600 text-sm">Import recipes from URLs, upload recipe images, or create your own from scratch</p>
            </div>
            <div className="text-center">
              <div className="bg-[#7AB2B2] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customize</h3>
              <p className="text-gray-600 text-sm">Edit ingredients, adjust quantities, modify instructions, and make each recipe uniquely yours</p>
            </div>
            <div className="text-center">
              <div className="bg-[#cbf3f0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#2ec4b6]">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Cook & Enjoy</h3>
              <p className="text-gray-600 text-sm">Access your personalized recipe collection anytime, anywhere, and never lose a great recipe again</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">Privacy & Security</h2>
          <p className="text-gray-600 mb-4">
            Your privacy and data security are our top priorities. ChefMind uses industry-standard 
            Google authentication to ensure your account is secure. Your recipes and personal 
            information are stored safely and never shared with third parties. You have complete 
            control over your recipe collection - add, edit, or delete recipes whenever you want.
          </p>

          <div className="bg-[#cbf3f0] rounded-lg p-6 mt-8">
            <h3 className="font-semibold text-[#1fa396] mb-3">Ready to Transform Your Cooking?</h3>
            <p className="text-gray-700 mb-4">
              Join thousands of home cooks and chefs who are already using ChefMind to organize 
              their recipe collections. Sign in with Google and start building your personalized 
              recipe library in minutes - it's free and easy!
            </p>
            <Link 
              to={addUtmToPath('/', { utm_content: 'about_cta' })} 
              className="inline-block bg-[#2ec4b6] px-6 py-3 rounded-lg hover:bg-[#1fa396] transition-colors !text-white font-medium"
            >
              Get Started Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
