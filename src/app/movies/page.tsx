"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MovieCard from "@/components/MovieCard/MovieCard";
import bear from "@/assets/images/bear.jpg";
import { getSearchMovie } from "@/services/movies/getSearchMovie";
import { getTrendingMovies } from "@/services/movies/getTrendingMovies";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
}

export default function HomePage() {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searching) return; // No buscar tendencias si estamos buscando
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const data = await getTrendingMovies(timeWindow);
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error al obtener películas en tendencia:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeWindow, searching]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setSearching(true);
    try {
      const data = await getSearchMovie(search);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error al buscar películas:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
    setSearching(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section
        className="relative w-full h-[400px] flex items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${bear.src})`,
        }}
      >
        <div className="backdrop-blur-sm bg-black/60 w-full h-full absolute inset-0" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Bienvenido.</h1>
          <p className="text-lg mb-6">
            Millones de películas, programas de TV y personas por descubrir.
            Explora ahora.
          </p>

          <div className="flex max-w-xl mx-auto gap-2">
            <Input
              placeholder="Buscar película, programa o persona..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              data-testid="test-search-input"
            />
            <Button onClick={handleSearch} data-testid="test-search-button">Buscar</Button>
            {searching && (
              <Button variant="ghost" onClick={clearSearch}>
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Resultados de búsqueda */}
      {searching && (
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Resultados para: <span className="italic">{search}</span>
          </h2>

          {loading ? (
            <p>Cargando resultados...</p>
          ) : searchResults.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {searchResults.slice(0, 14).map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  posterUrl={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                  }
                  rating={movie.vote_average * 10}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tendencias */}
      {!searching && (
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tendencias</h2>

            <Tabs
              defaultValue="day"
              value={timeWindow}
              onMouseDown={(e) => e.preventDefault()}
              onValueChange={(value) => {
                setTimeWindow(value as "day" | "week");
              }}
            >
              <TabsList>
                <TabsTrigger value="day" data-testid="test-hoy">Hoy</TabsTrigger>
                <TabsTrigger value="week" data-testid="test-semana">Esta Semana</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {loading ? (
              <p>Cargando películas...</p>
            ) : movies.length === 0 ? (
              <p>No hay películas para mostrar.</p>
            ) : (
              movies
                .slice(0, 14)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average * 10}
                  />
                ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}
