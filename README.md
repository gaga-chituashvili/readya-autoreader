📁 Project Structure

```
├── README.md                # Project documentation and setup instructions
├── eslint.config.js         # ESLint configuration (code quality rules)
├── index.html               # Main HTML entry file (Vite)
├── package-lock.json        # Locked versions of dependencies
├── package.json             # Project dependencies and npm scripts
├── postcss.config.js        # PostCSS configuration (used by Tailwind CSS)
├── public                   # Static public assets
│   └── vite.svg             # Default Vite asset
├── src                      # Main application source code
│   ├── App.css              # Styles for the root App component
│   ├── App.tsx              # Root React component
│   ├── assets               # Images and static assets
│   │   ├── Readyalogo.png
│   │   └── listenicon.png
│   ├── component            # Reusable UI components
│   │   ├── ListenSection.tsx # Audio listening section component
│   │   ├── footer
│   │   │   └── Footer.tsx   # Application footer
│   │   ├── header
│   │   │   └── Header.tsx   # Application header / navigation
│   │   └── upload           # Upload-related components
│   │       ├── Upload.tsx
│   │       ├── UploadButtons.tsx
│   │       ├── UploadHeader.tsx
│   │       ├── UploadInfo.tsx
│   │       └── UploadTextarea.tsx
│   ├── index.css            # Global styles
│   ├── layout
│   │   └── MainLayout.tsx   # Shared layout (Header + Footer)
│   ├── main.tsx             # Application entry point
│   ├── pages
│   │   └── Home.tsx         # Page-level component
│   ├── routes
│   │   ├── Routes.tsx       # React Router configuration
│   │   └── paths.ts         # Centralized route paths
│   └── services
│       └── api.ts           # Backend API service layer
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.app.json        # TypeScript config for the app
├── tsconfig.json            # Base TypeScript configuration
├── tsconfig.node.json       # TypeScript config for Node.js
└── vite.config.ts           # Vite configuration
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
