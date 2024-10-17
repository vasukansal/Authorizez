import { Navigate, Route, Routes } from 'react-router-dom'
import FloatingShapes from './components/floatingshapes'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import EmailVerification from './pages/EmailVerificationPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from "./store/authStore";
import { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner'

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
}

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />
  }
  if (!user.isVerified) {
    return <Navigate to="/EmailVerification" replace />
  }
  return children;
}
function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (isCheckingAuth) {
    return <LoadingSpinner />
  }
  // console.log("isAuthenticated ", isAuthenticated)
  // console.log("user ", user)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-950 flex items-center justify-center relative overflow-hidden">

      <FloatingShapes color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShapes color='bg-indigo-400' size='w-48 h-48' top='70%' left='80%' delay={3} />
      <FloatingShapes color='bg-sky-400' size='w-32 h-32' top="40%" left='-10%' delay={2} />


      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>}></Route>
        <Route path='/SignUp' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>}></Route>
        <Route path='/Login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>}></Route>
        <Route path='/EmailVerification' element={<EmailVerification />}></Route>
      </Routes>
      <Toaster />
    </div >
  )
}

export default App
