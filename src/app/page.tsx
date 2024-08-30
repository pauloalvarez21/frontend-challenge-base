// src/app/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [moviesPages, setMoviesPages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const totalPages = 8; // Define cuántas páginas quieres mostrar
  const router = useRouter(); // Hook para redirigir a otra página

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=16f2b6c42d3487702ff148cab8145277`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies based on selected genre
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allPages = [];
        for (let i = 1; i <= totalPages; i++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=16f2b6c42d3487702ff148cab8145277&page=${i}${
              selectedGenre ? `&with_genres=${selectedGenre}` : ""
            }`
          );
          const data = await response.json();
          allPages.push(...data.results); // Guarda todas las películas en un solo array
        }
        setMoviesPages(allPages); // Guarda todas las películas
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [selectedGenre]); // Se ejecuta cuando cambia el género seleccionado

  // Debugging outputs
  console.log("Selected Genre:", selectedGenre);
  console.log("Movies Pages:", moviesPages);

  if (moviesPages.length === 0) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen las películas
  }

  const handleCardClick = (id) => {
    router.push(`/movies/${id}`); // Redirige a la página de detalles de la película
  };

  return (
    <div>
      <div style={{ margin: "20px" }}>
        <h2>Buscar por Género</h2>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Todos los Géneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card-container">
        {moviesPages.map((movie) => (
          <div
            key={movie.id}
            className="card"
            onClick={() => handleCardClick(movie.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="card-img"
            />
            <div className="card-content">
              <h1>{movie.title}</h1>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
