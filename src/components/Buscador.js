import sweetAlert from '@sweetalert/with-react'
import { useNavigate } from 'react-router-dom'

export default function Buscador () {
  //
  const navigate = useNavigate()

  const submitHandler = e => {
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value

    if (keyword.length === 0) {
      sweetAlert(<h5>You must enter text to search.</h5>)
    } else if (keyword.length < 2) {
      sweetAlert(<h5>Please enter more than 1 character.</h5>)
    } else {
      e.currentTarget.keyword.value = ''
      navigate(`/resultados?keyword=${keyword}`)
    }
  }

  return (
    <form className='d-flex align-items-center' onSubmit={submitHandler}>
      <label className='form-label mb-0 mx-2'>
        <input className='form-control' type='text' name='keyword' placeholder='Search something here' />
      </label>

      <button className='btn btn-success' type='submit'>Search</button>

    </form>
  )
}
