import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home/Home'
import SpotifyIndex from './screens/SpotifyIndex/SpotifyIndex'
import { loader as SpotifyIndexLoader } from './screens/SpotifyIndex/SpotifyIndexLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/index',
    element: <SpotifyIndex />,
    loader: SpotifyIndexLoader
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
