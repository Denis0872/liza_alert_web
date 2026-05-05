import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { ApplyPage } from './pages/ApplyPage'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import DemoOne from './pages/demo'
import { NewsDetailsPage } from './pages/NewsDetailsPage'
import { NewsPage } from './pages/NewsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { InforgRequestsPage } from './pages/InforgRequestsPage'
import { ProfilePage } from './pages/ProfilePage'
import { PublicSectionPage } from './pages/PublicSectionPage'
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
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/news/:id',
    element: <NewsDetailsPage />,
  },
  { path: '/publications', element: <PublicSectionPage /> },
  { path: '/about', element: <PublicSectionPage /> },
  { path: '/newcomers', element: <PublicSectionPage /> },
  { path: '/safety', element: <PublicSectionPage /> },
  {
    path: '/demo/simple-header',
    element: <DemoOne />,
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
      { path: 'inforg/requests', element: <InforgRequestsPage /> },
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
