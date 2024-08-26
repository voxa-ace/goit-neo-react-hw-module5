const API_KEY = process.env.REACT_APP_TMDB_API_TOKEN;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_REQUEST_SETTINGS = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export async function getTmdbConfig() {
  try {
    const response = await fetch(`${API_BASE_URL}/configuration`, API_REQUEST_SETTINGS);
    return response.ok ? await response.json() : null;
  } catch (err) {
    console.error('Error fetching TMDB configuration:', err);
    return null;
  }
}

export async function getTrendingMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`, API_REQUEST_SETTINGS);
    return response.ok ? await response.json() : null;
  } catch (err) {
    console.error('Error fetching trending movies:', err);
    return null;
  }
}

export async function searchMovies({ query }) {
  try {
    const response = await fetch(`${API_BASE_URL}/search/movie?query=${query}`, API_REQUEST_SETTINGS);
    return response.ok ? await response.json() : null;
  } catch (err) {
    console.error('Error searching for movies:', err);
    return null;
  }
}

export async function getMovieDetails({ movieId }) {
  try {
    const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`, API_REQUEST_SETTINGS);
    return response.ok ? await response.json() : null;
  } catch (err) {
    console.error('Error fetching movie details:', err);
    return null;
  }
}

export async function getMovieCast({ movieId }) {
  try {
    const response = await fetch(`${API_BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`, API_REQUEST_SETTINGS);
    return response.ok ? await response.json() : null;
  } catch (err) {
    console.error('Error fetching movie cast:', err);
    return null;
  }
}
