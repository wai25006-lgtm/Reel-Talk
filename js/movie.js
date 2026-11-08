import { fetchMovieDetails } from "./movies.mjs";

const movieID = new URLSearchParams(window.location.search).get("id");

const title = document.querySelector("#movie-title");
const description = document.querySelector("#movie-description");

async function loadMovieDetails() {
  try {
    if (!movieID) {
      throw new Error("No movie ID provided");
    }

    const movie = await fetchMovieDetails(movieID);

    title.textContent = movie.title;
    description.textContent = movie.overview || "No description available.";

    document.title = `${movie.title} | Reel Talk`;
  } catch (error) {
    title.textContent = "Movie not found";
    description.textContent = "We could not load this movie's information.";

    console.error(error);
  }
}

loadMovieDetails();