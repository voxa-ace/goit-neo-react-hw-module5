import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <div>{movie.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
