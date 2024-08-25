import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../api/tmdb'; // Імпортуємо функцію

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get('query') || '';

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSearchParams({ query });
    try {
      const data = await searchMovies({ query });
      if (data) {
        setMovies(data.results);
      } else {
        setError('Failed to search movies');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
