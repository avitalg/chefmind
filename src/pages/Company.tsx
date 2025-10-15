const Company = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Company</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            ChefMind was born from a simple idea: cooking should be accessible, organized, and enjoyable for everyone. 
            We believe that great recipes shouldn't be scattered across the internet or lost in forgotten bookmarks. 
            Our mission is to make recipe management effortless and intuitive.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To empower home cooks and professional chefs by providing a seamless platform for collecting, 
            organizing, and customizing recipes from any source. We're building the future of recipe management 
            through innovative technology and user-centered design.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-6">
            A world where every cook has their perfect recipe collection at their fingertips, where inspiration 
            flows freely, and where cooking becomes more creative and less chaotic. We envision ChefMind as the 
            central hub for culinary creativity and knowledge sharing.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">
                We constantly push the boundaries of what's possible in recipe management, 
                using cutting-edge AI and modern web technologies.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">Simplicity</h3>
              <p className="text-gray-600 text-sm">
                Complex problems deserve simple solutions. We believe great technology 
                should be intuitive and easy to use.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-3">Community</h3>
              <p className="text-gray-600 text-sm">
                We're building more than a product – we're fostering a community of 
                passionate cooks who share knowledge and inspiration.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-3">Privacy</h3>
              <p className="text-gray-600 text-sm">
                Your recipes are personal. We respect your privacy and give you complete 
                control over your culinary data.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              ChefMind started as a personal project when our founder struggled to keep track of recipes 
              scattered across different websites, cookbooks, and handwritten notes. The frustration of 
              losing a great recipe or spending hours searching for that perfect dish led to the creation 
              of a simple tool to import and organize recipes.
            </p>
            <p>
              Today, ChefMind serves thousands of home cooks and professional chefs worldwide, helping 
              them organize their culinary knowledge and discover new recipes. We're constantly evolving 
              based on user feedback and the latest technology trends.
            </p>
          </div>      

          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h3 className="font-semibold text-blue-800 mb-3">Get in Touch</h3>
            <p className="text-gray-600 mb-4">
              Have questions, feedback, or ideas? We'd love to hear from you. 
              Reach out to us and help shape the future of recipe management.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/" 
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors !text-white"
              >
                Try ChefMind →
              </a>
              <a 
                href="/about" 
                className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors !text-white"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
