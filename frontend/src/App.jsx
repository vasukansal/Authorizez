import { Route, Routes } from 'react-router-dom'
import FloatingShapes from './components/floatingshapes'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import EmailVerification from './pages/EmailVerificationPage'
function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-950 flex items-center justify-center relative overflow-hidden">

      <FloatingShapes color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShapes color='bg-indigo-400' size='w-48 h-48' top='70%' left='80%' delay={3} />
      <FloatingShapes color='bg-sky-400' size='w-32 h-32' top="40%" left='-10%' delay={2} />


      <Routes>
        <Route path='/' element={"HOME"}></Route>
        <Route path='/SignUp' element={<SignUpPage />}></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/EmailVerification' element={<EmailVerification />}></Route>
      </Routes>
    </div >
  )
}

export default App
