import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import {Route,Routes} from 'react-router-dom'
import TestCase from './components/test'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/registerPage'
import ForgotPassword from './pages/forgrtPassword';
//588543186503-0rvdvnpeev7da1hqucgdhg9kulkfej37.apps.googleusercontent.com

function App() {

  return (
    <>
    <GoogleOAuthProvider clientId="588543186503-0rvdvnpeev7da1hqucgdhg9kulkfej37.apps.googleusercontent.com">
      <div className="w-full h-screen flex items-center justify-center relative bg-primary">
        <Toaster position="top-right"/>
        
        <Routes>
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestCase/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        </Routes>
        
      </div>
    </GoogleOAuthProvider>     
    </>
  )
}

export default App
