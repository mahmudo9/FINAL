import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Whishlist from './pages/Whishlist'
import ProductById from './pages/ProductById'
import NotFound from './pages/NotFound'
import Checkout from './pages/Checkout'
import Carts from './pages/Carts'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Order from './pages/Order'


function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/signup',
					element: <SignUp />,
				},
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'about',
					element: <About />,
				},
				{
					path: 'contact',
					element: <Contact />,
				},
				
				
				{
					path: 'product/:id',
					element: <ProductById />,
				},
				{
					path: 'Products',
					element: <Products />,
				},
				{
					path: '*',
					element: <NotFound />,
				},
				{
					path: '/checkout',
					element: <Checkout />,
				},
				{
					path: '/carts',
					element: <Carts />,
				},
				{
					path: '/profile',
					element: <Profile />,
				},
				{
					path: 'wishlist',
					element: <Whishlist />,
				},
				{
					path: '/login',
					element: <LogIn />,
				},
				{
					path: '/order',
					element: <Order />,
				},
				
			],
		},
	])

	return <RouterProvider router={router} />
}

export default App
