import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../app/productSlise";
import { getCategory } from "../app/categorySlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toggleItem } from "../app/wishlistSlice";
import LikeButton from "../components/LikeBtn";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

const Whishlist = () => {
  const { data } = useSelector((state) => state.product);
  const products = data?.data?.products || [];
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);
  const [randomRating] = useState(() => Math.floor(Math.random() * 5) + 1);

  return (
    <div className="dark:bg-gray-800 dark:text-[white]">
      <div className="flex w-[95%] md:w-[86%] mx-auto justify-between items-center mb-[32px]">
        <h4 className=" flex text-[20px] font-[400]  items-center ">
          Wishlist (<p>{items.length}</p>)
        </h4>
        <button className="py-[16px] px-[48px] border border-[#00000080] rounded-[4px] text-[16px] font-[500] cursor-pointer">
          Move All To Bag
        </button>
      </div>{" "}
      <Swiper
        spaceBetween={10}
        breakpoints={{
          1080: { slidesPerView: 4.25 },
          768: { slidesPerView: 2.5 },
          425: { slidesPerView: 1.5 },
        }}
        className="mySwiper mb-[50px]"
      >
        <div className="w-full flex flex-wrap md:w-[90%] mx-auto justify-between items-center mb-[30px]">
          {products
            ?.filter((product) => items.some((item) => item.id === product.id))
            .map((product) => (
              <SwiperSlide key={product.id}>
                <div className="w-[100%] md:w-[270px]  shadow rounded-[4px] mx-auto hover:shadow-mqd transition my-[10px] md:hover:scale-[1.1] duration-300">
                  <div
                    key={product.id}
                    className="w-full bg-[#F5F5F5] p-[20px] relative group"
                  >
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
      <div className="w-[95%] md:w-[90%] mx-auto mt-[50px] flex justify-between items-center">
        <span className="flex items-center text-[20px] font-[400] text-red-500   ml-0 md:ml-[23px] justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Just For You
        </span>
        <button className="py-[16px] px-[48px] border border-[#00000080] rounded-[4px] text-[16px] font-[500] cursor-pointer">
          <Link to="/products">See All</Link>
        </button>
      </div>
      <Swiper
        spaceBetween={10}
        breakpoints={{
          1080: { slidesPerView: 4.25 },
          768: { slidesPerView: 2.5 },
          425: { slidesPerView: 1.5 },
        }}
        className="mySwiper mb-[50px]"
      >
        <div className="w-full md:w-[90%] mx-auto flex justify-between items-center ">
          {products
            ?.filter((item, ind) =>
              ind < 4 ? item : Math.ceil(Math.random() * 5) === 2 ? true : false
            )
            ?.filter(item => !items.some(i => i.id === item.id))
            .map((product) => (
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
  );
};

export default Whishlist;
