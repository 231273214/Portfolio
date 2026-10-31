import { Link, NavLink } from "react-router";
import { useSound } from "../../hooks/useSound";
import SoundToggle from "../audio/SoundToggle";
import ThemeToggle from "../ui/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/lab", label: "Lab" },
  { to: "/work-with-me", label: "Work with me", cta: true },
];

function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="3" width="20" height="18" rx="4" fill="white" />
      <path
        d="M6 16V8l6 5 6-5v8"
        fill="none"
        stroke="#703587"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { onHover, onClick } = useSound();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 pt-4 md:px-10">
      {/* Marca: Sergio -> rangel al hacer hover */}
      <Link
        to="/"
        onMouseEnter={onHover}
        onClick={onClick}
        className="group pointer-events-auto relative h-6 justify-self-start overflow-hidden leading-6"
      >
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          Sergio
        </span>
        <span className="absolute inset-x-0 top-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          rangel
        </span>
      </Link>

      {/* Nav glass */}
      <nav className="glass pointer-events-auto flex items-center gap-2 rounded-2xl px-3 py-2">
        {links.map(({ to, label, cta }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onMouseEnter={onHover}
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition ${
                isActive || cta ? "relief" : "hover:bg-white/10"
              }`
            }
          >
            {cta && <MailIcon />}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Controles */}
      <div className="pointer-events-auto flex items-center gap-1 justify-self-end">
        <SoundToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}