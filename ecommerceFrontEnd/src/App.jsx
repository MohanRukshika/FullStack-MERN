import './App.css'
import Product from './products'
import TrendingProducts from './trendingProducts'

function App() {

  return (
    <>
      <div className="w-[700px] h-[700px] border-[6px] flex items-center justify-center">
        <div className='w-[600px] h-[600px] bg-yellow-500 flex flex-col items-center justify-center'>
          <div className='w-[70px] h-[70px] bg-red-700'></div>
          <div className='w-[70px] h-[70px] bg-blue-600'></div>
          <div className='w-[70px] h-[70px] bg-green-600'></div>
          <div className='w-[70px] h-[70px] bg-orange-600'></div>
          <div className='w-[70px] h-[70px] bg-white'></div>
          <div className='w-[70px] h-[70px] bg-pink-400'></div>
        </div>
      </div>
          
    </>
  )
}

export default App

 {/* <Product name="Classic Notebook Laptop" price="Rs.199,990" image="src\assets\image10.png"/>
        <Product name="Smart Fitness Watch" price="Rs.74,990" image="src\assets\image11.png"/>
        <Product name="13-inch Tablet (512GB)" price="Rs.329,990" image="src\assets\image9.png"/>
        <Product name="Ultra Slim Laptop Case (MacBook Compatible)" price="Rs.9,990" image="src\assets\image7.png"/>
        <Product name="Wireless Optical Mouse" price="Rs.7,490" image="src\assets\image6.png"/>
        <Product name="15.6-inch Windows Laptop" price="Rs.239,990" image="src\assets\image4.png"/>
        <Product name="13-inch Premium Laptop" price="Rs.429,990" image="src\assets\image5.png"/> */}