# Claryo

Claryo is an intelligent product management workspace designed to seamlessly capture raw user feedback, extract actionable insights, prioritize strategic initiatives, and draft comprehensive Product Requirements Documents (PRDs). 

With a premium UI built for speed, PMs can capture unstructured thoughts and let AI structure them into high-quality product decisions.

## Features
- **Intelligent Feedback Ingestion:** Paste raw Slack messages, transcripts, or notes to extract core themes and pain points.
- **Deep Product Thinking:** Automatic problem prioritization, tradeoff analysis, and clarity evaluation.
- **Interactive PRD Generation:** Auto-drafting PRDs that can be intuitively edited directly in the browser with offline-safe autosaving.
- **Beautiful Mimir-inspired UI:** Framer Motion-driven interactions, dynamic sidebars, and elegant glassmorphism.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS (CSS Modules & Custom Properties)
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prithism/Claryo-.git
   cd Claryo-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` or `.env.local` file in the root directory based on the `.env.example`.
   You will need the following keys for the AI extraction pipeline:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Commands

- `npm run dev` — Starts the Next.js development server with Turbopack.
- `npm run build` — Creates an optimized production build.
- `npm start` — Starts the Next.js production server.
- `npm run lint` — Runs ESLint to catch formatting and code quality issues.

## Project Structure
- `/src/app` — Next.js App Router pages (Dashboard, Insights, Input, Decision, PRD) and API routes (`/api/v1/`).
- `/src/components` — Reusable UI components (Buttons, Cards, Inputs) and Layout shells.
- `/src/features` — Feature-specific business logic and complex UI (e.g., FeedbackIngestion).
- `/src/lib` — Utilities and shared configuration.

## Quality & Standards
- Strict TypeScript constraints (no `any` types).
- Error boundaries and graceful try/catch blocks on all API parsing.
- Semantic HTML and accessibility considerations (ARIA labels, keyboard navigation).
