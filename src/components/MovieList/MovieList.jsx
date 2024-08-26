import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css'; // Імпортуємо модульні стилі

const MovieList = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        movies.map(movie => (
          <div key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
              ) : (
                <div className={styles.moviePlaceholder}>No Image</div>
              )}
              <p className={styles.movieTitle}>{movie.title}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
