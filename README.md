# 🏢 Gesit Companies Corporate Web Application

A premium, high-performance corporate web application for **Gesit Companies** engineered with **Next.js 16 (App Router)**, **Supabase**, **Cloudinary**, and **Framer Motion**. Designed for editorial-grade visual excellence, lightning-fast loading speeds, and robust backend operations.

---

## 🚀 Modern Tech Stack

*   **Core Framework**: [Next.js 16+](https://nextjs.org/) (App Router, Turbopack, Server Actions)
*   **Database & Security**: [Supabase](https://supabase.com/) (PostgreSQL Database + Secure Native 2FA OTP Auth)
*   **Media Hosting**: [Cloudinary](https://cloudinary.com/) (Standardized, High-Compression Images & Streamed Videos)
*   **Styling & Components**: Vanilla CSS + Tailwind CSS + Radix UI / Shadcn UI
*   **Smooth Animations**: [Framer Motion](https://www.framer.com/motion/) + [Swiper.js](https://swiperjs.com/) (Editorial Sliders)
*   **Email Engine**: [Resend](https://resend.com/) (Dual-delivery real-time notification system)

---

## ✨ Premium Core Features

### 💎 Editorial-Grade Visuals & Responsive Design
*   **Immersive Hero Slider**: Seamlessly animated transitions with particle effects and smooth typography, achieving pixel-perfect parity with reference designs.
*   **Modern Business Showcase**: Curated responsive grid layouts for **Manufacturing**, **Natural Resources**, **Property**, and **Trading & Services** pages.
*   **Perfect Viewports**: Handcrafted breakpoint adjustments for desktop, laptop, tablet (split), and mobile screens.

### 🔐 Secure Admin Dashboard
*   **Multi-Factor Authentication**: Administrative portal guarded by native Supabase 2FA OTP codes.
*   **Global Maintenance Switch**: Easily toggle public visibility of the corporate site via a unified control panel.
*   **Real-time Inbox**: Direct, interactive portal to manage contact submissions with live search, filtering, and animation effects.

### 📰 Advanced News & Media CMS
*   **Rich-Media Editor**: Integrated wysiwyg editor supporting inline assets and dedicated **Feature Video** (raw MP4 or streamed).
*   **Binary Upload Streams**: Custom upload engine routing large files directly to Cloudinary with interactive percentage trackers.

---

## 📁 Optimized Project Architecture

Our repository has been optimized for **zero-waste storage**, untracking all temporary cache, databases, test logs, and raw HTML dumps.

```
gesit-nextjs/
├── public/                 # Static media assets (webp, svg, fonts)
│   ├── home/               # Homepage-specific images
│   ├── logos/              # Premium brand logos
│   └── wp-content/         # High-resolution optimized graphics
├── src/
│   ├── app/                # Next.js 16 App Router (Public and Dashboard)
│   │   ├── (public)/       # Guest-facing pages (Home, Business, CSR, etc.)
│   │   ├── admin/          # Admin login and auth
│   │   ├── api/            # API endpoints (Analytics, SEO, Uploads)
│   │   └── dashboard/      # Protected administration pages
│   ├── components/         # Reusable UI parts & slider components
│   └── lib/                # Database clients, Cloudinary utility engines
└── package.json            # Script definitions and package manifests
```

---

## 🛠️ Local Development & Setup

### 1. Prerequisites
*   Node.js 20+
*   Supabase project instance (DB + Authentication)
*   Cloudinary Cloud Account
*   Resend API access

### 2. Environment Setup
Configure your local environment variables by creating a `.env.local` file in the root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=dmr8bxdos
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Resend Email Integration
RESEND_API_KEY=your-resend-key
```

### 3. Installation & Run
Install project dependencies and start the Turbopack-powered local dev server:

```bash
# Install dependencies
npm install

# Run the project in development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production Builds & Deployment

The application is highly optimized to run on **Vercel** or any node-ready cloud hosting:

1.  **Statically Optimized**: Dynamic routing is automatically resolved during the build pipeline.
2.  **Environment Sync**: Ensure all environment keys in `.env.local` are identical in your hosting provider's dashboard.
3.  **High-Capacity Processing**: Set `maxDuration` to 60s in `next.config.mjs` to allow the Cloudinary backend pipeline plenty of time for processing heavy media.

---
Built with ❤️ for **Gesit Companies**. All rights reserved.
