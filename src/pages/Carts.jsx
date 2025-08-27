import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decrementToCart,
  Delete_All_from_Cart,
  deleteFromCart,
  getCart,
  incrementToCart,
} from "../app/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toggleItem } from "../app/wishlistSlice";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getProduct } from "../app/productSlise";
import LikeButton from "../components/LikeBtn";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomRating] = useState(() => Math.floor(Math.random() * 5) + 1);
  const { data, loading } = useSelector((state) => state.cart);
  const { data: productData } = useSelector((state) => state.product);
  const { items } = useSelector((state) => state.wishlist);

  const products = productData?.data?.products || [];

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCart());
  }, [dispatch]);

  let product = data?.data && data?.data[0]?.productsInCart;
  let sum = 0;

  const Updating = () => dispatch(getCart());
  return (
    <div className="dark:bg-gray-800 dark:text-[white]">
      <div className="text-sm text-gray-500 mb-6 w-[95%] md:w-[90%] mx-auto">
        <span>Home</span> / <span className="text-black">Cart</span>
      </div>

      {product?.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg w-[95%] md:w-[90%] mx-auto">
          Empty Cart
        </div>
      ) : (
        <table className="w-[95%] md:w-[90%] mx-auto my-[30px] py-[30px] border-gray-300 border-separate border-spacing-y-3 overflow-x-auto block md:table">
          <thead className="mb-[100px] block md:table-header-group">
            <tr className="block md:table-row">
              <th className="text-left md:text-center px-2 md:px-0 md:table-cell">
                Product
              </th>
              <th className="text-left md:text-center px-2 md:px-0 md:table-cell">
                Price
              </th>
              <th className="text-left md:text-center px-2 md:px-0 md:table-cell">
                Quantity
              </th>
              <th className="text-left md:text-center px-2 md:px-0 md:table-cell">
                Subtotal
              </th>
              <th className="text-left md:text-center px-2 md:px-0 md:table-cell">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="p-[20px] block md:table-row-group">
            {product?.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 shadow block md:table-row"
                onClick={() =>
                  navigate(
                    `/products/${item.id.replaceAll(" ", "&")}!${
                      item.product.id
                    }`
                  )
                }
              >
                <td className="flex items-center gap-4 p-4 md:table-cell block md:flex md:items-center md:gap-4">
                  <img
                    src={`http://37.27.29.18:8002/images/${item?.product.image}`}
                    alt=""
                    className="size-[54px] object-contain mix-blend-multiply w-14 h-14"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                  <span className="text-black dark:text-white">
                    {item.product.productName || "No title"}
                  </span>
                </td>

                <td className="text-center text-black dark:text-white md:table-cell block px-2 py-2">
                  ${item.product.price || 0}
                </td>

                <td className="text-center md:table-cell block px-2 py-2">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg"
                  >
                    <button
                      onClick={() => {
                        item.quantity > 1 &&
                          dispatch(decrementToCart(item.id)).then(() =>
                            Updating()
                          );
                      }}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-l-lg"
                    >
                      –
                    </button>
                    <span className="px-4 text-black dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        dispatch(incrementToCart(item.id)).then(() =>
                          Updating()
                        );
                      }}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="text-center text-black dark:text-white md:table-cell block px-2 py-2">
                  ${(item.product.price || 0) * (item.quantity || 1)}
                </td>
                <p style={{ display: "none" }}>
                  {(sum += (item.product.price || 0) * (item.quantity || 1))}
                </p>

                <td className="text-center md:table-cell block px-2 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteFromCart(item.id)).then(() => Updating());
                    }}
                    className="text-white bg-red-500 hover:bg-red-600 rounded-full px-3 py-1"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <button className="rounded-[4px] border py-[16px] px-[48px] border-[#00000080] hover:border-[#DB4444] hover:text-[#DB4444] w-full md:w-auto text-center">
          <Link to="/products">Return To Shop</Link>
        </button>
        <div className="flex gap-4 justify-center md:justify-start flex-wrap">
          <button
            className="rounded-[4px] border py-[16px] px-[48px] border-[#00000080] hover:border-[#DB4444] hover:text-[#DB4444]"
            onClick={() => dispatch(Updating())}
          >
            Update Cart
          </button>
          <button
            className="rounded-[4px] border py-[16px] px-[48px] border-[#00000080] hover:border-[#DB4444] hover:text-[#DB4444]"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(Delete_All_from_Cart()).then(() => Updating());
            }}
          >
            Remove all
          </button>
        </div>
      </div>

      <div className="w-[95%] md:w-[90%] mx-auto mt-[70px] flex flex-col md:flex-row justify-between mb-[70px] gap-4 md:gap-0">
        <div className="flex items-center gap-[16px] justify-center md:justify-start flex-wrap">
          <input
            type="text"
            className="rounded-[4px] border py-[16px] px-[48px] border-[#00000080] hover:border-[#DB4444] hover:text-[#DB4444] w-full md:w-auto"
            placeholder="Coupon Code"
          />
          <button className="rounded-[4px] border py-[16px] px-[48px] border-[#00000080] hover:border-[#DB4444] hover:text-[#DB4444]">
            Apply
          </button>
        </div>
        <div className="border-2 rounded-[4px] py-[22px] px-[20px] border-black md:w-[478px]">
          <h3 className="text-[20px] font-[500]">Cart Total</h3>
          <div className="flex justify-between border-b border-gray-300 py-4">
            <b className="text-[16px] font-[400] text-black">Subtotal:</b>
            <p className="text-[16px] font-[400]">${sum.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b border-gray-300 py-4">
            <b className="text-[16px] font-[400] text-black">Shipping:</b>
            <p className="text-[16px] font-[400]">Free</p>
          </div>
          <div className="flex justify-between items-center border-gray-300 py-4">
            <b className="text-[20px] font-[600] text-black">Total:</b>
            <p className="text-[16px] font-[400]">${sum.toFixed(2)}</p>
          </div>
          <button className="rounded-[4px]  w-full border py-[16px] px-[48px] bg-[#DB4444] text-white">
            Apply
          </button>
        </div>
      </div>

      <div className="w-[95%] md:w-[90%] mx-auto mt-[50px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <span className="flex items-center text-[20px] font-[400] text-red-500 ml-0 md:ml-[23px] justify-center md:justify-normal">
          <span className="w-3 h-6 bg-red-500 rounded mr-2"></span>
          Just For You
        </span>
        <button className="py-[16px] px-[48px] border border-[#00000080] rounded-[4px] text-[16px] font-[500] cursor-pointer w-full md:w-auto text-center">
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
        <div className="w-full md:w-[90%] mx-auto flex justify-between items-center flex-wrap">
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="w-[100%] md:w-[270px] shadow rounded-[4px] mx-auto hover:shadow-mqd transition my-[10px] md:hover:scale-[1.1] duration-300">
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

                    <button className="bg-white dark:text-black rounded-full shadow hover:scale-110 transition cursor-pointer size-[40px]">
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
                    className="absolute left-0 p-[5px] bottom-0 cursor-pointer bg-black text-white w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"
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

export default Carts;
