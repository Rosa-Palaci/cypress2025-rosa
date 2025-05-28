"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/movies", label: "Películas" },
  { href: "/form", label: "Formulario" },
  { href: "/interactions", label: "Interacciones" },
  { href: "/cualquier-cosa-inexistente", label: "404" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b px-4 py-2 flex items-center justify-between bg-white" data-testid="header">
      <Link href="/" className="text-xl font-semibold">
        Cypress Tests
      </Link>

      <nav className="hidden md:flex space-x-4" data-testid="nav-desktop">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:block">
        <Link href="/login">
          <Button variant="outline">Iniciar Sesión</Button>
        </Link>
      </div>

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px]">
            <div className="flex flex-col gap-4 mt-6">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/login"
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
