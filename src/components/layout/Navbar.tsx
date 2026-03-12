"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import { useScrollPosition, useOutsideClick } from "@/hooks";
import { NAV_LINKS } from "@/constants/navigation";

export default function Navbar() {
  const { isScrolled } = useScrollPosition({ threshold: 20 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Hook pour fermer le menu au clic extérieur
  const menuRef = useOutsideClick<HTMLDivElement>(
    () => setIsMobileMenuOpen(false),
    isMobileMenuOpen
  );

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle anchor navigation with scroll
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const anchor = href.replace("/", "");
      
      // If not on home page, navigate to home first
      if (pathname !== "/") {
        router.push(href);
        return;
      }

      // Smooth scroll to anchor
      const element = document.querySelector(anchor);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      
      // Close mobile menu if open
      setIsMobileMenuOpen(false);
    }
  };

  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) {
      return false;
    }
    return pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col"
            >
              <span className="text-xl font-bold text-foreground tracking-tight">
                Intelligence Africaine
              </span>
              <span className="text-sm text-[#C9A227] -mt-1">
                du Sahel
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-[#C9A227] focus:outline-none focus-visible:text-[#C9A227]",
                  isActive(link.href)
                    ? "text-[#C9A227]"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A227]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 px-5 focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-background"
              asChild
            >
              <Link href="/services">Voir l&apos;offre</Link>
            </Button>
            <Button
              className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-5 focus:ring-2 focus:ring-[#1A7A8A] focus:ring-offset-2 focus:ring-offset-background"
              asChild
            >
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-[#C9A227] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-lg"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleAnchorClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block py-2 text-lg font-medium transition-colors focus:outline-none focus-visible:text-[#C9A227]",
                      isActive(link.href)
                        ? "text-[#C9A227]"
                        : "text-muted-foreground hover:text-[#C9A227]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 flex flex-col gap-3"
              >
                <Button
                  variant="outline"
                  className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 w-full"
                  asChild
                >
                  <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>
                    Voir l&apos;offre
                  </Link>
                </Button>
                <Button
                  className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white w-full"
                  asChild
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Demander un devis
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
