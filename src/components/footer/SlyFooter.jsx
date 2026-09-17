import { ArrowUp } from "lucide-react";
export default function SlyFooter() {
  return (
    <footer className="site-footer shell">
      <span>© {new Date().getFullYear()} Gajendra Rajput</span>
      <span className="footer-note">Made with intention, in Pune.</span>
      <a href="#home">
        Back to top <ArrowUp size={15} />
      </a>
    </footer>
  );
}
