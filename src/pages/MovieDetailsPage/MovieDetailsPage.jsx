import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link, Route, Routes, useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../api/tmdb';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails({ movieId });
        if (data) {
          setMovie(data);
        } else {
          console.error('Failed to fetch movie details');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <button className={styles.goBackButton} onClick={handleGoBack}>Go back</button>
      {movie && (
        <>
          <div className={styles.movieDetailsContainer}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
            )}
            <div className={styles.movieInfo}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p>User Score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p className={styles.movieOverview}>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <h3>Additional Information</h3>
            <ul>
              <li>
                <Link className={styles.link} to="cast" state={location.state}>Cast</Link>
              </li>
              <li>
                <Link className={styles.link} to="reviews" state={location.state}>Reviews</Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
