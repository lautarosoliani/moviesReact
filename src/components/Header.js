import React from 'react'
import { Link } from 'react-router-dom'

// components
import Buscador from './Buscador'

const Header = ({ favorites, userIsLogged }) => {
  return (
    <header className='sticky-top'>
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <div className='container'>
          <span className='navbar-brand'>Lautaro App - React is cool 💙 </span>

          <div className='navbar-expand-sm'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                {userIsLogged &&
                  <Link className='nav-link' to='/listado'>📃 List</Link>}
              </li>
              <li className='nav-item'>
                {userIsLogged &&
                  <Link className='nav-link' to='/favoritos'>⭐️ Favs</Link>}
              </li>
              <li className='nav-item d-flex align-items-center'>
                <span className='text-success'>
                  {
                  userIsLogged &&
                  favorites.length > 0 && <> 👉 Total in Favs: {favorites.length}</>
                  }
                </span>
              </li>
            </ul>
          </div>
          {userIsLogged && <Buscador />}
        </div>
      </nav>
    </header>
  )
}

export default Header
