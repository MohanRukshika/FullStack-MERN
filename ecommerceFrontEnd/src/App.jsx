import './App.css'
import Product from './components/products'
import TrendingProducts from './components/trendingProducts'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import ProductPage from './pages/productsPage'
import {Route,Routes} from 'react-router-dom'
import TestCase from './components/test'
import LoginPage from './pages/LoginPage'
import toast, { Toaster } from 'react-hot-toast';
import ContactPage from './pages/contactPage'

function App() {

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative bg-primary">
        <Toaster position="top-right"/>
        
        <Routes>
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestCase/>}/>
          <Route path="/login" element={<LoginPage/>}/>

        </Routes>
      </div>
          
    </>
  )
}

export default App
