import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import SlyNav from "./components/navigation/SlyNav";
import SlyHero from "./components/hero/SlyHero";
import ScreeningRoom from "./components/notes/ScreeningRoom";
import AboutHuman from "./components/about/AboutHuman";
import ContactBridge from "./components/contact/ContactBridge";
import SlyFooter from "./components/footer/SlyFooter";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SlyNav />
        <main id="main" tabIndex={-1}>
          <SlyHero />
          <ScreeningRoom />
          <AboutHuman />
          <ContactBridge />
        </main>
        <SlyFooter />
      </MotionConfig>
    </ThemeProvider>
  );
}
