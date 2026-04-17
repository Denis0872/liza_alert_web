import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { ApplyPage } from './pages/ApplyPage'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { ProfilePage } from './pages/ProfilePage'
import { SearchDetailsPage } from './pages/SearchDetailsPage'
import { SearchesPage } from './pages/SearchesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/apply',
    element: <ApplyPage />,
  },
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate replace to="/app/dashboard" /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'searches', element: <SearchesPage /> },
      { path: 'searches/:id', element: <SearchDetailsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
