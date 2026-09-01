import {Link, Route,Routes} from 'react-router-dom'
import AdminProductPage from './AdminPages/adminProductPage'
import AddProductPage from './AdminPages/AddProductPage'
import EditProductPage from './AdminPages/adminEditPage'
import AdminOrdersPage from './AdminPages/adminOrderPage'

export default function AdminPage(){
    return(
       <div className="w-full h-screen flex items-center border-[10px] border-accent">
            <div className="w-[300px] h-full bg-accent text-primary">
                <Link to="/admin/orders" className='block py-2 px-4 hover:bg-[#07434a] font-medium'>Orders</Link>
                <Link to="/admin/products" className='block py-2 px-4 hover:bg-[#07434a] font-medium'>Products</Link>
                <Link to="/admin/users" className='block py-2 px-4 hover:bg-[#07434a] font-medium'>Users</Link>
                <Link to="/admin/reviews" className='block py-2 px-4 hover:bg-[#07434a] font-medium'>Rewiews</Link>
            </div>
            <div className="w-[calc(100%_-_300px)] h-full bg-primary border-accent ">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/addProduct" element={<AddProductPage/>}/>
                    <Route path="/editProduct" element={<EditProductPage/>}/>
                    <Route path="/users" element={<h1>Users Dashboard</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/reviews" element={<h1>Reviews Dashboard</h1>}/>
                </Routes>
            </div>
      </div> 
    )
}