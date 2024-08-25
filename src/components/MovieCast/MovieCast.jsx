import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error.response || error.message);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <div className={styles.castContainer}>
        {cast.map(actor => (
          <div key={actor.id} className={styles.castItem}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.castImage}
              />
            )}
            <div>
              <p className={styles.castName}>{actor.name}</p>
              <p className={styles.castCharacter}>Character: {actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
