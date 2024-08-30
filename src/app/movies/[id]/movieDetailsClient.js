'use client';

import { useState, useEffect } from 'react';
import styles from './movieDetails.module.css'; // Importa el archivo CSS

export default function MovieDetailsClient({ id }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=16f2b6c42d3487702ff148cab8145277`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.posterImage}
      />
      <p className={styles.description}>{movie.overview}</p>
      <p className={styles.releaseDate}><span className={styles.bold}>Release Date:</span> {movie.release_date}</p>
      <p className={styles.rating}><span className={styles.bold}>Rating:</span> {movie.vote_average}</p>
      <p className={styles.genres}><span className={styles.bold}>Genres:</span> {movie.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  );
}
