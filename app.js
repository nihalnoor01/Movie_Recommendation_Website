import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [mood, setMood] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recommend', { mood });
      setRecommendedMovies(response.data.movies);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mood-Based Movie Recommender</h1>
      <form onSubmit={handleSubmit}>
        <label>
          How are you feeling?
          <select value={mood} onChange={(e) => setMood(e.target.value)} required>
            <option value="">Select your mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="romantic">Romantic</option>
            <option value="motivated">Motivated</option>
            <option value="scared">Scared</option>
          </select>
        </label>
        <button type="submit">Get Recommendations</button>
      </form>

      {recommendedMovies.length > 0 && (
        <div>
          <h2>Recommended Movies:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {recommendedMovies.map((movie, index) => (
              <div key={index} style={{ width: '200px', textAlign: 'center' }}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;