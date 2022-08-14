import axios from 'axios'
import sweetAlert from '@sweetalert/with-react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login ({ setUserIsLogged }) {
  //
  const navigate = useNavigate()
  //
  const API = process.env.REACT_APP_API
  const token = process.env.REACT_APP_API_TOKEN

  const submitHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email === '' || password === '') {
      sweetAlert(<h2>Fields cannot be empty.</h2>)
      return
    }

    if (email !== '' && !regexEmail.test(email)) {
      sweetAlert(<h2>You must enter a valid email address.</h2>)
      return
    }

    if (email !== 'lautaro@app.com' || password !== 'react') {
      sweetAlert(<h2>Invalid credentials.</h2>)
    }
    axios
      .post(API, { email, password })
      // 'http://challenge-react.alkemy.org'
      .then(res => {
        sweetAlert(<h2>Perfect, you entered correctly.</h2>)
        const tokenRecibido = res.data.token
        localStorage.setItem('token', tokenRecibido)
        setUserIsLogged(true)
        navigate('/listado')
        // INFO: localStorage.getItem('token') para recibir el valor
        // INFO: localStorage.clear() para borrar el Storage de la consola
      })
  }

  return (
    <>
      {!token && <Link to='/' />}

      <div className='row'>

        <div className='col-6o ffset-3'>

          <h2>Sign in</h2>
          <h6>Credentials are: lautaro@app.com & react</h6>
          <br />

          <form onSubmit={submitHandler}>

            {/* LABEL 1 COREO ELECTRONICO */}
            <label className='form-label d-block mt2'>
              <span>Email:</span>
              <br />
              <input type='text' name='email' placeholder='lautaro@app.com' />

              {/* LABEL 2 CONTRASEÑA */}
            </label>
            <br />
            <label className='form-label d-block mt2'>
              <span>Password:</span>
              <br />
              <input type='password' name='password' placeholder='react' />
            </label>
            <br />

            {/* BUTTON */}
            <button type='submit'>Sign in</button>

          </form>
        </div>
      </div>
    </>
  )
}
