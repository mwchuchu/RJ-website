# 🏢 RJ's Larom Residences — Branded Luxury Living in Islamabad

> **Pakistan's First Branded Residences Where Islamabad Expressway Meets Luxury Living.**

A state-of-the-art web platform engineered for **RJ's Larom Residences**, showcasing luxury serviced apartments, hotel suites, world-class amenities, flexible payment plans, and high-yield real estate investment opportunities in Islamabad, Pakistan.

---

## 🌟 Key Features

- 🏙️ **Serviced Apartments Showcase**: Dynamic catalog featuring studio, 1-bed, 2-bed, and penthouse residences with live filtering (price range, rooms, location).
- 🏨 **Larom Hotel & Residences Experience**: Dedicated showcase for 5-star hotel luxury, executive suites, fine dining, spa, and hospitality services.
- 🗂️ **Interactive 6-Tab Property Drawer**: Deep-dive details for every residence with 6 comprehensive view tabs:
  1. *Overview*
  2. *Exterior Gallery*
  3. *Interior Gallery*
  4. *Floor & Layout Specs*
  5. *Location & Landmark Proximity*
  6. *Included Amenities*
- 💰 **Transparent Payment Plans**: Clear financial structures including down payment percentages, monthly & quarterly installments, possession timelines, and investment schedules.
- 📈 **Why Invest Portal**: In-depth investment rationale, capital growth projections, high-yield rental returns, and strategic location advantages along the Islamabad Expressway.
- 🏊 **Luxury Amenities Explorer**: Showcases world-class facilities including infinity pool, executive lounge, health club & spa, rooftop dining, smart security, and 24/7 concierge.
- 📝 **Book Now & Inquiry System**: Online booking interface and inquiry form for prospective buyers and investors.
- 💬 **Sticky WhatsApp Support Widget**: One-click direct communication widget  for instant sales and inquiry support.
- 🎨 **Modern Dark Glassmorphism UX**: Premium dark-themed design system, smooth tab transitions, micro-animations, and responsive layout across desktop and mobile devices.

---

## 🛠️ Technology Stack

| Technology | Role |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Frontend UI Library |
| **[TypeScript 5](https://www.typescriptlang.org/)** | Type Safety & Data Models |
| **[Vite 8](https://vite.dev/)** | Dev Server & Build Tool |
| **Vanilla CSS** | Custom Dark Glassmorphism Design System & Responsive Layouts |
| **[Oxlint](https://oxc.rs/)** | Code Linting |
| **Google Fonts** | `Outfit` & `Inter` Modern Typography |

---

## 📁 Project Structure

```
RJwebsite/
├── public/                # Static assets, logos & favicon
├── src/
│   ├── assets/            # Visual assets, banners & images
│   ├── components/
│   │   ├── common/        # Shared UI components
│   │   ├── home/          # Home page sections & hero elements
│   │   ├── pages/         # Page views
│   │   │   ├── AmenitiesPage.tsx
│   │   │   ├── BookNowPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LaromHotelPage.tsx
│   │   │   ├── PaymentPlanPage.tsx
│   │   │   ├── ServicedApartmentsPage.tsx
│   │   │   └── WhyToInvestPage.tsx
│   │   ├── Footer.tsx             # Site-wide footer with links & contact info
│   │   ├── Hero.tsx               # Hero header component
│   │   ├── Navbar.tsx             # Responsive top navigation header
│   │   ├── PropertyModal.tsx      # 6-tab modal drawer for property details
│   │   └── WhatsAppWidget.tsx     # Floating WhatsApp contact button
│   ├── data/
│   │   ├── catalogueAssets.ts     # Catalogue assets mapping
│   │   ├── floorplanAssets.ts     # Floorplan blueprints & layout specs
│   │   └── mockData.ts            # Project data models (properties, amenities, ROI)
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces (Property, Amenity, etc.)
│   ├── App.css                    # Main layout & component styling
│   ├── App.tsx                    # Root component & main tab router state
│   ├── index.css                  # Global design tokens, resets & theme rules
│   └── main.tsx                   # Application entry point
├── index.html             # HTML entry point with metadata & font imports
├── package.json           # Dependencies & build scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite bundler configuration
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system.

### Installation

1. Clone or open the repository directory:
   ```bash
   cd d:/RJwebsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## ⚙️ Development & Build Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript code (`tsc -b`) and generates production bundle via Vite. |
| `npm run preview` | Locally previews the compiled production build. |
| `npm run lint` | Runs `oxlint` to analyze codebase for code quality and errors. |

### Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser to view the application.

---

## 📄 License
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.


