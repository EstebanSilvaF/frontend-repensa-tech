import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import StartPage from '../pages/StartPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}
