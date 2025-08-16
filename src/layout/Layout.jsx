import { Link, Outlet } from "react-router-dom";
import { Drawer, Input } from "antd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
const { Search } = Input;

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 dark:text-[white]">
        <ul className="flex justify-between   p-4 md:w-[90%] w-[95%] mx-auto items-center">
          <li className="md:block hidden">
            <img
              src="/Foto/Home/logo.png"
              alt="logo"
              className="w-[166px] h-[48px]"
            />
          </li>

          <div className="items-center gap-[32px] dark:text-white text-[#000000] text-[18px] font-[500] font-[Poppins] md:flex hidden">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Sign Up</Link>
            </li>
          </div>
          <div className=" gap-[12px] items-center flex md:hidden">
            <li onClick={() => setOpen(true)} className="cursor-pointer">
              <MenuIcon />
            </li>
            <li className="text-[24px] font-[700] text-[black] dark:text-white">
              <h1>Exclusive</h1>
            </li>
          </div>
          <div className="flex gap-[24px] items-center">
            <li className="md:block hidden">
              <Search
                placeholder="What are you looking for?"
                onSearch={(value) => console.log(value)}
                style={{ width: 250, backgroundColor: "transparent" }}
                size="large"
              />
            </li>
            <li className="md:block hidden cursor-pointer">
              <FavoriteBorderIcon />
            </li>
            <li className="cursor-pointer">
              <LocalGroceryStoreOutlinedIcon />
            </li>
            <li className="cursor-pointer">
              <PersonOutlineOutlinedIcon />
            </li>
            <Drawer
              title="Menu"
              placement="left"
              onClose={() => setOpen(false)}
              open={open}
			  width={220}
            >
              <ul className="flex flex-col gap-4 text-[18px] font-[500]">
                <li>
                  <Link to="/" onClick={() => setOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setOpen(false)}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </Drawer>
          </div>
          {/* <li>
					<Link to='/products'>Products</Link>
				</li>
				<li>
					<Link to='/whishlist'>Whishlist</Link>
				</li>
				<Link to='/carts'>Carts</Link> */}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
