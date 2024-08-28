import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, getTmdbConfig } from '../../api/tmdb'; 
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [profileSize, setProfileSize] = useState('');

  useEffect(() => {
    const fetchCastAndConfig = async () => {
      if (!movieId) {
        console.error('movieId is not defined');
        return;
      }

      try {
        const castData = await getMovieCast({ movieId });
        const configData = await getTmdbConfig({});

        if (castData && configData) {
          setCast(castData.cast);
          setBaseUrl(configData.images.base_url);
          setProfileSize(configData.images.profile_sizes[2]); 
        }
      } catch (error) {
        console.error('Error fetching cast and configuration:', error);
      }
    };

    fetchCastAndConfig();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <div className={styles.castContainer}>
        {cast.map(actor => (
          <div key={actor.cast_id} className={styles.castItem}>
            {actor.profile_path ? (
              <img
                src={`${baseUrl}${profileSize}${actor.profile_path}`}
                alt={actor.name}
                className={styles.castImage}
              />
            ) : (
              <div className={styles.noImage}>
                <span className={styles.noImageText}>?</span>
              </div>
            )}
            <p className={styles.castName}>{actor.name}</p>
            <p className={styles.castCharacter}>as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
