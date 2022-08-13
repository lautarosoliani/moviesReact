import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import sweetAlert from '@sweetalert/with-react'

export default function Resultados (props) {
  const query = new URLSearchParams(window.location.search)
  const keyword = query.get('keyword')

  // endpoint query=spider
  // https://api.themoviedb.org/3/search/movie?api_key=128ca6907dfc713026c80ca3a057dbee&language=en-US&page=1&query=spider

  const [moviesResults, setMoviesResults] = useState([])

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=128ca6907dfc713026c80ca3a057dbee&language=en-EN&query=${keyword}`
    axios.get(endPoint).then(response => {
      const moviesArray = response.data.results

      if (moviesArray.length === 0) {
        sweetAlert(<h4>Your search returned no results.</h4>)
      }

      setMoviesResults(moviesArray)
    })
      .catch(error => {
        console.log(error)
      })
  }, [keyword])

  return (
    <>
      <h2>You searched for: <em>{keyword}</em></h2>

      {moviesResults.length === 0 && <h3>No results.</h3>}

      <div className='row'>
        {
          moviesResults.map((oneMovie, idx) => {
            return (
              <div className='col-4' key={idx}>
                <div className='card my-4'>
                  <img className='card-img-top' src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt='Card' />
                  <button
                    className='favourite-btn'
                    onClick={props.handleAddOrRemoveFromFavs}
                    data-movie-id={oneMovie.id}
                  >🖤
                  </button>
                  <div className='card-body'>
                    <h5 className='card-title'>{oneMovie.title}</h5>
                    <p className='card-text'>{oneMovie.overview.substring(0, 100)}...</p>
                    <Link to={`/detalle?movieID=${oneMovie.id}`} className='btn btn-primary'>Details</Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
