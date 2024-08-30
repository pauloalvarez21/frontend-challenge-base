import MovieDetailsClient from './movieDetailsClient';

export async function generateStaticParams() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=16f2b6c42d3487702ff148cab8145277`
  );
  const data = await res.json();

  return data.results.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default function MovieDetails({ params }) {
  return <MovieDetailsClient id={params.id} />;
}
