import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <div>{movie.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
