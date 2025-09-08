# MannMitra - Digital Psychological Support for J&K Students

A culturally sensitive mental health support platform designed specifically for students in Jammu & Kashmir, featuring chatbot support, counseling services, and wellness activities in local languages.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Modern UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── features/       # Feature-specific components
│   ├── layout/         # Layout components
│   └── ui/            # Base UI components
├── contexts/           # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── types/             # TypeScript type definitions
```

## Deployment

This project can be deployed to any static hosting service such as:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

To build for production:

```sh
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
