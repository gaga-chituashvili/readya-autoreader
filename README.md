📁 Project Structure

```
readya-autoreader/
├── README.md                # Project documentation and setup instructions
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── vercel.json             # Vercel deployment configuration
├── index.html              # Root HTML file

├── public/                 # Static assets (served as-is)
│   ├── _redirects          # Routing rules (for SPA / hosting)
│   └── readya.svg          # Static logo/icon

├── src/                    # Main application source code :contentReference[oaicite:0]{index=0}
│
│   ├── main.tsx            # App entry point (React root rendering)
│   ├── App.tsx             # Root component
│   ├── index.css           # Global styles (Tailwind etc.)
│   ├── i18n.ts             # i18n configuration (translations setup)
│
│   ├── api/                # API configuration
│   │   └── config/url.ts   # Base API URL configuration
│
│   ├── assets/             # Images and static media files
│
│   ├── component/          # Reusable UI components (feature-based structure)
│   │
│   │   ├── ui/             # Generic reusable UI elements (buttons, inputs, modals)
│   │   ├── common/         # Shared components (language switcher, theme toggle)
│   │
│   │   ├── signin/         # Login-related components
│   │   ├── signup/         # Registration-related components
│   │   ├── forgetpassword/ # Password reset flow
│   │   ├── configpassword/ # Password configuration/reset confirmation
│   │
│   │   ├── landing/        # Landing page sections (hero, features, etc.)
│   │   ├── pricing/        # Pricing UI components
│   │   ├── upload/         # File/text upload functionality
│   │   ├── footer/         # Footer component
│   │   ├── header/         # Header/navigation component
│   │
│   │   └── schemas/        # Zod validation schemas for forms
│
│   ├── pages/              # Route-level pages (mapped to routes)
│   │   ├── Home.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── ...             # Other pages (pricing, privacy, etc.)
│
│   ├── router.tsx          # App routing configuration
│   ├── routes/paths.ts     # Centralized route paths
│
│   ├── services/           # API calls and business logic
│   │   ├── api.ts          # Axios instance / base setup
│   │   ├── authService.ts  # Authentication requests
│   │   ├── payment.ts      # Payment-related APIs
│
│   ├── store/              # Global state management (Zustand)
│   │   ├── authStore.ts    # Authentication state
│   │   ├── useAppStore.ts  # General app state
│
│   ├── hook/               # Custom React hooks
│   │   ├── useGenerateAudio.ts  # Text-to-audio logic
│   │   ├── useSettings.ts       # Settings state handling
│
│   ├── data/               # Static data (FAQ, features, etc.)
│   ├── constants/          # App constants/configurations
│   ├── types/              # TypeScript types/interfaces
│   ├── utils/              # Helper functions
│   ├── lib/                # Shared utilities/helpers
│
│   ├── locales/            # Translations (i18n)
│   │   ├── en/             # English translations
│   │   └── ka/             # Georgian translations
│
│   └── layout/             # Layout components (e.g. MainLayout)
```
## Tech Stack

### Frontend

- React  
- React DOM  
- Vite  
- TypeScript  
- TailwindCSS  
- React Router DOM  
- TanStack React Query  
- React Hook Form  
- React Icons  
