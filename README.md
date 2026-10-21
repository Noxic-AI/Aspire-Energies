# HelioGrid Solar Landing Page

A React + Vite single-page marketing site for HelioGrid Solar Systems.

## Stack

- React 19
- Vite 8
- Tailwind CSS v4 (via Vite plugin)
- Lucide React icons

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Preview production build locally:

```bash
npm run preview
```

## Image Configuration (Proper Way)

All image paths are centrally configured in [src/config/siteConfig.js](src/config/siteConfig.js).

Update only this object when changing branding or project photos:

```js
export const siteImages = {
	hero: '/hero-solar.png',
	projects: {
		campus: '/project-campus.png',
		factory: '/project-factory.png',
		home: '/project-home.png',
		warehouse: '/project-warehouse.png',
	},
	gallery: ['/hero-solar.png', '/project-factory.png', '/project-home.png'],
}
```

### Where to put images

- Put website images in [public](public)
- Refer to them using root paths like /hero-solar.png

Current required image files:

- [public/hero-solar.png](public/hero-solar.png)
- [public/project-campus.png](public/project-campus.png)
- [public/project-factory.png](public/project-factory.png)
- [public/project-home.png](public/project-home.png)
- [public/project-warehouse.png](public/project-warehouse.png)

### Recommended image specs

- Hero image: 2400px wide, JPG or WebP, under 450 KB
- Project cards: at least 1400x900, matching style/crop
- Keep all project images with similar lighting and tone for visual consistency

### Fast replacement workflow

1. Add/replace files in [public](public)
2. Update paths in [src/config/siteConfig.js](src/config/siteConfig.js)
3. Verify in dev with npm run dev
4. Run npm run build before deployment

## Key Files

- Main app: [src/App.jsx](src/App.jsx)
- Global styles and design tokens: [src/index.css](src/index.css)
- Component-level styling and motion helpers: [src/App.css](src/App.css)
- Centralized site content config: [src/config/siteConfig.js](src/config/siteConfig.js)

## Notes

- Contact form is currently UI-only (no backend submission).
- The page uses smooth scroll section navigation with anchor IDs.
# Aspire-Energies
