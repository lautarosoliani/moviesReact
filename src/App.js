import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Header from './components/Header'
import Listado from './components/Listado'
import Login from './components/Login'
import Detalle from './components/Detalle'
import Resultados from './components/Resultados'
import Favoritos from './components/Favoritos'

import './css/bootstrap.min.css'
import './css/app.css'

function App () {
  //
  const [favorites, setFavorites] = useState([])
  const [userIsLogged, setUserIsLogged] = useState(false)

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs')
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal)
      setFavorites(favsArray)
    }
  }, [])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      setUserIsLogged(true)
    }
  }, [])

  //
  const handleAddOrRemoveFromFavs = (e) => {
    //
    const favMovies = localStorage.getItem('favs')
    let tempMoviesInFavs
    if (favMovies === null) {
      tempMoviesInFavs = []
    } else {
      tempMoviesInFavs = JSON.parse(favMovies)
    }

    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText

    const movieData = {
      id: btn.dataset.movieId,
      imgURL,
      overview,
      title
    }

    const movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    })

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavorites(tempMoviesInFavs)
    } else {
      const moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavorites(moviesLeft)
    }
  }

  return (
    <>
      <Header favorites={favorites} userIsLogged={userIsLogged} />

      <div className='container mt-3'>
        <Routes>
          <Route
            exact path='/'
            element={<Login setUserIsLogged={setUserIsLogged} />}
          />
          <Route
            path='/listado'
            element={<Listado handleAddOrRemoveFromFavs={handleAddOrRemoveFromFavs} favorites={favorites} />}
          />
          <Route
            path='/detalle'
            element={<Detalle />}
          />
          <Route
            path='/favoritos'
            element={<Favoritos favorites={favorites} handleAddOrRemoveFromFavs={handleAddOrRemoveFromFavs} />}
          />
          <Route
            path='/resultados'
            element={<Resultados handleAddOrRemoveFromFavs={handleAddOrRemoveFromFavs} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
