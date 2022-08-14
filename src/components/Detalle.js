import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Detalle () {
  const token = localStorage.getItem('token')

  const query = new URLSearchParams(window.location.search)
  const movieID = query.get('movieID')

  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=128ca6907dfc713026c80ca3a057dbee&language=en-EN&page=1`
    axios.get(endPoint)
      .then(response => {
        const apiData = response.data
        setMovie(apiData)
      })
      .catch(error => {
        console.log(<h2>There were errors, try again later.</h2>)
        console.log(error)
      })
  }, [movieID])

  return (
    <>
      {!token && <Link to='/' />}
      {!movie && <p>Loading...</p>}
      {movie &&
        <>
          <h2>{movie.title}</h2>
          <div className='row'>
            <div className='col-4'>
              <img className='img-fluid' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='movie poster' />

            </div>
            <div className='col-8'>
              <h5>Release date: {movie.release_date}</h5>
              <h5>Review: </h5>
              <p>{movie.overview}</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Genders: </h5>
              <ul>
                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
              </ul>
            </div>
          </div>
        </>}
    </>

  )
}
