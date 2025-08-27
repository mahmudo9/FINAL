import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../app/productByID";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import {
  addProduct,
  decrementToCart,
  deleteFromCart,
  incrementToCart,
} from "../app/cartSlice";
import { toggleItem } from "../app/wishlistSlice";
import LikeButton from "../components/LikeBtn";
import { getProduct } from "../app/productSlise";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [randomRating] = useState(() => Math.floor(Math.random() * 5) + 1);
  const [selectedColor, setSelectedColor] = useState("");

  const { dataById } = useSelector((state) => state.productByIdReducer) || {};

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id)).then((item) => {
        const images = item?.payload?.data?.images;
        if (images?.length > 0) {
          setSelectedImage(images[0].images);
        }
      });
    }
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  const Updating = () => dispatch(getProductById(id));
  const { data: productData } = useSelector((state) => state.product);
  const { items } = useSelector((state) => state.wishlist);

  const products = productData?.data?.products || [];

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!dataById) {
    return (
      <div className="flex justify-center items-center h-screen text-[100px] bg-white dark:bg-black text-black dark:text-white">
        Loading...
      </div>
    );
  }

  let product = dataById.data;
  console.log(product);

  return (
    <div>
      <div>
        <div className="text-sm text-gray-500 mb-6 w-[95%] md:w-[90%] mx-auto">
          <span>Главная</span> / Игры /{" "}
          <span className="text-black">Мой аккаунт</span>
        </div>
      </div>

      <div className="w-[95%] md:w-[90%] mx-auto my-[30px] py-[30px] flex flex-col md:flex-row gap-[70px] gap-y-[20px]">
        <div className="flex md:gap-[30px] md:h-[600px] flex-col md:flex-row h-auto gap-y-[10px]">
          <div className="w-[320px] md:w-[170px] md:mx-0  mx-auto md:h-[600px] md:order-1 order-2 ">
            {product?.images?.length > 0 && (
              <Swiper
                direction={isMobile ? "horizontal" : "vertical"}
                slidesPerView={4}
                spaceBetween={10}
                className={isMobile ? "h-[78px]" : "h-full"}
              >
                {product.images.map((img, ind) => (
                  <SwiperSlide
                    key={ind}
                    onClick={() => setSelectedImage(img.images)}
                    className={`cursor-pointer border rounded-[4px]  bg-[#F5F5F5] dark:bg-gray-800 pt-[15px]  overflow-hidden ${
                      selectedImage === img.images
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={"http://37.27.29.18:8002/images/" + img.images}
                      onError={(e) => {
                        e.target.src = "/images/image.png";
                      }}
                      alt={`thumb-${ind}`}
                      className="w-[50px] h-[47px] md:w-[121px] md:h-[114px] object-contain mx-auto my-auto mix-blend-multiply "
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="md:w-[500px] w-[320px] h-[320px] md:mx-0 mx-auto  md:h-[600px] rounded-[4px] justify-center bg-gray-200 dark:bg-gray-800 order-1  md:order-1  flex items-center">
            <Image
              src={"http://37.27.29.18:8002/images/" + selectedImage}
              fallback="/images/image.png"
              className="w-full h-full object-contain mix-blend-multiply md:w-[446px] md:h-[315px]"
              alt={product?.productName}
            />
          </div>
        </div>
        <div className="w-full md:w-[400px]">
          <h1 className="text-[24px] font-[500] text-[#000000]">
            {product?.productName}
          </h1>
          <div>
            <div className="text-[#FFAD33] text-[20px] mt-1 flex gap-[16px] items-center">
              {"★".repeat(randomRating)}
              {"☆".repeat(5 - randomRating)}
              <p className="text-gray-500 font-[400] text-[18px]">
                ({product?.quantity})
              </p>
            </div>
            <p></p>
          </div>
          <h4 className="font-[700] text-[24px] text-[#000000] line">
            ${product?.price}.00
          </h4>
          <p className="text-[#00000099] text-[14px] font-[400] pb-[10px] border-b-2 mb-[15px] border-[#000000]">
            {product?.description}
          </p>
          {product?.color && (
            <div className="flex gap-4 items-center">
              <p className="text-[20px] text-gray-500 dark:text-gray-400">
                Color:{" "}
              </p>
              <div className="flex gap-2">
                <label
                  onClick={() => setSelectedColor(product?.color)}
                  className="relative border-black dark:border-white border-2 rounded-full w-5 h-5 cursor-pointer"
                >
                  <div
                    className="w-full bg-inherit h-full rounded-full"
                    style={{
                      borderColor: product?.color,
                      borderWidth: "3px",
                    }}
                  />
                  <div
                    className="absolute inset-[4px] rounded-full transition-opacity pointer-events-none"
                    style={{
                      backgroundColor: product?.color,
                      opacity: selectedColor === product?.color ? 1 : 0,
                    }}
                  />
                </label>
              </div>
            </div>
          )}
          <div className="my-[20px] flex items-center gap-[18px]">
            {product?.productInMyCart && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => {
                    product?.productInfoFromCart?.quantity > 1 &&
                      dispatch(
                        decrementToCart(product?.productInfoFromCart?.id)
                      ).then(() => Updating());
                  }}
                  className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-l-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Decrement"
                >
                  –
                </button>

                <span className="px-6 py-2 text-black dark:text-white select-none">
                  {product?.productInfoFromCart?.quantity}
                </span>

                <button
                  onClick={() => {
                    dispatch(
                      incrementToCart(product?.productInfoFromCart?.id)
                    ).then(() => Updating());
                  }}
                  className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Increment"
                >
                  +
                </button>

                <button
                  onClick={() => {
                    dispatch(
                      deleteFromCart(product?.productInfoFromCart?.id)
                    ).then(() => {
                      Updating();
                      alert("Delete From Cart");
                    });
                  }}
                  className="ml-3 px-8 py-4 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg transition-colors"
                  aria-label="Удалить из корзины"
                  title="Delete from Carm"
                >
                  🗑️
                </button>
              </div>
            )}

            {!product?.productInMyCart && (
              <button
                className="px-[48px] py-[10px] rounded-[4px] hover:bg-[#DB4444] hover:text-white  border hover:border-0"
                onClick={() => {
                  dispatch(addProduct(product.id));
                  alert("Добавлено в корзину!");
                }}
              >
                Buy Now
              </button>
            )}
            <div className="border rounded-[4px] p-1 px-1.5">
              <LikeButton
                itemId={product.id}
                click={() =>
                  dispatch(toggleItem({ id: product.id, name: product.name }))
                }
              />
            </div>
          </div>

          <div className=" border-[#00000080] flex flex-col rounded-[4px]">
            <div className="flex gap-[16px]  w-[100%] items-center p-[20px] border rounded-t-[4px] dark:bg-[#121212]  dark:border-gray-700">
              <img
                src="/Foto/Home/dostavka.png"
                alt=""
                className="dark:invert w-[40px] h-[40px]"
              />
              <div>
                <h4 className="text-[16px] font-[500] text-[#000000] dark:text-white">
                  Free Delivery
                </h4>
                <p className="text-[12px] font-[500] text-[#000000] dark:text-white">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex gap-[16px]  w-[100%] items-center p-[20px] border rounded-b-[4px] dark:bg-[#121212]  dark:border-gray-700">
              <img
                src="/Foto/Home/return.png"
                alt=""
                className="dark:invert w-[40px] h-[40px]"
              />
              <div>
                <h4 className="text-[16px] font-[500] text-[#000000] dark:text-white">
                  Return Delivery
                </h4>
                <p className="text-[12px] font-[500] text-[#000000] dark:text-white">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          {products.map((product) => (
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
                        <VisibilityIcon fontSize="medium" />
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
                      alert("Добавлено в корзину!");
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
    </div>
  );
};

export default ProductById;
