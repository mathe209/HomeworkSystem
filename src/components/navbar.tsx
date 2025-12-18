import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="max-w-6xl mx-auto pt-1 flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.jpg" alt="logo" className="w-16 h-12 mx-auto" loading="lazy"/>
        </Link>
        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/mentorship" className="hover:text-gray-400">Mentorship</Link></li>
          <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
          <li><Link to="/event" className="hover:text-gray-400">Events</Link></li>
          <li><Link to="/encldx" className="hover:text-gray-400 text-red-500">encldx</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2" onClick={() => setOpen(!open)}>
          <span className="text-sm uppercase tracking-wide">Menu</span>
          {open ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden bg-black px-4 pb-4 space-y-2">
          <li><Link to="/" className="block hover:text-gray-400">Home</Link></li>
          <li><Link to="/mentorship" className="block hover:text-gray-400">Mentorship</Link></li>
          <li><Link to="/about" className="block hover:text-gray-400">About</Link></li>
          <li><Link to="/event" className="block hover:text-gray-400">Events</Link></li>
          <li><Link to="/encldx" className="block hover:text-gray-400">encldx</Link></li>
        </ul>
      )}
    </nav>
  );
}