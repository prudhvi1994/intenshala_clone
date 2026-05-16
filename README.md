# Internshala Clone

A pixel-faithful React clone of [internshala.com/internships](https://internshala.com/internships/), built with Vite + React and CSS Modules.

## Features

- **Live data** — fetches from `https://internshala.com/hiring/search`; falls back to bundled mock data gracefully (CORS blocks direct browser access)
- **Frontend-only filtering** — profile, location, duration, and minimum stipend — all instant, zero extra network requests
- **Active filter chips** — see and remove individual filters at a glance
- **Keyword search** — across title, company, and profile
- **Pagination** — 8 cards per page
- **Responsive layout** — stacks to single column on mobile

## Project Structure

```
internshala-clone/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component
    ├── App.module.css        # Page-level layout
    ├── index.css             # Global design tokens + reset
    │
    ├── data/
    │   └── internships.js    # API data + FILTER_OPTIONS constants
    │
    ├── hooks/
    │   └── useInternships.js # Fetch + filter logic (custom hook)
    │
    ├── utils/
    │   └── helpers.js        # Pure utility functions (initials, colours, format)
    │
    └── components/
        ├── Navbar.jsx / .module.css
        ├── Hero.jsx / .module.css
        ├── FilterSidebar.jsx / .module.css
        ├── InternshipCard.jsx / .module.css
        └── ResultsPanel.jsx / .module.css
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

## Build for Production

```bash
npm run build
# Output goes to dist/
```

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag-and-drop the dist/ folder at app.netlify.com/drop
```

### GitHub Pages

```bash
# Add to vite.config.js: base: '/<repo-name>/'
npm run build
npx gh-pages -d dist
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool & dev server |
| React 18 | UI framework |
| CSS Modules | Scoped component styles |
| Tabler Icons | Icon font |
| DM Sans | Typography |
