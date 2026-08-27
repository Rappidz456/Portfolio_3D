import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  ScrollProgress,
  Services,
  TechMarquee,
  Toaster,
  Works,
} from "./components";
import { ThemeProvider } from "./context/ThemeProvider";
import { ToastProvider } from "./context/ToastProvider";

const ParticleFieldCanvas = lazy(
  () => import("./components/canvas/ParticleField")
);

const YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="mx-auto w-full max-w-[96rem] px-6 pb-10 sm:px-10 lg:px-16">
    <div className="flex flex-col gap-4 border-t border-[color:var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] font-light text-grey">
        © {YEAR} Muhammad Ali — Full Stack Software Engineer
      </p>
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="link-underline text-[13px] font-light text-grey"
      >
        Back to top
      </a>
    </div>
  </footer>
);

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="relative min-h-screen bg-paper text-ink">
            {/* Depth layer behind the whole page */}
            <Suspense fallback={null}>
              <ParticleFieldCanvas />
            </Suspense>

            <div className="relative z-10">
              <ScrollProgress />
              <Navbar />
              <main>
                <Hero />
                <About />
                <Works />
                <Services />
                <TechMarquee />
                <Experience />
                <Feedbacks />
                <Contact />
              </main>
              <Footer />
            </div>
            <Toaster />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
