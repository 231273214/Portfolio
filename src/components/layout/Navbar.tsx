import { NavLink } from "react-router";
import { useSound } from "../../hooks/useSound";

interface NavItem {
  to: string;
  label: string;
}

const links: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/lab", label: "Lab" },
  { to: "/work-with-me", label: "Work with me" },
];

export default function Navbar() {
  const { onHover, onClick } = useSound();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md shadow-lg">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onMouseEnter={onHover}
            onClick={onClick}
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/25 text-white shadow-inner"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}