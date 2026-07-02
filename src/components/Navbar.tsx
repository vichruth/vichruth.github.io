import * as React from "react";
import { Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useLenis } from "../lib/SmoothScroll";

export default function Navbar() {
  const [activeSection, setActiveSection] = React.useState("home");
  const lenis = useLenis();

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "specs", "simulator", "education"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80; // height of navbar

    if (lenis) {
      lenis.scrollTo(element, { offset: -offset });
      return;
    }

    // Fallback (reduced motion / Lenis inactive)
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          aria-label="Back to top"
          className="flex cursor-pointer items-center space-x-2 text-zinc-100 hover:text-white transition-colors"
          id="nav-brand"
        >
          <Cpu className="h-4 w-4 text-emerald-500 animate-pulse" />
          <span className="font-sans font-semibold tracking-tight text-sm">Vichruth M.</span>
          <span className="hidden sm:inline-block h-3 w-px bg-zinc-800" />
          <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-500 tracking-wider font-semibold">EDGE.AI</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-xs font-medium text-zinc-400">
          {[
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Projects" },
            { id: "specs", label: "Tech Specs" },
            { id: "simulator", label: "Edge Simulator" },
            { id: "education", label: "Education" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer transition-colors hover:text-zinc-100 ${
                activeSection === item.id ? "text-emerald-400 font-semibold" : ""
              }`}
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Social Icons & Hire Button */}
        <div className="flex items-center space-x-4">
          <a
            href="https://linkedin.com/in/vichruthm9099"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
            aria-label="LinkedIn"
            id="nav-social-linkedin"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/vichruth"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
            aria-label="GitHub"
            id="nav-social-github"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          
          <button
            onClick={() => scrollToSection("contact")}
            className="rounded-full bg-zinc-100 px-3.5 py-1.5 font-sans text-xs font-semibold text-zinc-950 transition-all hover:bg-emerald-400 hover:text-zinc-950 hover:shadow-lg hover:shadow-emerald-950/20 active:scale-95"
            id="nav-btn-hire"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
