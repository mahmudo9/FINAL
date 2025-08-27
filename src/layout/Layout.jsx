import { Link, Outlet } from "react-router-dom";
import { Button, Drawer, Input, Modal } from "antd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import useDarkSide from "../configs/useDarkSide";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SearchOutlined } from "@ant-design/icons";
import {
  FacebookOutlined,
  InstagramOutlined,
  SendOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import WishlistIcon from "../components/badge";
import CartIcon from "../components/cartBadge";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../app/productSlise";

const { Search } = Input;
const Layout = () => {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useDarkSide();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openn = Boolean(anchorEl);
  const [Name, SetName] = useState(" ");
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.product);
  const allProducts = data?.data?.products || [];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <div>
      <Modal
        title="🔍 Search products"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        bodyStyle={{ paddingTop: 10 }}
      >
        <Search
          placeholder="What do you search?"
          size="large"
          enterButton="Search"
          className="w-full rounded-xl"
          value={Name}
          onChange={(e) => SetName(e.target.value)}
          style={{ marginBottom: "16px", borderRadius: "10px" }}
        />

        <div className="overflow-y-auto max-h-[250px] space-y-4">
          {allProducts
            .filter((e) =>
              e.productName
                .toLowerCase()
                .trim()
                .includes(Name.toLowerCase().trim())
            )
            .map((el, i) => (
              <Link to={`/product/${el.id}`} key={i}>
                <div
                  onClick={closeModal}
                  className="flex items-center gap-4 px-4 py-3 mb-[20px] bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <img
                    src={`http://37.27.29.18:8002/images/${el.image}`}
                    alt="product"
                    className="w-[60px] h-[60px] rounded-2xl object-cover border"
                  />
                  <h1 className="text-base font-medium text-gray-800 dark:text-gray-100 truncate">
                    {el.productName}
                  </h1>
                </div>
              </Link>
            ))}

          {allProducts.filter((e) =>
            e.productName
              .toLowerCase()
              .trim()
              .includes(Name.toLowerCase().trim())
          ).length === 0 && (
            <h1 className="text-center text-gray-500">Empty</h1>
          )}
        </div>
      </Modal>
      <div className="bg-white dark:bg-gray-800 dark:text-[white] text-[#010101] pb-[10px]">
        <ul className="flex justify-between   p-4 md:w-[90%] w-[100%] mx-auto items-center">
          <li className="md:block hidden">
            <img
              src="/Foto/Home/logo.png"
              alt="logo"
              className="w-[166px] h-[48px] dark:invert"
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
              <Link to="/signup">Sign Up</Link>
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
            <Button onClick={toggleTheme} type="primary">
              {theme === "dark" ? "light" : "dark"} mode
            </Button>
            <li className="md:block hidden">
              {/* <Search
                onClick={showModal}
                placeholder="What are you looking for?"
                size="middle"
                enterButton
                className="w-64"
              /> */}
              <Button
                type="primary"
                onClick={showModal}
                enterButton
                icon={<SearchOutlined />}
                style={{
                  borderRadius: "10px",
                  width: "50px",
                  height: "40px",
                  padding: "0",
                }}
              />
            </li>
            <li className="md:block hidden cursor-pointer">
              <Link to="wishlist">
                <WishlistIcon />
              </Link>
            </li>

            <li className="cursor-pointer">
              <Link to="carts">
                {" "}
                <CartIcon />
              </Link>
            </li>
            <li className="cursor-pointer">
              <button
                id="basic-button"
                aria-controls={openn ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openn ? "true" : undefined}
                onClick={handleClick}
                className="cursor-pointer"
              >
                <PersonOutlineOutlinedIcon />
              </button>
            </li>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openn}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="/Profile">Profile </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={"/order"}> My Order</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="wishlist">
                  <button className="md:hidden block"> Wishlist</button>
                </Link>
              </MenuItem>
            </Menu>
            <Drawer
              title="Menu"
              placement="left"
              onClose={() => setOpen(false)}
              open={open}
              width={220}
            >
              <ul className="flex flex-col gap-4 text-[18px] font-[500] ">
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
                <li>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login
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
        <div className="block md:hidden">
          <Search
            onClick={showModal}
            placeholder="What are you looking for?"
            size="middle"
            enterButton
            className="w-64"
          />
        </div>
      </div>
      <Outlet />
      <div className="dark:bg-white bg-black dark:text-[#010101] text-[#FAFAFA] pt-[30px]  dark:border dark:border-black border-none">
        <div className="md:w-[90%] mx-auto w-[90%] flex md:flex-row gap-y-[32px] flex-col justify-between text-[16px] font-[400]">
          <div className="flex flex-col gap-y-[16px]">
            <h3 className="text-[24px] font-[700]">Exclusive</h3>
            <h4 className="text-[20px] font-[500]">Subscribe</h4>
            <p className="text-[16px] font-[400]">
              Get 10% off your first order
            </p>
            <Input
              placeholder="Enter your email"
              suffix={<SendOutlined style={{ color: "white" }} />}
              style={{
                backgroundColor: "black",
                color: "white",
                border: "1px solid white",
                width: 200,
              }}
            />
          </div>
          <div className="flex flex-col gap-y-[24px]">
            <h3 className="text-[20px] font-[500]">Support</h3>
            <h4>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</h4>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
          <div className="flex gap-[87px]">
            <div className="flex flex-col gap-y-[24px]">
              <h3 className="text-[20px] font-[500]">Account</h3>
              <h4>My Account</h4>
              <p>Cart</p>
              <p>Wishlist</p>
              <p>Shop</p>
            </div>
            <div className="flex flex-col gap-y-[24px]">
              <h3 className="text-[20px] font-[500]">Quick Link</h3>
              <h4>Privacy Policy</h4>
              <p>Terms Of Use</p>
              <p>FAQ</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-[24px]">
            <h3 className="text-[20px] font-[500]">Social </h3>
            <div className="flex gap-[24px] ">
              <p>
                <FacebookOutlined style={{ fontSize: "24px" }} />
              </p>
              <p>
                <TwitterOutlined style={{ fontSize: "24px" }} />
              </p>
              <p>
                <InstagramOutlined style={{ fontSize: "24px" }} />
              </p>
            </div>
          </div>
        </div>
        <p className="border-t-2 border-gray-700 text-gray-700 text-center mt-[30px] py-[25px]">
          @ Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Layout;
