import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`, // Змінено на правильний токен
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
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p><strong>{review.author}</strong></p>
              <p>{review.content}</p>
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
