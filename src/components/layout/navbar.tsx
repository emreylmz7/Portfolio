"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Download, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/constants";
import { siteConfig } from "@/data/site-config";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SocialLinks } from "@/components/shared/social-links";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight transition-colors hover:text-primary"
        >
          {siteConfig.name.split(" ")[1]}
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href={siteConfig.resumeUrl}
            download
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Download className="mr-2 h-4 w-4" />
            CV
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {/* Mobile Menu - compact dropdown */}
      <div
        className={cn(
          "overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 border-b-0 opacity-0"
        )}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium text-center transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-3">
            <SocialLinks iconSize={16} />
            <a
              href={siteConfig.resumeUrl}
              download
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              CV
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
