# StockWise AI — Stationery Wholesale Distribution & Inventory Management

Landing page for the college project **"AI-Powered Smart Wholesale Distribution &
Inventory Management System – Stationery Management."**

## Tech stack

- React 18 + Vite
- Tailwind CSS (utility classes, brand color tokens in `tailwind.config.js`)
- React Router (`react-router-dom`) — routing shell ready for more pages
- `lucide-react` — icon set used across the whole project
- `recharts` — sales overview line chart in the dashboard preview

## Getting started

```bash
npm install
npm run dev      # starts the dev server (http://localhost:5173)
npm run build    # production build into /dist
```

## Folder structure

```
stationery-landing/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx                 # React root + BrowserRouter
    ├── App.jsx                  # Route table — add future pages here
    ├── index.css                # Tailwind entry + small base styles
    ├── data/
    │   └── landingData.js       # All copy/content for the landing page
    ├── components/
    │   ├── ui/
    │   │   └── Button.jsx       # Shared button used on every page
    │   ├── layout/
    │   │   ├── Navbar.jsx       # Shared site header
    │   │   └── Footer.jsx       # Shared site footer
    │   └── landing/
    │       ├── Hero.jsx
    │       ├── DashboardPreview.jsx
    │       ├── FeaturesGrid.jsx
    │       ├── HowItWorks.jsx
    │       └── CTABanner.jsx
    └── pages/
        └── LandingPage.jsx       # Composes the sections above
```

## Adding more pages later

1. Create a new file under `src/pages/`, e.g. `src/pages/LoginPage.jsx`.
2. Register it in `src/App.jsx`:
   ```jsx
   <Route path="/login" element={<LoginPage />} />
   ```
3. Reuse `Navbar`, `Footer`, and `Button` from `src/components/` instead of
   rebuilding them, so every page shares the same header, footer and button
   styling.
4. Put any new shared UI pieces (cards, tables, modals, badges) in
   `src/components/ui/` so later pages can reuse them too.
