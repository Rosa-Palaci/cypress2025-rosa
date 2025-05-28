"use client";

import Image from "next/image";

interface MovieCardProps {
  title: string;
  releaseDate: string;
  posterUrl: string;
  rating: number; // 0-100
}

export default function MovieCard({
  title,
  releaseDate,
  posterUrl,
  rating,
}: MovieCardProps) {
  const ratingColor =
    rating >= 70
      ? "bg-green-600"
      : rating >= 40
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="relative min-w-[180px] max-w-[180px] rounded-2xl overflow-hidden shadow-lg group border" data-testid="test-movie-card">
      {/* Imagen de fondo */}
      <div className="relative h-96">
        <Image
          src={posterUrl}
          alt={`Póster de ${title}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="pt-2 px-4 pb-2 space-y-1 bg-white">
        {/* Porcentaje */}
        <div className="absolute left-2 top-2 bg-black text-white rounded-full border-4 border-white w-12 h-12 flex items-center justify-center text-sm font-bold shadow-md z-10">
          <span className={ratingColor + " rounded-full p-1"}>
            {rating.toFixed(0)}%
          </span>
        </div>

        {/* Título */}
        <h4 className="text-lg font-semibold mt-6">{title}</h4>
        {/* Fecha */}
        <p className="text-sm text-muted-foreground">{releaseDate}</p>
      </div>
    </div>
  );
}
