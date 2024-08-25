// Замість import.meta.env використовуйте process.env для React
const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

const API_REQUEST_SETTINGS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`, // Використання Bearer токена для авторизації
  },
};

const LANGUAGE = 'en-US'; // Задаємо мову за замовчуванням

// Функція для отримання конфігурації TMDb
export async function getTmdbConfig({ signal }) {
  try {
    const response = await fetch('https://api.themoviedb.org/3/configuration', {
      ...API_REQUEST_SETTINGS,
      signal,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Функція для отримання списку популярних фільмів
export async function getTrendingMovies({ signal }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=${LANGUAGE}`,
      { ...API_REQUEST_SETTINGS, signal },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Функція для пошуку фільмів за назвою
export async function searchMovies({ query, signal }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=${LANGUAGE}&include_adult=true&page=1`,
      { ...API_REQUEST_SETTINGS, signal },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Функція для отримання деталей певного фільму за його ID
export async function getMovieDetails({ movieId, signal }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=${LANGUAGE}`,
      { ...API_REQUEST_SETTINGS, signal },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Функція для отримання акторського складу певного фільму за його ID
export async function getMovieCast({ movieId, signal }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${LANGUAGE}`,
      {
        ...API_REQUEST_SETTINGS,
        signal,
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Функція для отримання оглядів певного фільму за його ID
export async function getMovieReviews({ movieId, signal }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=${LANGUAGE}&page=1`,
      {
        ...API_REQUEST_SETTINGS,
        signal,
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
