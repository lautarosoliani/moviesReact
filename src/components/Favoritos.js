import { Link, Navigate } from 'react-router-dom'

export default function Favoritos (props) {
//

  const token = localStorage.getItem('token')

  return (
    <>

      {!token && <Navigate to='/' />}
      <h2>Favorites Section</h2>
      <div className='row'>
        {!props.favorites.length && <div className='col-12 text-danger'> There is nothing in favorites</div>}
        {/* // Estructura base de la card */}
        {/* // useState.map */}
        {
          props.favorites.map((oneMovie, idx) => {
            return (
              <div className='col-3' key={idx}>
                <div className='card my-4'>
                  <img className='card-img-top' src={oneMovie.imgURL} alt='Card' />
                  <button
                    className='favourite-btn'
                    onClick={props.handleAddOrRemoveFromFavs}
                    data-movie-id={oneMovie.id}
                  >🖤
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
