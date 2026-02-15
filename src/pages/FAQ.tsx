import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

const FAQ = () => {
  useSEO({
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about ChefMind, recipe import, editing, security, and how to get the most out of your recipe management experience.',
    keywords: 'chefmind faq, recipe management faq, cooking app help, recipe import questions',
    url: '/faq',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I import a recipe from a website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply paste the recipe URL into the import form on the homepage and click "Import Recipe". ChefMind will automatically extract the ingredients, instructions, and other details from the website.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I create recipes manually without importing from a website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click the "Create Recipe" button on the homepage to add recipes from scratch. You can enter the title, ingredients, and instructions manually.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is my recipe data secure and private?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely! Your recipes are stored securely and are only accessible to you. We use JWT authentication and never share your personal data with third parties.'
          }
        }
      ]
    }
  });
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  }

  const faqData = [
    {
      question: "How do I import a recipe from a website?",
      answer: "Simply paste the recipe URL into the import form on the homepage and click 'Import Recipe'. ChefMind will automatically extract the ingredients, instructions, and other details from the website. Make sure you're signed in to save the recipe to your collection."
    },
    {
      question: "Can I create recipes manually without importing from a website?",
      answer: "Yes! Click the 'Create Recipe' button on the homepage to add recipes from scratch. You can enter the title, ingredients, and instructions manually. This is perfect for family recipes, personal creations, or recipes from cookbooks."
    },
    {
      question: "How do I edit a recipe after importing or creating it?",
      answer: "Click the edit button (pencil icon) next to any recipe in your collection. You can modify the title, adjust ingredient amounts, edit instructions, or add personal notes. Changes are automatically saved to your account."
    },
    {
      question: "Is my recipe data secure and private?",
      answer: "Absolutely! Your recipes are stored securely and are only accessible to you. We use JWT authentication and never share your personal data with third parties. Your recipes are backed up and can be accessed from any device when you're signed in."
    },
    {
      question: "Can I access my recipes from multiple devices?",
      answer: "Yes! Once you sign in with Google, your recipes are synced across all your devices. You can access your collection from your phone, tablet, or computer by simply signing in with the same Google account."
    },
    {
      question: "What types of websites can I import recipes from?",
      answer: "ChefMind can import recipes from most popular cooking websites including AllRecipes, Food Network, BBC Good Food, Serious Eats, and many others. If you encounter a website that doesn't work, please let us know and we'll work on adding support for it."
    },
    {
      question: "How do I delete a recipe I no longer want?",
      answer: "Click the delete button (trash icon) next to any recipe in your collection. You'll be asked to confirm the deletion to prevent accidental removal. Once deleted, the recipe cannot be recovered."
    },
    {
      question: "Can I organize my recipes into categories or folders?",
      answer: "Currently, ChefMind displays all your recipes in a single list. We're working on adding categorization features like tags, folders, and search functionality. Stay tuned for updates!"
    },
    {
      question: "What if I forget my Google password?",
      answer: "Since ChefMind uses Google authentication, you'll need to reset your password through Google's account recovery process. Visit Google's account recovery page and follow their instructions to regain access to your account."
    },
    {
      question: "Is ChefMind free to use?",
      answer: "Yes! ChefMind is completely free to use. You can import unlimited recipes, create manual recipes, and access your collection from any device without any subscription fees or hidden costs."
    },
    {
      question: "Can I share my recipes with others?",
      answer: "Currently, recipes are private to your account. We're planning to add sharing features in future updates, including the ability to share individual recipes or entire collections with family and friends."
    },
    {
      question: "What if I have technical issues or need help?",
      answer: "If you encounter any problems or have questions not covered in this FAQ, please contact our support team. We're here to help and continuously improve ChefMind based on user feedback."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 w-full min-w-0">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about ChefMind and how to get the most out of your recipe management experience.
        </p>
      </div>

      <div className="space-y-4 w-full min-w-0">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full min-w-0"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors min-w-0"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex-1 min-w-0">
                {item.question}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                  openItems.has(index) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openItems.has(index) && (
              <div className="px-6 pb-4 border-t border-gray-100 min-w-0">
                <p className="text-gray-700 leading-relaxed pt-4 break-words">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#EBF4F6] rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Still have questions?</h3>
        <p className="text-gray-700 mb-4">
          Can't find the answer you're looking for? We're here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#088395] rounded-lg hover:bg-[#09637E] transition-colors !text-white"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ
