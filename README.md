# 3D Developer Portfolio

Welcome to the repository for my personal 3D portfolio, a fully interactive and animated website designed to showcase my skills and projects as a Data Analyst and Engineer. This portfolio is built with modern web technologies, focusing on a rich user experience with 3D graphics and fluid animations.

![Portfolio Screenshot](public/images/readme.png)
*(Note: This is a placeholder for a GIF or a better screenshot)*

## ✨ Key Features

*   **Interactive 3D Hero Section:** A stunning hero section featuring a 3D model of an office room, created with `@react-three/fiber`.
*   **GSAP Animations:** Smooth, performant animations throughout the site, powered by GSAP (GreenSock Animation Platform).
*   **3D Project Carousel:** An interactive 3D carousel in the "All Projects" section to browse through projects in a unique way.
*   **Detailed Project Showcase:** A dedicated section to highlight key projects with descriptions, tech stacks, and live links.
*   **Animated Experience Timeline:** A visually engaging timeline to present my professional work experience.
*   **3D Tech Stack Showcase:** My skills are represented by animated 3D models of technology logos.
*   **Responsive Design:** The entire portfolio is fully responsive and optimized for a seamless experience on all devices, from mobile phones to desktops.
*   **Loading Screen:** A custom loading screen with a bar chart animation that shows while 3D models are being loaded.

## 🛠️ Tech Stack

This project is built with a modern, high-performance tech stack:

*   **Frontend:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
*   **3D Graphics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
*   **Animation:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Email Service:** [@emailjs/browser](https://www.emailjs.com/) for the contact form.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    *   Create a `.env` file in the root of the project.
    *   Add your EmailJS credentials:
        ```
        VITE_APP_EMAILJS_SERVICE_ID=your_service_id
        VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
        VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
/
├── public/
│   ├── images/       # All static image assets
│   └── models/       # All 3D model files (.glb)
├── src/
│   ├── components/   # Reusable components (Button, Footer, 3D models, etc.)
│   ├── constants/    # Static data (project details, nav links, etc.)
│   ├── sections/     # Main page sections (Hero, Showcase, Contact, etc.)
│   ├── App.jsx       # Main application component with routing
│   ├── main.jsx      # Entry point of the application
│   └── index.css     # Global styles and Tailwind CSS configuration
├── .gitignore
├── package.json
└── README.md
```