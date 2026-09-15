# Srijith A Bhandare — Portfolio

Personal portfolio website for Srijith A Bhandare, a Data Science student and developer. It showcases projects, technical skills, and achievements through a high-performance, cinematic React application.

## Technologies

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP, Motion, Lenis (Smooth Scroll)
- **Backend/Serving:** Express, Node.js (esbuild bundled)
- **Deployment:** Google Cloud Run (Containerized)

## Setup and Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server (with hot reload):**
   ```bash
   npm run dev
   ```
   *The server will start on port 3000.*

## Production Build

1. **Create the optimized production build:**
   ```bash
   npm run build
   ```
   *This compiles the React application via Vite and bundles the Express server using esbuild.*

2. **Start the production server:**
   ```bash
   npm run start
   ```

## Repository Structure

- `/src/components`: UI components (React, Tailwind, GSAP)
- `/src/assets`: Images and visual assets
- `/server.ts`: Express application entry point
- `/vite.config.ts`: Vite configuration
