# Gesit Companies Web Application

Modern web application for **Gesit Companies** built with Next.js 15, Supabase, and Cloudinary. This platform features a high-performance news management system, secure admin portal, and professional landing pages.

## 🚀 Teck Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Native 2FA)
- **Media Hosting**: [Cloudinary](https://cloudinary.com/) (Optimized Images & Videos)
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Email**: [Resend](https://resend.com/) (Contact form notifications)

## ✨ Core Features

### 🏢 Professional Admin Portal
- **Secure Authentication**: 2FA enabled using native Supabase OTP.
- **Maintenance Mode**: Toggle the public site visibility with a single switch.
- **Account Security**: Password management and access control.

### 📰 Advanced News Management
- **Rich-Text Editor**: Custom editor with support for inline images and videos.
- **Media-First Design**: Dedicated "Feature Video" banner field (YouTube, Vimeo, or raw MP4).
- **High Performance**: Binary stream uploads to Cloudinary with real-time progress tracking.
- **Responsive Layouts**: Desktop and mobile optimized article pages.

### 📧 Communication
- **Contact Us**: Dual-delivery system (Database storage + Real-time email via Resend).
- **Inbox Management**: Professional data table with search and animated detail modals.

## 🛠️ Setup & Local Development

### 1. Prerequisites
- Node.js 18+
- Supabase Project (Database + Auth)
- Cloudinary Account (Standard credentials)
- Resend Account (API Key)

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=dmr8bxdos
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Resend
RESEND_API_KEY=your-resend-key
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

## 📦 Deployment

The app is optimized for deployment on **Vercel** or any Node.js environment.

1. Ensure all environment variables are mapped in your production dashboard.
2. Ensure the Supabase project has the correct RLS policies (see `documentation/security`).
3. Set the `maxDuration` to 60s in `next.config.mjs` for video processing.

---
Built with ❤️ for Gesit Companies.
