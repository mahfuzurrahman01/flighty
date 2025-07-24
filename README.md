# Flighty: Flight Operations Dashboard

Flighty is a modern, real-time flight operations dashboard built with [Next.js](https://nextjs.org), React, and Tailwind CSS. It provides live flight tracking, airport and ATC management, real-time notifications, and alerting for airline operations teams.

## Features

- **Live Flight Tracking:**
  - Interactive map and table views for all flights
  - Real-time updates on flight status, position, and delays
  - Detailed flight information panel
- **Airport & ATC Management:**
  - Airport status overview and management
  - Air Traffic Control (ATC) operations interface
- **Flight Schedule Management:**
  - View and manage scheduled flights
- **Alerts & Notifications:**
  - Automated and manual alert generation (weather, delays, emergencies, etc.)
  - In-app toast notifications and notification dropdown
  - Critical alert acknowledgment and tracking
- **Statistics & Analytics:**
  - Dashboard with key stats (active flights, on-time performance, delays, critical alerts)
- **Modern UI:**
  - Responsive sidebar navigation
  - Clean, accessible, and mobile-friendly design

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Project Structure

- `app/` — Next.js app directory (pages, layouts, routes)
- `components/` — Reusable UI and dashboard components
- `contexts/` — React context providers for notifications and live flights
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets (icons, images)

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) components
- [Lucide Icons](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
