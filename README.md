# Liposoma - Scroll Canvas Animation

A React + Vite + TypeScript template featuring animated canvas rendering synchronized with scroll progress using Framer Motion.

## Project Structure

```
liposoma/
├── src/
│   ├── main.tsx        # React entry point
│   └── App.tsx         # Main component with scroll animation
├── public/
│   └── images/         # Add your .webp images here (1-86)
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build configuration
└── README.md           # This file
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Add your images to the `public/images/` folder:
   - Name them as: `1.webp`, `2.webp`, ... `86.webp`
   - Images should be 1000x1000px for optimal display

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## How It Works

The component creates a sequence animation that:
- Tracks scroll progress using Framer Motion
- Maps scroll position (0-1) to image sequence (1-86)
- Renders images to canvas as user scrolls
- Takes ~6000px of vertical scroll to complete the sequence
