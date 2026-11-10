"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { business, navLinks } from "@/lib/config";

const trim = (p: string) => p.replace(/\/+$/, "") || "/";

export default function Header() {
  const here = trim(usePathname() || "/");
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <div className="wrap bar">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <b>{business.name}</b>
          <span>{business.tagline}</span>
        </Link>
        <nav className="nav" id="site-nav" aria-label="Main" data-open={open}>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={trim(l.href) === here ? "page" : undefined} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact/" className="btn btn-primary">Book a shoot</Link>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
