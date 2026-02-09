# ChefMind - Recipe Management Application

ChefMind is a modern web application that allows users to import, create, organize, and manage their favorite recipes. Built with React, TypeScript, and Node.js, it provides a seamless experience for recipe collection and customization.

## Features

- 🔐 **JWT Authentication** - Secure sign-in with Google OAuth and JWT tokens
- 📥 **Recipe Import** - Import recipes from any website by simply pasting the URL
- ✍️ **Manual Recipe Creation** - Create recipes from scratch with our intuitive form
- ✏️ **Recipe Editing** - Customize and edit imported or manually created recipes
- 📚 **Recipe Management** - Organize and manage your personal recipe collection
- ❓ **FAQ Page** - Comprehensive help and frequently asked questions
- 🥗 **Recipe ideas** (logged-out) - Enter ingredients and get 5 recipe title suggestions via Spoonacular API
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS
- 🔄 **Real-time Updates** - Instant synchronization between frontend and backend

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Biome** for linting and formatting

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose for data persistence
- **JWT** for secure authentication
- **Passport.js** for Google OAuth integration
- **Cheerio** for web scraping
- **Anthropic API** for AI-powered recipe parsing

## Project Structure

```
javascript/
├── vite-project/          # React frontend
│   ├── src/
│   │   ├── contexts/      # React context for state management
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   └── homepage.tsx   # Home page with recipe import
│   └── package.json
└── server/                # Node.js backend
    ├── models/            # MongoDB models
    ├── app.js             # Express server setup
    ├── recipeParser.js    # Recipe parsing logic
    ├── recipeStorage.js   # Database operations
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials
- Anthropic API key
- JWT secret key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd javascript
   ```

2. **Install frontend dependencies**
   ```bash
   cd vite-project
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up backend environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/chefmind
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
   ANTHROPIC_API_KEY=your_anthropic_api_key
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   FRONTEND_ORIGIN=http://localhost:5173
   ```

5. **Set up frontend environment (optional)**

   In `vite-project/`, you can add a `.env` file. For the **Recipe ideas** page (logged-out users), add:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```
   Get a free key at [spoonacular.com/food-api](https://spoonacular.com/food-api).

6. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm start
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd vite-project
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

1. **Sign In** - Click "Sign in with Google" to authenticate
2. **Import Recipes** - Paste any recipe URL in the import form
3. **Create Recipes** - Use the "Create Recipe" button to add recipes manually
4. **View Recipes** - Browse your imported and created recipes on the homepage
5. **Edit Recipes** - Click the edit button to customize any recipe
6. **Delete Recipes** - Remove recipes you no longer need
7. **Get Help** - Visit the FAQ page for answers to common questions

## API Endpoints

- `GET /api/recipes` - Get all user recipes
- `POST /api/recipes/import` - Import recipe from URL
- `GET /api/recipes/:id` - Get specific recipe by ID
- `PUT /api/recipes/:id` - Update recipe by ID
- `DELETE /api/recipes/:id` - Delete recipe by ID
- `GET /auth/google` - Google OAuth login
- `POST /auth/logout` - Logout user

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting
- `npm run format` - Format code

**Backend:**
- `npm start` - Start production server

### Code Quality

This project uses:
- **Biome** for linting and formatting
- **ESLint** for additional code quality checks
- **TypeScript** for type safety

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the ISC License.
