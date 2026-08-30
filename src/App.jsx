import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Footer,
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
import { TechFilterProvider } from "./context/TechFilterProvider";

const ParticleFieldCanvas = lazy(
  () => import("./components/canvas/ParticleField")
);
const JourneyGlobeCanvas = lazy(
  () => import("./components/canvas/JourneyGlobe")
);

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TechFilterProvider>
          <BrowserRouter>
            <div className="relative min-h-screen bg-paper text-ink">
              {/* Depth layers behind the whole page */}
              <Suspense fallback={null}>
                <ParticleFieldCanvas />
              </Suspense>
              <Suspense fallback={null}>
                <JourneyGlobeCanvas />
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
        </TechFilterProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
