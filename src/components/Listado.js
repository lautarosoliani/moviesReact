//
//
// Este componente contiene el cuerpo de la Card de cada movie

// Importaciones
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import sweetAlert from '@sweetalert/with-react'

// Funcion
export default function Listado (props) {
  //

  // Token
  const token = localStorage.getItem('token')

  // useState
  const [moviesList, setMoviesList] = useState([])

  // useEffect
  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=128ca6907dfc713026c80ca3a057dbee&language=en-EN&page=1'
    axios
      .get(endPoint)
      .then(response => {
        const apiData = response.data
        setMoviesList(apiData.results)
      })
      .catch(error => {
        sweetAlert(<h2>There were errors try again later</h2>)
        console.log(error)
      })
  }, [setMoviesList])

  // RETORNO DE LA FUNCION

  return (
    <>
      {!token && <Navigate to='/' />}
      <div className='row'>
        {/* // Estructura base de la card */}
        {/* // useState.map */}
        {
          moviesList.map((oneMovie, idx) => {
            return (
              <div className='col-3' key={idx}>
                <div className='card my-4'>
                  <img className='card-img-top' src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt='Card' />

                  <button
                    className='favourite-btn'
                    onClick={props.handleAddOrRemoveFromFavs}
                    data-movie-id={oneMovie.id}
                  >
                    🖤
                  </button>
                  <div className='card-body'>
                    <h5 className='card-title'>{oneMovie.title}</h5>
                    <p className='card-text'>{oneMovie.overview.substring(0, 100)}...</p>
                    <Link to={`/detalle?movieID=${oneMovie.id}`} className='btn btn-primary'>Movie Details</Link>
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
