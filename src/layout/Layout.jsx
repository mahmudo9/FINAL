import { Link, Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
				<li>
					<Link to='/contact'>Contact</Link>
				</li>
				<li>
					<Link to='/products'>Products</Link>
				</li>
				<li>
					<Link to='/whishlist'>Whishlist</Link>
				</li>
				<Link to='/carts'>Carts</Link>
			</ul>
			<Outlet />
		</div>
	)
}

export default Layout
