<div align="center">

# 🛍️ NEXTSHOPP

### Next-Generation E-Commerce Platform

🌐 **Live Demo:** https://nextshopp-azure.vercel.app/

> Built solo by **Shivam Indore**
> GitHub: https://github.com/indoreshivam2006
> Portfolio: https://shivamindoreportfolio.vercel.app

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

<p align="center">
  <strong>A blazing-fast, modern e-commerce platform built with cutting-edge technologies for the 2025 retail landscape.</strong>
</p>

[Live Demo](https://nextshopp-azure.vercel.app/) · [Report Bug](../../issues) · [Request Feature](../../issues)

---

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----------------------------------------------------" style="width: 100%; height: auto;">

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Performance](#-performance)
- [Built By](#-built-by)
- [License](#-license)

---

## 🎯 Overview

**NEXTSHOPP** is a production-ready, full-stack e-commerce solution designed for scalability, performance, and exceptional user experience. Built with Next.js 15 and React 19, it leverages the latest web technologies including Server Components, Streaming SSR, and the App Router for optimal performance.

### Why NEXTSHOPP?

| Challenge | Our Solution |
|-----------|--------------|
| Slow page loads | Server Components + Streaming SSR |
| Poor mobile UX | Mobile-first responsive design |
| Complex state management | React Context + Local persistence |
| Limited animations | GSAP + Framer Motion integration |
| Authentication complexity | Firebase Auth with Google OAuth |

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛒 Shopping Experience
- **Smart Product Catalog** with advanced filtering & sorting
- **Real-time Cart Management** with persistent storage
- **Wishlist Functionality** for saved items
- **Product Image Galleries** with zoom capabilities
- **Related Products** recommendation engine

</td>
<td width="50%">

### 🔐 Authentication & Security
- **Firebase Authentication** integration
- **Google OAuth** single sign-on
- **Email/Password** authentication
- **Protected Routes** with auth guards
- **Session Management** with auto-refresh

</td>
</tr>
<tr>
<td width="50%">

### 💳 Checkout & Orders
- **Multi-step Checkout** flow
- **Multiple Payment Methods** support
- **Order History** tracking
- **Real-time Order Status** updates
- **Address Management** system

</td>
<td width="50%">

### 🎨 UI/UX Excellence
- **60+ Custom UI Components** (shadcn/ui)
- **Smooth Page Transitions** with GSAP
- **Interactive Animations** with Framer Motion
- **Dark/Light Theme** support
- **Responsive Mobile Navigation**

</td>
</tr>
</table>

### Additional Features

- 📊 **Product Statistics Dashboard** with Recharts visualizations
- 🗺️ **Interactive Store Locator** with Google Maps API
- 📧 **Newsletter Subscription** system
- 🏷️ **Category-based Navigation** with smart filtering
- 📱 **PWA-ready** architecture
- ♿ **Accessibility-first** component design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![Next.js](https://img.shields.io/badge/-Next.js%2015-000?logo=next.js) | React Framework with App Router |
| ![React](https://img.shields.io/badge/-React%2019-61DAFB?logo=react&logoColor=black) | UI Library with Server Components |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | Type Safety & Developer Experience |
| ![Tailwind](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) | Utility-first Styling |

### UI Components & Animation
| Technology | Purpose |
|------------|---------|
| ![Radix](https://img.shields.io/badge/-Radix%20UI-161618?logo=radix-ui) | Accessible UI Primitives |
| ![shadcn/ui](https://img.shields.io/badge/-shadcn%2Fui-000?logo=shadcnui) | Pre-built Component Library |
| ![GSAP](https://img.shields.io/badge/-GSAP-88CE02?logo=greensock&logoColor=black) | Professional Animations |
| ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white) | Declarative Animations |

### Backend & Infrastructure
| Technology | Purpose |
|------------|---------|
| ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black) | Authentication & Database |
| ![Vercel](https://img.shields.io/badge/-Vercel-000?logo=vercel) | Edge Deployment |

### Form & Data Management
| Technology | Purpose |
|------------|---------|
| ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white) | Form State Management |
| ![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod&logoColor=white) | Schema Validation |
| ![Recharts](https://img.shields.io/badge/-Recharts-22B5BF) | Data Visualization |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEXTSHOPP Architecture                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   Next.js    │    │   React 19   │    │  TypeScript  │       │
│  │  App Router  │◄──►│   Server     │◄──►│    Types     │       │
│  │              │    │  Components  │    │              │       │
│  └──────┬───────┘    └──────────────┘    └──────────────┘       │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────┐        │
│  │                   Context Layer                      │        │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐  │        │
│  │  │  Auth   │  │  Cart   │  │Wishlist │  │ Theme  │  │        │
│  │  │ Context │  │ Context │  │ Context │  │Context │  │        │
│  │  └─────────┘  └─────────┘  └─────────┘  └────────┘  │        │
│  └─────────────────────────────────────────────────────┘        │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────┐        │
│  │                  Firebase Services                   │        │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │        │
│  │  │    Auth     │  │  Firestore  │  │   Storage   │  │        │
│  │  │   Service   │  │  Database   │  │   (CDN)     │  │        │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │        │
│  └─────────────────────────────────────────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager
- **Firebase** account (for authentication & database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/indoreshivam2006/NEXTSHOPP.git
   cd NEXTSHOPP
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google Maps (Optional)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📁 Project Structure

```
nextshopp/
├── 📂 app/                    # Next.js App Router
│   ├── 📂 about/              # About page
│   ├── 📂 auth/               # Authentication pages
│   ├── 📂 cart/               # Shopping cart
│   ├── 📂 categories/         # Product categories
│   ├── 📂 checkout/           # Checkout flow
│   ├── 📂 contact/            # Contact page
│   ├── 📂 orders/             # Order history
│   ├── 📂 products/           # Product pages
│   ├── 📂 profile/            # User profile
│   ├── 📂 wishlist/           # Wishlist page
│   ├── 📄 layout.tsx          # Root layout
│   ├── 📄 page.tsx            # Homepage
│   └── 📄 globals.css         # Global styles
│
├── 📂 components/             # React Components
│   ├── 📂 ui/                 # 60+ shadcn/ui components
│   ├── 📄 header.tsx          # Site header
│   ├── 📄 footer.tsx          # Site footer
│   ├── 📄 hero.tsx            # Hero section
│   ├── 📄 product-card.tsx    # Product card
│   ├── 📄 product-grid.tsx    # Product grid
│   └── ...                    # Other components
│
├── 📂 context/                # React Context Providers
│   ├── 📄 auth-context.tsx    # Authentication state
│   ├── 📄 cart-context.tsx    # Cart management
│   └── 📄 wishlist-context.tsx# Wishlist management
│
├── 📂 hooks/                  # Custom React Hooks
│   ├── 📄 use-mobile.tsx      # Mobile detection
│   ├── 📄 use-toast.ts        # Toast notifications
│   └── 📄 useSmoothScroll.ts  # Smooth scrolling
│
├── 📂 lib/                    # Utilities & Services
│   ├── 📂 firebase/           # Firebase configuration
│   ├── 📄 utils.ts            # Utility functions
│   └── 📄 animations.ts       # Animation helpers
│
├── 📂 public/                 # Static assets
│   └── 📄 *.avif              # Optimized images
│
├── 📄 tailwind.config.ts      # Tailwind configuration
├── 📄 next.config.mjs         # Next.js configuration
├── 📄 components.json         # shadcn/ui configuration
└── 📄 package.json            # Dependencies
```

---

## 📸 Screenshots

<div align="center">

### Homepage
*Modern hero section with animated elements and featured products*

### Product Catalog
*Advanced filtering, sorting, and responsive grid layout*

### Shopping Cart
*Real-time cart management with quantity controls*

### Checkout Flow
*Streamlined multi-step checkout process*

</div>

---

## ⚡ Performance

NEXTSHOPP is optimized for exceptional performance:

| Metric | Score |
|--------|-------|
| **First Contentful Paint** | < 1.2s |
| **Largest Contentful Paint** | < 2.5s |
| **Time to Interactive** | < 3.5s |
| **Cumulative Layout Shift** | < 0.1 |

### Optimization Techniques

- ✅ **Server Components** - Reduced client-side JavaScript
- ✅ **Image Optimization** - AVIF format with lazy loading
- ✅ **Code Splitting** - Automatic route-based splitting
- ✅ **Edge Caching** - Vercel Edge Network integration
- ✅ **Font Optimization** - Next.js font optimization

---

## 👨‍💻 Built By

**Shivam Indore** — Solo Developer
- GitHub: https://github.com/indoreshivam2006
- Portfolio: https://shivamindoreportfolio.vercel.app
- Live: https://nextshopp-azure.vercel.app/

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### Built with ❤️ by **Shivam Indore** using Next.js 15 & React 19

[![Stars](https://img.shields.io/github/stars/indoreshivam2006/NEXTSHOPP?style=social)](../../stargazers)
[![Forks](https://img.shields.io/github/forks/indoreshivam2006/NEXTSHOPP?style=social)](../../network/members)

**[⬆ Back to Top](#-nextshopp)**

</div>