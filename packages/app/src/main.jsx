import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { RootLayout } from './layouts/RootLayout'
import { PostView } from './views/PostView'
import { MainView } from './views/MainView'
import { NotFound } from './views/NotFound'
import { SettingsView } from './views/SettingsView'
import { AuthContextProvider } from './context/AuthContext'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <MainView />,
      },
      {
        path: '/posts/:id',
        element: <PostView />,
      },
      {
        path: '/settings',
        element: <SettingsView />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>

        <RouterProvider router={router} />

      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
