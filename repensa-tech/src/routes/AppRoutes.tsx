import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import PublishProductPage from '../pages/PublishProductPage'
import RegisterPage from '../pages/RegisterPage'
import StartPage from '../pages/StartPage'
import { paths } from './paths'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.gallery} element={<StartPage />} />
      <Route path="/home" element={<Navigate to={paths.home} replace />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route path={paths.publish} element={<PublishProductPage />} />
    </Routes>
  )
}
