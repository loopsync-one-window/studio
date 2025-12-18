# Studio 3.0

Studio 3.0 is a comprehensive creative suite built with **Next.js**, designed to provide a unified platform for video editing, image manipulation, and digital content creation. It features a modern, "Canva-like" interface that centralizes various creative tools into a single, seamless workspace.

## 🚀 Features

### 🎨 Creative Dashboard
A centralized hub for all your creative projects, featuring:
- **Quick Actions:** Instant access to Docs, Whiteboards, Video editing, and Social media tools.
- **Universal Search:** Quickly find templates, projects, and assets.
- **Project History:** Easy access to your recent "My Creations" with type-based filtering.
- **Asset Management:** "My Uploads" section for managing images and videos directly from the dashboard.

### 🎬 Motion Labs (Video Editor)
A powerful, browser-based video editing suite featuring:
- **Professional Timeline:** Multi-track editing capabilities.
- **Audio Library:** Integrated library with genres like Cinematic, Ambient, Upbeat, and Lo-Fi.
- **Trending Music:** Integration with trending music albums for creative inspiration.

### 🖼️ Pixel Labs (AI Image Suite)
Advanced image manipulation tools powered by AI and modern shaders:
- **Image Upscale:** Enhance image quality up to 4K resolution.
- **Object Removal:** Clean up unwanted items seamlessly.
- **Portrait Gen:** Create realistic headshots.
- **Video Dubbing:** AI-powered translation and lip-syncing services.

## 💻 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Primitives:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visual Effects:** `@paper-design/shaders-react` (Dithering, specialized shaders)
- **Carousel:** `embla-carousel-react`

## 📦 Getting Started

### Prerequisites
- Node.js 18+ (Recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/studio.git
    cd studio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
studio/
├── app/
│   ├── home/           # Main Dashboard (Canva-like interface)
│   ├── motion-labs/    # Video Editor Module
│   ├── pixel-labs/     # AI Image & Face Swap Module
│   ├── search/         # Global Search Functionality
│   └── layout.tsx      # Root application layout
├── components/         # Reusable UI Components
│   └── ui/             # Design System Components (Buttons, Sidebar, etc.)
├── hooks/              # Custom React Hooks
├── lib/                # Utilities and Helper functions
└── public/             # Static Assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
© 2025 Intellaris Private Limited. All rights reserved.
