"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        "fixed top-0 z-50 w-full",
        open
          ? "bg-background"
          : cn(
              "transition-all duration-300",
              scrolled
                ? "border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl"
                : "bg-transparent"
            )
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 text-lg font-bold tracking-tight transition-colors hover:text-primary"
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

        {/* Mobile Actions */}
        <div className="relative z-50 flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-16 z-40 bg-background md:hidden"
          >
            <nav className="flex h-full flex-col justify-between px-8 pb-12 pt-8">
              {/* Links */}
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-4 text-xl font-semibold tracking-tight transition-colors",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground/70"
                      )}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                    {i < navItems.length - 1 && (
                      <div className="mx-3 border-b border-border/30" />
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="space-y-6"
              >
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
                <div className="flex justify-center">
                  <SocialLinks iconSize={20} />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
