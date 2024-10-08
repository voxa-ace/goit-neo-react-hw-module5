import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api/tmdb'; 
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies({});
        if (data) {
          setMovies(data.results);
        } else {
          setError('Failed to fetch trending movies');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch trending movies');
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
