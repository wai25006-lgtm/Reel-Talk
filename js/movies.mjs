const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export async function fetchMovies() {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error("Could not load movies");
    }
    const data = await response.json();
    return data.results;
}

export async function searchMovies(searchText) {
    const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchText)}`);
    if (!response.ok) {
        throw new Error("Could not search movies");
    }
    const data = await response.json();
    return data.results;
}

export async function fetchGenres() {
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error("Could not load genres");
    }
    const data = await response.json();
    return data.genres;
}

export async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Could not load movie details");
  }

  return await response.json();
}