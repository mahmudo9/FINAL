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


function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
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
					path: 'whishlist',
					element: <Whishlist />,
				},
				{
					path: 'product/:id',
					element: <ProductById />,
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
			],
		},
	])

	return <RouterProvider router={router} />
}

export default App
