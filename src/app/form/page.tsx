"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function MovieFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [genreValue, setGenreValue] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const title = data.get("title")?.toString().trim();
    const release = data.get("release")?.toString().trim();
    const overview = data.get("overview")?.toString().trim();
    const genre = genreValue?.trim(); // ✅ Usar estado

    if (!title || !release || !genre || !overview) {
      setError(true);
      setSubmitted(false);
      return;
    }

    setError(false);
    setSubmitted(true);

    // Limpiar formulario
    form.reset();
    setGenreValue(undefined);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setError(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Agregar una Película</h1>

      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          data-testid="movie-form"
        >
          <div>
            <Label htmlFor="title" data-testid="test-form-name-label">
              Título
            </Label>
            <Input
              name="title"
              id="title"
              placeholder="Título de la película"
              data-testid="test-title-form"
            />
          </div>

          <div>
            <Label htmlFor="release" data-testid="test-form-release-label">
              Fecha de estreno
            </Label>
            <Input
              name="release"
              id="release"
              type="date"
              data-testid="test-form-release-date"
            />
          </div>

          <div>
            <Label htmlFor="genre" data-testid="test-form-message-label">
              Género
            </Label>
            <Select value={genreValue} onValueChange={setGenreValue}>
              <SelectTrigger id="genre" data-testid="test-form-message-input">
                <SelectValue placeholder="Selecciona un género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accion">Acción</SelectItem>
                <SelectItem value="comedia">Comedia</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="ciencia-ficcion">Ciencia ficción</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="overview">Sinopsis</Label>
            <Textarea
              name="overview"
              id="overview"
              placeholder="Resumen de la película..."
              data-testid="test-form-overview-input"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm" data-testid="form-error">
              Por favor completa todos los campos.
            </p>
          )}

          <Button type="submit" data-testid="test-submit-button">
            Enviar
          </Button>
        </form>
      )}

      {submitted && (
        <div
          className="mt-8 p-4 bg-green-100 text-green-800 rounded-md space-y-4"
          data-testid="success-message"
        >
          <p>✅ ¡Película enviada exitosamente!</p>
          <Button onClick={handleResetForm} data-testid="add-another-button">
            Agregar otra película
          </Button>
        </div>
      )}
    </div>
  );
}
