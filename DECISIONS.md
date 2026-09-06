# Design & E-Commerce Context Decisions: ArcSphere Studio → NEXTSHOPP

## 1. Architectural Overview & Context
This document logs every design and functional decision made while transforming the visual design of **ArcSphere Studio** (reference: `https://arcsphere-studio.framer.website/`) into the **NEXTSHOPP** e-commerce platform, maintaining 100% of e-commerce capabilities, state stores, and security constraints.

---

## 2. Design Token System & Foundations

### 2.1 Color Palette
- **Primary Background (`#f0ebe6`)**: Replaced standard cold white `#ffffff` with the signature ArcSphere warm architectural greige/sand. This provides the distinct tactile, editorial feeling of the reference site.
- **Secondary Background / Card Surfaces (`#e2dacf` & `#efede9`)**: Used for nested cards, filter panels, and elevated modules.
- **Obsidian Dark Surface (`#181818`)**: Deep charcoal used for primary CTAs, contrast cards, hero pill badges, and dark footer sections.
- **Typography Colors**:
  - Headings & Primary Text: `#181818` (high contrast, crisp readability).
  - Editorial Body Text: `#4f4742` (warm charcoal, matches reference body style).
  - Subtle / Metadata: `#7c7c7c`.
  - Light Text (on dark surfaces): `#f0ebe6` and `#ffffff`.
- **Borders & Dividers**:
  - `rgba(24, 24, 24, 0.1)` and `#cacac8` for razor-thin architectural dividers.

### 2.2 Typography Rhythm
- **Font Stack**:
  - Headings & Display: `Inter Display`, `General Sans`, sans-serif.
  - Body & UI Controls: `Inter`, `Switzer`, sans-serif.
- **Letter Spacing & Casing**:
  - Kicker badges: `text-xs uppercase tracking-[0.2em] font-semibold`.
  - Display titles: Tight kerning `-0.03em` for editorial gravitas.
  - Subheadings & category titles: `uppercase tracking-[0.06em]`.
  - Buttons & Links: `uppercase tracking-[0.1em] text-xs font-semibold`.

### 2.3 Spacing & Geometry
- **Grid System**: 4pt base grid with `48px` outer margins on desktop, reducing smoothly to `20px` on mobile.
- **Border Radius Hierarchy**:
  - Buttons & Pills: `rounded-full` (`9999px`) — ArcSphere signature.
  - Large Visual Cards: `rounded-[24px]` and `rounded-[20px]`.
  - Badges & Micro-tags: `rounded-full`.

---

## 3. Section-by-Section Adaptation Matrix

| Reference Site Section (ArcSphere) | Adapted NEXTSHOPP E-Commerce Section | Functional & Content Integration |
| :--- | :--- | :--- |
| **Sticky Header & Fullscreen Drawer** | **Store Shell Header & Fullscreen ArcSphere Menu** | Sticky glassmorphic greige nav with left logo, cart counter, wishlist counter, auth trigger, and 2-line hamburger opening the full-screen architectural drawer. Retains admin portal switcher. |
| **Hero Section ("Where Architecture Meets Experience")** | **Homepage Hero ("Where Modern Aesthetics Meet Curated Living")** | High-fidelity editorial hero with live store metrics, pill badge ("NEW SEASON 2026"), dual pill buttons ("Explore Catalog" & "Trending Now"), and real featured product backdrop. |
| **Philosophy / Story ("Designing Timeless Spaces")** | **Brand Standards & Craftsmanship USP** | Editorial 2-column layout showcasing store curation criteria, material standards, and warranty commitments. |
| **Stats Marquee Ribbon** | **Live Store Trust & Verified Metrics Ribbon** | Continuous marquee displaying real store value props: *100% Authentic Originals • Express Delivery • 24/7 Concierge Support • 10,000+ Satisfied Patrons*. |
| **Featured Projects Grid** | **Curated Spotlight Products (PLP Showcase)** | Product cards styled in ArcSphere architectural cards: tags, price in ₹, rating badge, dynamic hover zoom, quick "Add to Cart" and "Buy Now" triggers (enforcing mandatory login gates). |
| **Services Accordion / List (01, 02, 03...)** | **Shop by Department / Category Matrix** | Numbered list (01 Electronics, 02 Apparel, 03 Footwear, 04 Home & Living) with image peek on hover and count of active items. |
| **Residential & Commercial Expertise (2-Col Cards)** | **Curated Collection Spotlights (50/50 Cards)** | High-contrast visual banners linking to filtered collections (Audio & Gadgets vs. Minimalist Lifestyle). |
| **Design Process (4-Step Grid: 01 Discovery... )** | **Customer Experience Journey (4-Step Grid)** | `01 Discovery & Curation` → `02 Rigorous Quality Check` → `03 Seamless Payment` → `04 White-Glove Dispatch`. |
| **Testimonial Block** | **Verified Patron Reviews** | Editorial quote layout featuring genuine verified buyer reviews with star ratings and product tags. |
| **Contact Inquiry Form** | **VIP Club Newsletter & Exclusive Drops Form** | Underline input fields, privacy disclaimer, and pill subscription button. |
| **Editorial Footer with Scrolling ArcSphere Watermark** | **NEXTSHOPP Architectural Footer with Marquee Brand Watermark** | Multi-column links (Shop, Customer Care, Policies, Socials, Admin Portal link), copyright, and continuous scrolling oversized `NEXTSHOPP` background watermark. |
| **Studio Philosophy & Team Bio Page** | **About Studio Page (`/about`)** | Replaced legacy purple gradients with warm greige `#f0ebe6`, spatial study canvas, 4 foundational tenets, chronological milestones, and founder profiles (Shivam Indore & Abhay Dwivedi). |
| **Direct Contact & Specifier Form** | **Patron Care & Concierge Page (`/contact`)** | 3 architectural contact trays (Direct Telephony, Written Dispatch, Atelier Headquarters), correspondence protocol with category pills, and numbered FAQ accordion. |

---

## 4. E-Commerce Functional Integrity & Rule Compliance

1. **Mandatory Login Gate Rule**:
   - As enforced across the application: Clicking **Add to Cart**, **Buy Now**, or the **Wishlist/Like** button immediately prompts the user to authenticate if not logged in (`useAuth().user == null`), redirecting seamlessly with toast feedback.
2. **Dual Portal Isolation**:
   - Customer Portal (`/`, `/products`, `/cart`, `/checkout`, `/account`, `/orders`) adheres to the warm ArcSphere aesthetic.
   - Admin Portal (`/admin`, `/admin/products`, `/admin/orders`, `/admin/analytics`) retains its dedicated productivity controls while inheriting consistent typography and clean tonal styling.
3. **No Placeholders or Lorem Ipsum**:
   - All product names, pricing in INR (₹), categories, and descriptions are derived from the live product catalog in `lib/data/products.ts` or Firebase Firestore.
4. **State Management**:
   - `CartContext`, `AuthContext`, and `OrderContext` remain fully operational.

---

## 5. Responsive Behavior & Breakpoints
- **Desktop (1440px+)**: Expansive padding, 12-column layouts, 50/50 splits, hover interaction micro-animations (`↗` rotation, image zoom).
- **Tablet (768px)**: Adaptive 2-column grids, collapsible category rows, drawer navigation.
- **Mobile (375px)**: Single column cards, full-width pill action buttons, full-screen touch-optimized menu drawer with large typography, comfortable touch targets (min 44px).
