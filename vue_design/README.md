# List of Dog Breeds

A Vue 3 app that lets you browse all dog breeds and view a random photo of each one. Built with the Dog CEO API, PrimeVue, and Vue Router.

## Setup

   ** Navigate into the project folder
   ``` bash
   cd vue_project
   ```

   ** Install dependencies
   ```bash
   npm install
   ```

   ** Start the development server
   ```bash
   npm run dev
   ```

   ** Open your browser:
   - The terminal will display the local URL (`http://localhost:5173`)
   - Click the link or navigate to it manually

  ** Usage 
   - Click **"Show Breeds"** to fetch and display all dog breeds
   - Click any breed card to view a random image and breed details
   - Use the **"⬅ Back"** link to return to the breed list
   - Hover over breed cards to see the lift and glow effect

## Features

**Breed Overview Grid**
- Display all dog breeds in a responsive grid layout
- Real-time data fetching from the Dog CEO API
- PrimeVue Card components with smooth animations
- Lift and glow hover effects for interactive feel

**Breed Detail Page**
- View a random image for each breed
- Session-based image caching (cached per breed during your session)
- Back navigation with smooth page transitions
- Loading and error states with PrimeVue ProgressSpinner

**Caching System**
- In-memory session-level caching for breed list
- Per-breed image caching to avoid repeated API calls
- Caches clear on full page refresh

## Project Structure

```
vue_project/
├── src/
│   ├── components/            
│   │   ├── DogBreeds.vue         # Home - breed overview 
│   ├── pages/       
│   │    ├──Breed.vue             # Detail - single breed and image
│   │    ├──BreedDetail.vue       # API calls and caching
│   ├── services/
│   │   └── dogApi.js           
│   ├── App.vue                 
│   ├── main.js                 
│   └── router.js               
├── public/                     
├── index.html                  
├── package.json                
├── vite.config.js              
└── jsconfig.json               
```


