# Career Navigator Frontend (React)

Classic, professional UI built with plain React and CSS for the Career Navigator Platform.

## Highlights

- Ocean Professional theme (see `src/index.css` and `src/App.css`)
- App shell with TopNav + Sidebar + main content
- Routes: `/` Explore, `/recommendations`, `/library`, `/goals`
- Accessible navigation and focus styles
- Local mock data with an easy path to a real API

## Run locally

- `npm start` — dev server on http://localhost:3000
- `npm test` — unit tests
- `npm run build` — production build

## Extending to real APIs

- Base URL is resolved by `src/utils/env.js`:
  - REACT_APP_API_BASE or REACT_APP_BACKEND_URL
- Use `src/services/apiClient.js`:
  - PUBLIC_INTERFACE get(path) and post(path, body)
  - Example:
    ```js
    import api from './services/apiClient';
    const careers = await api.get('/careers');
    ```
- Pages currently fetch mock data from `src/services/careers.js`. Replace those functions with API calls when backend is ready.

Environment variables recognized:
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

Do not commit a .env; create a `.env.local` during development if needed.

## Structure

- `src/components/common` — Button, Card, SearchBar, etc.
- `src/components/layout` — TopNav, Sidebar
- `src/pages` — Explore, Recommendations, Library, Goals
- `src/hooks` — `useAsync`, `useTheme`
- `src/store` — simple context provider

## Accessibility Notes

- ARIA labels on top nav, sidebar, search, and drawer placeholder
- Keyboard focus ring via `--focus-ring`
- Sidebar collapsible on small screens with a visible toggle

## Styling

- CSS variables define the theme
- Subtle shadows and clean layout
- Badge classes for consistent tags (`.badge.info`, `.badge.primary`, `.badge.warn`, `.badge.success`)
