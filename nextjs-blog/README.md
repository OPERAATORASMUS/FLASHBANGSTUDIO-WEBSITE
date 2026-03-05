# Flashbang Studio Website

A modern, bilingual (English/Estonian) website for Flashbang Studio, a production company specializing in visual content.

## Features

- **Bilingual Support**: English and Estonian translations
- **Responsive Design**: Mobile-first approach with smooth animations
- **Modern UI**: Clean, professional design with hover effects
- **Smooth Scrolling**: Custom smooth scroll implementation
- **Intersection Observer**: Animations triggered on scroll
- **Mobile Menu**: Hamburger menu for mobile devices

## Tech Stack

- **Next.js**: React framework for production
- **React**: Component-based UI library
- **CSS**: Custom styling with animations
- **Google Fonts**: Syncopate and Inter fonts

## Project Structure

```
nextjs-blog/
├── pages/
│   └── index.js          # Main page component
├── lib/
│   └── translations.js   # Translation data
├── public/
│   ├── favicon.ico
│   ├── rinnale.png       # Footer logo
│   ├── seljale.png       # Header logo
│   └── vercel.svg
├── styles/
│   ├── global.css        # Global styles and animations
│   └── Home.module.css   # Component-specific styles
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sections

- **Hero**: Eye-catching introduction with animated text
- **About**: Company description with split layout
- **Portfolio**: Grid of featured projects
- **Gallery**: Behind-the-scenes photos
- **Contact**: Contact form for inquiries
- **Footer**: Social links and copyright

## Customization

- **Colors**: CSS custom properties in `:root`
- **Fonts**: Google Fonts integration
- **Images**: Replace placeholder images in `/public/`
- **Content**: Update translations in `lib/translations.js`

## Deployment

This project can be deployed on Vercel, Netlify, or any platform supporting Next.js.

```bash
npm run build
npm start
```
