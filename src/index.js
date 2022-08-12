
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import App from './App'

// const rootElement = document.getElementById('root')
// const root = createRoot(rootElement)

// root.render(
//   <BrowserRouter>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </BrowserRouter>
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
