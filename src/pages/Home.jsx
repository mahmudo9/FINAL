import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../app/productSlise";
import { Link } from "react-router-dom";
import { getCategory } from "../app/categorySlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Arrival from "../components/Arrival";
import LikeButton from "../components/LikeBtn";
import { Snackbar, Alert } from "@mui/material";
import { toggleItem } from "../app/wishlistSlice";
import { addProduct } from "../app/cartSlice";
const Home = () => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    productName: "",
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const [randomRating] = useState(() => Math.floor(Math.random() * 5) + 1);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  // const products = [

  //   {
  //     id: 1,
  //     name: "HAVIT HV-G92 Gamepad",
  //     price: 120,
  //     oldPrice: 160,
  //     discount: 40,
  //     rating: 4,
  //     reviews: 88,
  //     image: "/Foto/Home/joystik.png",
  //   },
  //   {
  //     id: 2,
  //     name: "AK-900 Wired Keyboard",
  //     price: 960,
  //     oldPrice: 1160,
  //     discount: 35,
  //     rating: 4,
  //     reviews: 75,
  //     image: "/Foto/Home/joystik.png",
  //   },
  //   {
  //     id: 3,
  //     name: "IPS LCD Gaming Monitor",
  //     price: 370,
  //     oldPrice: 400,
  //     discount: 30,
  //     rating: 5,
  //     reviews: 99,
  //     image: "/Foto/Home/joystik.png",
  //   },
  //   {
  //     id: 4,
  //     name: "S-Series Comfort Chair",
  //     price: 375,
  //     oldPrice: 400,
  //     discount: 25,
  //     rating: 4,
  //     reviews: 99,
  //     image: "/Foto/Home/joystik.png",
  //   },
  //   {
  //     id: 5,
  //     name: "S-Series Comfort Chair",
  //     price: 375,
  //     oldPrice: 400,
  //     discount: 25,
  //     rating: 4,
  //     reviews: 99,
  //     image: "/Foto/Home/joystik.png",
  //   },
  // ];
  const { data } = useSelector((state) => state.product);
  const products = data?.data?.products || [];
  // console.log("products:", products);
  const { data: categoryData } = useSelector((state) => state.category);
  const categories = categoryData?.data || [];
  const { items } = useSelector((state) => state.wishlist);
  // console.log("category:", categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);

  const handleSaveDate = () => {
    const now = new Date().toISOString();
    dispatch(setDate(now));
    alert("Дата сохранена!");
  };
  const handleLikeClick = (product) => {
    setSnackbarInfo({ open: true, productName: product.productName });
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-[white] text-[#010101]">
      <div className="w-[95%] md:w-[90%] mx-auto flex justify-between flex-col md:flex-row items-center mb-[100px] gap-y-[40px]">
        <div className="flex md:flex-col flex-wrap gap-3 py-6 border-r-0 md:border-r-2 pr-6">
          {[
            "Woman's Fashion",
            "Men's Fashion",
            "Electronics",
            "Home & Lifestyle",
            "Medicine",
            "Sports & Outdoor",
            "Baby's & Toys",
            "Groceries & Pets",
            "Health & Beauty",
          ].map((item, i) => (
            <p
              key={i}
              className="relative text-[16px] cursor-pointer px-4 py-2 rounded-md
                   transition-all duration-200
                   bg-gray-100 dark:bg-gray-800 
                   text-black dark:text-white
                   hover:bg-blue-100 dark:hover:bg-blue-900 
                   hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between"
            >
              {item}
              {(i === 0 || i === 1) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mt-[2px] ml-[3px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              )}
            </p>
          ))}
        </div>
        <Carousel
          autoplay={{ dotDuration: true }}
          autoplaySpeed={3000}
          className="bg-[#000000] dark:bg-white text-[#fafafa] dark:text-[#010101] max-w-[390px] md:max-w-[1060px] w-full py-[28px] px-[16px] md:px-[50px]"
        >
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i}>
              <div className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-[400px] text-center md:text-left gap-y-6">
                <div className="w-full md:w-[390px]">
                  <div className="flex justify-center md:justify-start gap-4 items-center mb-4">
                    <img
                      src="/Foto/Home/apple.png"
                      alt="apple"
                      className="w-[30px] h-[40px] dark:bg-black "
                    />
                    <p className="text-[16px] md:text-[18px] font-[400]">
                      iPhone 14 Series
                    </p>
                  </div>
                  <h2 className="text-[28px] md:text-[55px] font-[600] leading-tight">
                    Up to 10% off Voucher
                  </h2>
                  <Button type="link" size="large" className="mt-4">
                    Shop Now <b className="ml-[16px]">{">"}</b>
                  </Button>
                </div>
                <img
                  src="/Foto/Home/iphone.png"
                  alt="iPhone"
                  className="w-full max-w-[300px] md:max-w-[496px] h-auto mx-auto dark:invert"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-[95%] md:w-[90%] mx-auto">
        <span className="flex items-center text-red-500 font-semibold  ml-0 md:ml-[23px] justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Today's
        </span>
        <div className="flex w-full pb-[30px]">
          <div className="w-full flex justify-between items-center px-0 md:px-6 py-4 flex-col md:flex-row ">
            <div className="flex space-x-6  mt-0 md:mt-4 font-bold text-2xl items-center flex-col md:flex-row gap-y-4">
              <h2 className="text-[36px] font-[600] text-center md:text-left md:mr-[58px]">
                Flash Sales
              </h2>
              <div className="flex space-x-6">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-normal">Days</span>
                  <span>{timeLeft.days.toString().padStart(2, "0")}</span>
                </div>
                <span className="text-red-500">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-normal">Hours</span>
                  <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
                </div>
                <span className="text-red-500">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-normal">Minutes</span>
                  <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
                </div>
                <span className="text-red-500">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-normal">Seconds</span>
                  <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              {" "}
              <button
                ref={prevRef}
                className="translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center shadow"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                ref={nextRef}
                className=" translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center shadow"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
          setSwiperReady(true);
        }}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          1080: { slidesPerView: 4.25 },
          768: { slidesPerView: 2.5 },
          425: { slidesPerView: 1.5 },
        }}
        className="mySwiper"
      >
        <div className="w-full md:w-[90%] mx-auto flex justify-between items-center">
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="w-[100%] md:w-[270px]  shadow rounded-[4px] mx-auto hover:shadow-mqd transition my-[10px] md:hover:scale-[1.1] duration-300">
                <div className="w-full bg-[#F5F5F5] p-[20px] relative group">
                  <div className="absolute top-[12px] right-[4px] flex flex-col gap-[8px] z-10 ">
                    <LikeButton
                      itemId={product.id}
                      click={() =>
                        dispatch(
                          toggleItem({ id: product.id, name: product.name })
                        )
                      }
                    />

                    <button className="bg-white dark:text-black   rounded-full shadow hover:scale-110 transition cursor-pointer size-[40px]">
                      <Link to={`/product/${product.id}`}>
                        <VisibilityIcon className="text-[black] dark:text-[black] " fontSize="medium" />
                      </Link>
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded ">
                    -{product.discountPrice}%
                  </div>
                  <img
                    src={`http://37.27.29.18:8002/images/${product.image}`}
                    alt={product.productName}
                    className="w-[190px] h-[180px] object-contain mt-[20px] pb-[20px] *:md:mt-0 mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                  />
                  <div
                    className="absolute  left-0 p-[5px] bottom-0 cursor-pointer bg-black text-white w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"
                    onClick={() => {
                      dispatch(addProduct(product.id));
                      alert("Add to Cart!");
                    }}
                  >
                    Add to Cart
                  </div>
                </div>
                <div className="px-[10px] py-[5px]">
                  <h3 className="text-sm font-semibold mb-1">
                    {product.productName}
                  </h3>
                  <div className="text-red-600 font-bold text-lg flex items-center gap-[12px]">
                    ${product.price}{" "}
                    <span className="line-through text-gray-400 text-sm">
                      ${product.discountPrice}
                    </span>
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <div className="text-[#FFAD33] text-[20px] mt-1">
                      {"★".repeat(randomRating)}
                      {"☆".repeat(5 - randomRating)}
                    </div>
                    <p className=" text-gray-400 font-[600]">
                      ({product.quantity})
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {/* <Snackbar
        open={snackbarInfo.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
          severity="success"
          sx={{ width: "100%" }}
        >
          Товар <b>{snackbarInfo.productName}</b> добавлен в избранное!
        </Alert>
      </Snackbar> */}

      <div className="flex justify-center">
        <button className="py-[16px] px-[48px] rounded-[4px] bg-[#DB4444] text-white mb-[100px] mt-[40px] ">
          <Link to="/Products">View All Products</Link>
        </button>
      </div>

      <div className="mt-[50px] w-[95%] md:w-[90%]  mx-auto">
        <span className="flex items-center text-red-500 font-semibold  ml-0 justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Categories
        </span>
        <h2 className=" text-[36px] font-[600] mt-4 text-black text-center md:text-left">
          Browse By Category
        </h2>
        <div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              425: { slidesPerView: 3 },
              768: { slidesPerView: 3.5 },
              1080: { slidesPerView: 5.5 },
            }}
          >
            {categories?.slice(0, 6).map((category) => (
              <SwiperSlide key={category.id}>
                <div className="  max-w-[170px] h-[145px] border my-[50px] rounded-[4px] border-[#0000004D] flex flex-col justify-center hover:bg-[#DB4444] hover:text-white hover:shadow hover:border-[#DB4444] hover:scale-[1.1] cursor-auto hover:duration-300">
                  {" "}
                  <img
                    loading="lazy"
                    src={
                      category.categoryImage
                        ? `http://37.27.29.18:8002/images/${category.categoryImage}`
                        : "/default-image.png"
                    }
                    alt={category.categoryName}
                    className="w-[56px] h-[56px] object-contain mt-[20px] pb-[20px] *:md:mt-0 mx-auto transition-transform duration-300 group-hover:scale-105 dark:invert hover:brightness-0 hover:invert"
                  />
                  <h4 className="text-[18px] font-[500] text-center">
                    {category.categoryName}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-[50px] w-[95%] md:w-[90%]  mx-auto">
        <span className="flex items-center text-red-500 font-semibold  ml-0 justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Categories
        </span>
        <div className="flex justify-between flex-col md:flex-row items-center">
          <h2 className=" text-[36px] font-[600] mt-4 text-black text-center md:text-left">
            Best Selling Products
          </h2>
          <Link to="/Products">
            <button className="py-[12px] px-[48px] bg-[#DB4444] text-white rounded-[4px]">
              View All
            </button>
          </Link>
        </div>
        <Swiper
          spaceBetween={10}
          loop={false}
          breakpoints={{
            1080: { slidesPerView: 4 },
            768: { slidesPerView: 2.5 },
            425: { slidesPerView: 1.5 },
          }}
          className="mySwiper mb-[30px]"
        >
          <div className="w-full md:w-[90%] mx-auto flex justify-between items-center ">
            {products?.slice(0, 4).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="w-[100%] md:w-[270px]  shadow border-b  rounded-[4px] mx-auto hover:shadow-mqd transition my-[50px] md:hover:scale-[1.1] duration-300">
                  <div className="w-full bg-[#F5F5F5] p-[20px] relative group">
                    <div className="absolute top-[12px] right-[4px] flex flex-col gap-[8px] z-10 ">
                      <button className="bg-white w-[34px] h-[34px] pt-[3px] pb-[5px] px-[5px] rounded-full shadow hover:scale-110 transition cursor-pointer">
                        <FavoriteBorderIcon fontSize="medium" />
                      </button>
                      <button className="bg-white w-[34px] h-[34px] pt-[3px] pb-[5px] px-[5px]  rounded-full shadow hover:scale-110 transition cursor-pointer">
                        <VisibilityIcon fontSize="medium" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded ">
                      -{product.discountPrice}%
                    </div>
                    <img
                      src={`http://37.27.29.18:8002/images/${product.image}`}
                      alt={product.productName}
                      className="w-[190px] h-[180px] object-contain mt-[20px] pb-[20px] *:md:mt-0 mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                    />
                    <div className="absolute  left-0 p-[5px] bottom-0 cursor-pointer bg-black text-white w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                      Add to Cart
                    </div>
                  </div>
                  <div className="px-[10px] py-[5px]">
                    <h3 className="text-sm font-semibold mb-1">
                      {product.productName}
                    </h3>
                    <div className="text-red-600 font-bold text-lg flex items-center gap-[12px]">
                      ${product.price}{" "}
                      <span className="line-through text-gray-400 text-sm">
                        ${product.discountPrice}
                      </span>
                    </div>
                    <div className="flex gap-[8px] items-center">
                      <div className="text-[#FFAD33] text-[20px] mt-1">
                        {"★".repeat(randomRating)}
                        {"☆".repeat(5 - randomRating)}
                      </div>
                      <p className=" text-gray-400 font-[600]">
                        ({product.quantity})
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      <div className="w-[100%] md:w-[90%] mx-auto bg-[#000000] px-[20px] md:px-[50px] py-[20px] flex flex-col md:flex-row justify-baseline  mb-[50px]">
        <div className="w-[95%] md:w-[48%]">
          <p className="text-[#00FF66]">Categories</p>
          <h2 className="text-[#fafafa] text-[28px] font-[600] md:text-[60px] md:font-[900] mt-[30px]">
            Enhance Your Music Experience
          </h2>
          <img
            src="/Foto/Home/time.png"
            alt=""
            className="w-[320px] h-[62px] my-[50px]"
          />
          <button className="bg-[#00FF66] py-[12px] cursor-pointer px-[48px] rounded-[4px]">
            Buy Now!
          </button>
        </div>
        <img
          src="/Foto/Home/kolonka.png"
          alt=""
          className="w-[95%] md:w-[48%] h-[320px] md:h-[420px]"
        />
      </div>

      <div className="w-[95%] md:w-[90%] mx-auto mt-[50px]">
        <span className="flex items-center text-red-500 font-semibold  ml-0 md:ml-[23px] justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Our Products
        </span>
        <div className="flex w-full pb-[30px]">
          <div className="w-full flex justify-between items-center px-0 md:px-6 py-4 flex-col md:flex-row ">
            <div className="flex space-x-6  mt-0 md:mt-4 font-bold text-2xl items-center flex-col md:flex-row gap-y-4">
              <h2 className="text-[36px] font-[600] text-center md:text-left md:mr-[58px]">
                Explore Our Products
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex flex-wrap hidden md:w-[90%] mx-auto gap-[36px]">
        {products?.slice(0, 8).map((product) => (
          <div
            key={product.id}
            className="w-[100%] md:w-[270px]  shadow rounded-[4px] mx-auto hover:shadow-mqd transition my-[10px] md:hover:scale-[1.1] duration-300"
          >
            <div className="w-full bg-[#F5F5F5] p-[20px] relative group">
              <div className="absolute top-[12px] right-[4px] flex flex-col gap-[8px] z-10 ">
                <button className="bg-white w-[34px] dark:text-black h-[34px] pt-[3px] pb-[5px] px-[5px] rounded-full shadow hover:scale-110 transition cursor-pointer">
                  <FavoriteBorderIcon fontSize="medium" />
                </button>
                <button className="bg-white dark:text-black w-[34px] h-[34px] pt-[3px] pb-[5px] px-[5px]  rounded-full shadow hover:scale-110 transition cursor-pointer">
                  <VisibilityIcon fontSize="medium" />
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded ">
                -{product.discountPrice}%
              </div>
              <img
                src={`http://37.27.29.18:8002/images/${product.image}`}
                alt={product.productName}
                className="w-[190px] h-[180px] object-contain mt-[20px] pb-[20px] *:md:mt-0 mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
              />
              <div className="absolute  left-0 p-[5px] bottom-0 cursor-pointer bg-black text-white w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                Add to Cart
              </div>
            </div>
            <div className="px-[10px] py-[5px]">
              <h3 className="text-sm font-semibold mb-1">
                {product.productName}
              </h3>
              <div className="text-red-600 font-bold text-lg flex items-center gap-[12px]">
                ${product.price}{" "}
                <span className="line-through text-gray-400 text-sm">
                  ${product.discountPrice}
                </span>
              </div>
              <div className="flex gap-[8px] items-center">
                <div className="text-[#FFAD33] text-[20px] mt-1">
                  {"★".repeat(randomRating)}
                  {"☆".repeat(5 - randomRating)}
                </div>
                <p className=" text-gray-400 font-[600]">
                  ({product.quantity})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden flex md:w-[90%] mx-auto gap-[36px] overflow-x-auto">
        {products?.map((product) => (
          <div
            key={product.id}
            className="w-[300px] md:w-[270px]  shadow rounded-[4px] mx-auto hover:shadow-mqd transition my-[10px] hover:scale-[1.1] duration-300"
          >
            <div className="w-[300px] bg-[#F5F5F5] p-[20px] relative group">
              <div className="absolute top-[12px] right-[4px] flex flex-col gap-[8px] z-10 ">
                <button className="bg-white w-[34px] dark:text-black h-[34px] pt-[3px] pb-[5px] px-[5px] rounded-full shadow hover:scale-110 transition cursor-pointer">
                  <FavoriteBorderIcon fontSize="medium" />
                </button>
                <button className="bg-white dark:text-black w-[34px] h-[34px] pt-[3px] pb-[5px] px-[5px]  rounded-full shadow hover:scale-110 transition cursor-pointer">
                  <VisibilityIcon fontSize="medium" />
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded ">
                -{product.discountPrice}%
              </div>
              <img
                src={`http://37.27.29.18:8002/images/${product.image}`}
                alt={product.productName}
                className="w-[190px] h-[180px] object-contain mt-[20px] pb-[20px] *:md:mt-0 mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
              />
              <div className="absolute  left-0 p-[5px] bottom-0 cursor-pointer bg-black text-white w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                Add to Cart
              </div>
            </div>
            <div className="px-[10px] py-[5px]">
              <h3 className="text-sm font-semibold mb-1">
                {product.productName}
              </h3>
              <div className="text-red-600 font-bold text-lg flex items-center gap-[12px]">
                ${product.price}{" "}
                <span className="line-through text-gray-400 text-sm">
                  ${product.discountPrice}
                </span>
              </div>
              <div className="flex gap-[8px] items-center">
                <div className="text-[#FFAD33] text-[20px] mt-1">
                  {"★".repeat(randomRating)}
                  {"☆".repeat(5 - randomRating)}
                </div>
                <p className=" text-gray-400 font-[600]">
                  ({product.quantity})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="py-[16px] px-[48px] rounded-[4px] bg-[#DB4444] text-white mb-[100px] mt-[40px] ">
          <Link to="/Products">View All Products</Link>
        </button>
      </div>

      <div className="w-[95%] md:w-[90%] mx-auto mt-[50px]">
        <span className="flex items-center text-red-500 font-semibold  ml-0 md:ml-[23px] justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Featured
        </span>
        <div className="flex w-full pb-[30px]">
          <div className="w-full flex justify-between items-center px-0 md:px-6 flex-col md:flex-row ">
            <div className="flex space-x-6  mt-0 md:mt-4 font-bold text-2xl items-center flex-col md:flex-row gap-y-4">
              <h2 className="text-[36px] font-[600] text-center md:text-left md:mr-[58px]">
                New Arrival
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-[15px] w-[95%] md:w-[90%] mx-auto mb-[50px]">
        <div
          className="relative md:col-span-2 md:row-span-2 bg-black p-6 bg-cover "
          style={{
            backgroundImage: `url('/Foto/Home/ps5.png')`,
            minHeight: "600px",
          }}
        >
          <div className="absolute bottom-6 left-6 max-w-[320px] text-white ">
            <h3 className="text-2xl font-semibold">PlayStation 5</h3>
            <p className="my-2 text-sm font-normal">
              Black and White version of the PS5 <br />
              coming out on sale.
            </p>
            <span className="text-base font-medium border-b border-white w-[80px] inline-block cursor-pointer">
              Shop Now
            </span>
          </div>
        </div>

        <div
          className="relative md:col-span-2 bg-black p-6 bg-cover"
          style={{
            backgroundImage: `url('/Foto/Home/wemen.png')`,
            minHeight: "280px",
          }}
        >
          <div className="absolute bottom-6 left-6 text-white  max-w-[400px]">
            <h3 className="text-lg font-semibold mb-2">Women’s Collections</h3>
            <p className="text-sm font-normal mb-2">
              Featured woman collections that give you another vibe.
            </p>
            <span className="text-base font-medium border-b border-white w-[80px] inline-block cursor-pointer">
              Shop Now
            </span>
          </div>
        </div>

        <div
          className="relative bg-black p-6 bg-cover "
          style={{
            backgroundImage: `url('/Foto/Home/speakers.png')`,
            minHeight: "280px",
          }}
        >
          <div className="absolute bottom-6 left-6 text-white  max-w-[200px]">
            <h3 className="text-lg font-semibold mb-2">Speakers</h3>
            <p className="text-sm font-normal mb-2">Amazon wireless speakers</p>
            <span className="text-base font-medium border-b border-white w-[80px] inline-block cursor-pointer">
              Shop Now
            </span>
          </div>
        </div>

        <div
          className="relative bg-black p-6 bg-cover"
          style={{
            backgroundImage: `url('/Foto/Home/perfume.png')`,
            minHeight: "280px",
          }}
        >
          <div className=" absolute bottom-6 left-6 text-white  max-w-[200px]">
            <h3 className="text-lg font-semibold mb-2">Perfume</h3>
            <p className="text-sm font-normal mb-2">GUCCI INTENSE OUD EDP</p>
            <span className="text-base font-medium border-b border-white w-[80px] inline-block cursor-pointer">
              Shop Now
            </span>
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[90%] mx-auto mt-[50px] pt-[60px]  flex justify-around flex-col md:flex-row pb-[200px]">
        <div className="w-full md:w-[249px] h-[161px] flex flex-col gap-y-[12px] text-center ">
          <img
            src="/Foto/Home/gruz.png"
            alt=""
            className="w-[90px] h-[90px] mx-auto"
          />
          <h3 className="text-[24px] font-[700] linear-[28px]">
            FREE AND FAST DELIVERY
          </h3>
          <p className="font-[400] text-[18px] style-[regular]">
            Free delivery for all orders over $140
          </p>
        </div>
        <div className="w-full md:w-[249px] h-[161px] flex flex-col gap-y-[12px] text-center">
          <img
            src="/Foto/Home/nauw.png"
            alt=""
            className="w-[90px] h-[90px] mx-auto"
          />
          <h3 className="text-[24px] font-[700] linear-[28px]">
            24/7 CUSTOMER SERVICE
          </h3>
          <p className="font-[400] text-[18px] style-[regular]">
            Friendly 24/7 customer support
          </p>
        </div>
        <div className="w-full md:w-[249px] h-[161px] flex flex-col gap-y-[12px] text-center">
          <img
            src="/Foto/Home/wit.png"
            alt=""
            className="w-[90px] h-[90px] mx-auto"
          />
          <h3 className="text-[24px] font-[700] linear-[28px]">
            MONEY BACK GUARANTEE
          </h3>
          <p className="font-[400] text-[18px] style-[regular]">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
