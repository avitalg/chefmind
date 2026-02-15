import { useSEO } from '../hooks/useSEO';

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
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About ChefMind</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            ChefMind is a modern recipe management application that makes it easy to collect, 
            organize, and customize recipes from any website. Whether you're a home cook 
            looking to build your personal recipe collection or a professional chef managing 
            multiple recipes, ChefMind provides the tools you need.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li><strong>Easy Recipe Import:</strong> Simply paste any recipe URL and let our AI-powered parser extract all the details</li>
            <li><strong>Smart Organization:</strong> Automatically categorize and organize your recipes for easy browsing</li>
            <li><strong>Customizable Recipes:</strong> Edit ingredients, instructions, and details to make recipes your own</li>
            <li><strong>Secure Authentication:</strong> Sign in with Google for a secure, personalized experience</li>
            <li><strong>Modern Interface:</strong> Clean, responsive design that works on all devices</li>
            <li><strong>Real-time Updates:</strong> Changes sync instantly across all your devices</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="bg-[#EBF4F6] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#088395]">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Import</h3>
              <p className="text-gray-600 text-sm">Paste any recipe URL and our AI will extract all the details automatically</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customize</h3>
              <p className="text-gray-600 text-sm">Edit ingredients, instructions, and details to make the recipe perfect for you</p>
            </div>
            <div className="text-center">
              <div className="bg-[#EBF4F6] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#088395]">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Enjoy</h3>
              <p className="text-gray-600 text-sm">Access your personalized recipe collection anytime, anywhere</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Privacy & Security</h2>
          <p className="text-gray-600 mb-4">
            Your privacy is important to us. ChefMind uses secure authentication and 
            encrypts your data. We don't share your personal information or recipes 
            with third parties. All data is stored securely and you have full control 
            over your recipe collection.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="font-semibold text-gray-800 mb-3">Get Started Today</h3>
            <p className="text-gray-600 mb-4">
              Ready to build your perfect recipe collection? Sign in with Google and 
              start importing your favorite recipes in minutes.
            </p>
            <a 
              href="/" 
              className="inline-block bg-[#088395] px-6 py-3 rounded-lg hover:bg-[#09637E] transition-colors !text-white"
            >
              Start Cooking →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
