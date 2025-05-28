"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold" data-testid="homepage-title">
        Bienvenido al sitio de pruebas
      </h1>

      <p className="text-muted-foreground" data-testid="homepage-description">
        Esta aplicación contiene varias páginas con componentes interactivos
        para practicar pruebas automatizadas usando Cypress.
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        data-testid="nav-cards"
      >
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">🎬 Películas</h2>
            <p>Lista de películas.</p>
            <Link href="/movies">
              <Button data-testid="go-to-movies">Ir a Películas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">📋 Formulario</h2>
            <p>Formulario básico para probar inputs, validaciones y envío.</p>
            <Link href="/form">
              <Button data-testid="go-to-form">Ir al Formulario</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">🧪 Botones y eventos</h2>
            <p>Interacciones simples: clicks, contadores, estados, etc.</p>
            <Link href="/interactions">
              <Button data-testid="go-to-interactions">
                Ir a Interacciones
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">🤷🏻‍♂️ Oh-Oh</h2>
            <p>Not found</p>
            <Link href="/lo-que-sea">
              <Button data-testid="go-to-404">Ir a 404</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
