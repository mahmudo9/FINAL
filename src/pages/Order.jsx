import React, { useEffect } from "react";
import {
  decrementToCart,
  Delete_All_from_Cart,
  deleteFromCart,
  getCart,
  incrementToCart,
} from "../app/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const Updating = () => dispatch(getCart());
  let product = data?.data && data?.data[0]?.productsInCart;
  const navigate = useNavigate();
  console.log(data?.data && data?.data[0].totalPrice);
  let sum = data?.data && data?.data[0].totalPrice;

  return (
    <div className="dark:bg-gray-800 dark:text-[white]">
      <div className="text-sm text-gray-500 mb-6 w-[95%] md:w-[90%] mx-auto">
        <span>Product</span> / <span>View Cart</span> /{" "}
        <span className="text-black">CheckOut</span>
      </div>
      <div className="flex justify-around w-[95%] md:w-[90%] mx-auto flex-col md:flex-row ">
        <div className="">
          <div className="w-full md:w-[510px] mb-[28px]">
            <h2 className="text-[36px] font-[500]">Billing Details</h2>
            <div className="flex p-[20px] shadow flex-col gap-y-[28px]">
              <input
                type="text"
                placeholder="First name"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <input
                type="text"
                placeholder="Last name"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <input
                type="text"
                placeholder="Street address"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <input
                type="text"
                placeholder="Apartment, floor, etc. (optional)"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <input
                type="text"
                placeholder="Town/City"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <input
                type="text"
                placeholder="Phone number"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <input
                type="text"
                placeholder="Email address"
                className="p-[12px] px-[36px] border border-[#0000003B] text-[#0000003B] rounded-[4px]"
              />
              <div className="flex gap-[20px] justify-center text-[#DB4444] text-[16px] font-[400]">
                <input type="checkbox" id="check" />
                <label htmlFor="check">
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[460px] md:mt-[100px] mb-[50px]">
          {product?.map((item) => (
            <tr
              key={item.id}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800  flex justify-between items-center px-[30px]"
              onClick={() =>
                navigate(
                  `/products/${item.id.replaceAll(" ", "&")}!${item.product.id}`
                )
              }
            >
              <td className="flex items-center gap-4 p-4">
                <img
                  src={`http://37.27.29.18:8002/images/${item?.product.image}`}
                  alt=""
                  className="size-[54px] object-contain mix-blend-multiply"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.png";
                  }}
                />
                <span className="text-black dark:text-white">
                  {item.product.productName || "No title"}
                </span>
              </td>

              <td className="text-center text-black dark:text-white">
                ${item.product.price || 0}
              </td>
            </tr>
          ))}
          <div className="flex justify-between pl-[40px] pr-[25px] mt-[20px]">
            <p className="text-[16px] font-[400]">Subtotal:</p>
            <p className="text-[14px] font-[400]">${sum}</p>
          </div>
          <div className="flex justify-between pl-[40px] pr-[25px] border-b border-[#000000]">
            <p className="text-[16px] font-[400]">Shipping::</p>
            <p className="text-[14px] font-[400]">Free</p>
          </div>
          <div className="flex justify-between pl-[40px] pr-[25px] mt-[20px]">
            <p className="text-[20px] font-[600]">Total:</p>
            <p className="text-[20px] font-[600]">${sum}</p>
          </div>
          <div className="flex justify-between pl-[40px] pr-[25px] mt-[20px]">
            <div>
              <input type="checkbox" id="bank" />
              <label htmlFor="bank" className="ml-[5px]">
                Bank
              </label>
            </div>
            <img
              src="/Foto/Home/bank.png"
              alt="Bank"
              className="w-[192px] h-[28px]"
            />
          </div>
          <div className="pl-[40px] pr-[25px] mt-[20px]">
            <input type="checkbox" id="cash" />
            <label htmlFor="cash" className="ml-[5px]">
              Cash on delivery
            </label>
          </div>
          <div className="w-[95%] md:w-[90%] mx-auto mt-[20px] flex justify-between mb-[20px]">
            <div className="flex items-center gap-[16px] text-[#DB4444] flex-col md:flex-row">
              <input
                type="text"
                className="rounded-[4px] border py-[16px] px-[48px] border-[#00000080] hover:border-[#DB4444] hover:text-[#DB4444]"
                placeholder="Coupon Code"
              />
              <button className="rounded-[4px] border py-[16px] px-[48px] w-full   border-[#DB4444] text-[#DB4444]">
                Apply
              </button>
            </div>
          </div>
          <div className="text-white ml-[23px]">
            <button
              className="rounded-[4px] border py-[16px] px-[48px] ml-[20px] cursor-pointer  bg-[#DB4444]"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(Delete_All_from_Cart()).then(() => Updating());
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
