import { useState } from "react";
import { Link } from "react-router-dom";

import { site } from "../constants/site";
import { useScrollThreshold, useBodyScrollLock } from "../hooks";
import { padIndex } from "../utils/format";
import ThemeToggle from "./ThemeToggle";

const LogoMark = () => (
  <span className="flex items-baseline gap-2">
    <span className="font-display text-[22px] leading-none tracking-tight text-ink">
      {site.name}
    </span>
    <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
  </span>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollThreshold(24);
  useBodyScrollLock(menuOpen);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-editorial ${
          scrolled
            ? "glass-panel border-x-0 border-t-0 py-4"
            : "border-b border-transparent py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <LogoMark />
          </Link>

          <ul className="hidden list-none items-center gap-9 md:flex">
            {site.navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="link-underline text-[14px] font-normal text-grey transition-colors duration-300 hover:text-ink"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-7 md:flex">
            <a
              href={site.phoneHref}
              className="link-underline text-[13px] font-normal tracking-wide text-grey transition-colors duration-300 hover:text-ink"
            >
              {site.phone}
            </a>
            <ThemeToggle />
            <a href="#contact" className="site-btn text-[13px]">
              Let&apos;s talk
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-500 ease-editorial ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-500 ease-editorial ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-30 flex flex-col bg-paper px-6 pb-12 pt-28 md:hidden">
          <ul className="flex list-none flex-col">
            {site.mobileNavLinks.map((link, index) => (
              <li key={link.id} className="hairline">
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="index-num">{padIndex(index)}</span>
                  <span className="display-md">{link.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-2">
            <span className="meta-label">Direct</span>
            <a href={site.phoneHref} className="text-[15px] font-normal text-ink">
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
