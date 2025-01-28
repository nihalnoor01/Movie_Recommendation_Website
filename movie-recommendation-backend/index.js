require("dotenv").config();
const express = require("express")
const cors = require("cors")
const axios = require("axios")
const app = express()

app.use(cors())
app.use(express.json())

const TMDB_API_KEY = process.env.TMDB_API_KEY;
// Map moods to TMDB genre IDs
const moodToGenre = {
  happy: 35, // Comedy
  sad: 18, // Drama
  romantic: 10749, // Romance
  motivated: 99, // Documentary
  scared: 27, // Horror
}

// Endpoint to get movie recommendations
app.post("/recommend", async (req, res) => {
  const { mood } = req.body
  const genreId = moodToGenre[mood]

  if (!genreId) {
    return res.status(400).json({ error: "Invalid mood" })
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=1&per_page=50`,
    )
    const movies = response.data.results.slice(0, 20).map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      overview: movie.overview,
    }))
    res.json({ movies })
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error)
    res.status(500).json({ error: "Failed to fetch movies" })
  }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

