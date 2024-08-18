import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Entry from './pages/Entry.jsx'
import MainPage from './pages/MainPage.jsx'
import WeatherPage from './pages/WeatherPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Entry />,
      },
      {
        path: '/mainpage',
        element: <MainPage />,
      },
      {
        path: '/WeatherPage',
        element: <WeatherPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
