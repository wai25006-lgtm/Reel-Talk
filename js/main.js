import { saveReview } from "./storage.js";

import {
  fetchMovies,
  searchMovies as searchMoviesAPI,
  fetchGenres as getGenresAPI,
} from "./movies.mjs";

console.log("Imports completed successfully!");
console.log("TMDB functions:", fetchMovies, searchMoviesAPI, getGenresAPI);

const search = document.querySelector("#search");
const genre = document.querySelector("#genre");
const movieList = document.querySelector("#movie-list");
const movieCards = document.querySelectorAll(".movie-card");

let movies = [];

function displayMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("article");
    card.classList.add("movie-card");

    const image = document.createElement("img");
    image.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "placeholder.jpg";
    image.alt = `${movie.title} Poster`;

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const description = document.createElement("p");
    description.textContent = movie.overview;

    const link = document.createElement("a");
    link.href = `movie.html?id=${movie.id}`;
    link.textContent = "Read More";

    card.append(image, title, description, link);
    movieList.appendChild(card);
  });
}

async function loadMovies() {
  try {
    movies = await fetchMovies();
    console.log("Movies received:", movies);
    displayMovies(movies);
  } catch (error) {
    movieList.textContent = "Unable to load movies.";
    console.error(error);
  }
}

async function loadGenres() {
  try {
    const genres = await getGenresAPI();
    console.log("Genres received:", genres);

    genres.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      genre.appendChild(option);
    });
  } catch (error) {
    console.error("Could not fetch genres:", error);
  }
}

async function handleSearch() {
  const searchText = search.value.trim();

  try {
    if (searchText === "") {
      movies = await fetchMovies();
    } else {
      movies = await searchMoviesAPI(searchText);
    }

    filterMovies();
  } catch (error) {
    console.error("Search failed:", error);
  }
}

function filterMovies() {
  const selectedGenre = genre.value;

  const filteredMovies = movies.filter((movie) =>
    selectedGenre === "all" ||
    movie.genre_ids.includes(Number(selectedGenre))
  );

  displayMovies(filteredMovies);
}

search.addEventListener("input", handleSearch);
genre.addEventListener("change", filterMovies);

const reviewForm = document.querySelector("#review-form-element");
const message = document.querySelector("#message");

reviewForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const movieName = document.querySelector("#movie-name").value;
  const rating = document.querySelector("#rating").value;
  const reviewText = document.querySelector("#review").value;
  const review = {
    movie: movieName,
    rating: rating,
    review: reviewText,
  };

  saveReview(review);
  message.textContent = "Your review was saved!";
  reviewForm.reset();
});

loadMovies();
loadGenres();