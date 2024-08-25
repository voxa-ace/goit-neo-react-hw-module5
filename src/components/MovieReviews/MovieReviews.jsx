import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error.response || error.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h3>Reviews</h3>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewAuthor}><strong>{review.author}</strong></p>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
