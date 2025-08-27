import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../app/productSlise";
import { getCategory } from "../app/categorySlice";

import "antd/dist/reset.css";
import { Slider } from "antd";

const Products = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.product);
  const { data: categoryData, selectedCategory } = useSelector(
    (state) => state.category
  );

  const allProducts = data?.data?.products || [];
  const categories = categoryData?.data || [];

  const [range, setRange] = useState([0, 10000]);
  const [isOpen, setIsOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  const products = allProducts.filter((product) => {
    const categoryMatch =
      selectedCategory === "All products" || !selectedCategory
        ? true
        : product.categoryName?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase();

    const price = product.price || 0;
    const priceMatch = price >= range[0] && price <= range[1];

    return categoryMatch && priceMatch;
  });

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const handleMinChange = (e) => {
    const val = Number(e.target.value);
    if (val <= range[1]) {
      setRange([val, range[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const val = Number(e.target.value);
    if (val >= range[0]) {
      setRange([range[0], val]);
    }
  };

  return (
    <div>
      <div className="text-sm text-gray-500 mb-6 w-[95%] md:w-[90%] mx-auto flex justify-between items-center">
        <div>
          <span>Home</span> /{" "}
          <span className="text-black">Explore Our Products</span>
        </div>
        <div>
          <select
            className="px-[32px] border border-[#0000003B] py-[12px]"
            name=""
            id=""
          >
            <option value="">Popularity</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between flex-col md:flex-row w-[95%] md:w-[90%] mx-auto ">
        <div className="chap w-full md:w-[240px]">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center cursor-pointer mb-2 border-b pb-2"
          >
            <h3 className="text-[16px] font-[600] text-[#1C1C1C]">Category</h3>
            <span>{isOpen ? "▲" : "▼"}</span>
          </div>

          {isOpen && (
            <div className="flex flex-col gap-2 w-[95%] md:w-[90%] text-left">
              <p
                onClick={() =>
                  dispatch({
                    type: "category/setSelectedCategory",
                    payload: "All products",
                  })
                }
                className={`cursor-pointer text-[#505050] mt-1 ${
                  selectedCategory === "All products" ? "text-[#DB4444]" : ""
                }`}
              >
                All products
              </p>

              {displayedCategories.map((category) => (
                <p
                  key={category.id}
                  onClick={() =>
                    dispatch({
                      type: "category/setSelectedCategory",
                      payload: category.categoryName,
                    })
                  }
                  className={`cursor-pointer text-[#505050] ${
                    selectedCategory === category.categoryName
                      ? "text-[#DB4444]"
                      : ""
                  }`}
                >
                  {category.categoryName}
                </p>
              ))}

              {categories.length > 4 && (
                <p
                  onClick={() => setShowAll((prev) => !prev)}
                  className="cursor-pointer text-[#DB4444] mt-1"
                >
                  {showAll ? "Show less" : "See all"}
                </p>
              )}
            </div>
          )}

          <div
            style={{
              width: 280,

              borderRadius: 8,
              marginTop: 20,
            }}
          >
            <h3>Price range</h3>
            <Slider
              range
              min={0}
              max={16000}
              value={range}
              onChange={handleRangeChange}
              allowCross={false}
              step={10}
            
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <input
                type="number"
                value={range[0]}
                onChange={handleMinChange}
                style={{ width: "45%", padding: 5 }}
                min={0}
                max={range[1]}
              />
              <input
                type="number"
                value={range[1]}
                onChange={handleMaxChange}
                style={{ width: "45%", padding: 5 }}
                min={range[0]}
                max={16000}
              />
            </div>
          </div>
        </div>

        {/* Блок с продуктами */}
        <div className="flex w-[100%] md:w-[870px] flex-wrap gap-y-[32px] md:mt-[0px] mt-[50px]">
          {products.map((product) => {
            const randomRating = Math.floor(Math.random() * 5) + 1; // Рейтинг для каждого продукта

            return (
              <div
                key={product.id}
                className="w-[100%] md:w-[270px] shadow rounded-[4px] mx-auto hover:shadow-mqd transition"
              >
                <div className="w-full bg-[#F5F5F5] p-[20px] relative group">
                  <div className="absolute top-[12px] right-[4px] flex flex-col gap-[8px] z-10 ">
                    <button className="bg-white w-[34px] h-[34px] pt-[3px] pb-[5px] px-[5px] rounded-full shadow hover:scale-110 transition cursor-pointer">
                      <FavoriteBorderIcon fontSize="medium" />
                    </button>
                    <button className="bg-white w-[34px] h-[34px] pt-[3px] pb-[5px] px-[5px]  rounded-full shadow hover:scale-110 transition cursor-pointer">
                      <VisibilityIcon fontSize="medium" />
                    </button>
                  </div>

                  {product.hasDiscount && product.discountPrice > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded ">
                      -{product.discountPrice}
                    </div>
                  )}

                  <img
                    src={`http://37.27.29.18:8002/images/${product.image}`}
                    alt={product.productName}
                    className="w-[190px] h-[180px] object-contain mt-[20px] pb-[20px] *:md:mt-0 mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                  />
                  <div className="absolute left-0 p-[5px] bottom-0 cursor-pointer bg-black text-white w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                    Add to Cart
                  </div>
                </div>
                <div className="px-[10px] py-[5px]">
                  <h3 className="text-sm font-semibold mb-1">
                    {product.productName}
                  </h3>
                  <div className="text-red-600 font-bold text-lg flex items-center gap-[12px]">
                    ${product.price}{" "}
                    {product.hasDiscount && (
                      <span className="line-through text-gray-400 text-sm">
                        ${product.discountPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <div className="text-[#FFAD33] text-[20px] mt-1">
                      {"★".repeat(randomRating)}
                      {"☆".repeat(5 - randomRating)}
                    </div>
                    <p className="text-gray-400 font-[600]">
                      ({product.quantity})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm text-gray-600">Color:</label>
                    <input
                      type="color"
                      defaultValue={product.color}
                      className="w-8 h-8 p-0 border-none rounded-4xl bg-transparent cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-[50px] ml-[330px] md:ml-[1450px]"
        onClick={() => window.scrollTo(0, 0)}
      >
        UP
      </button>
    </div>
  );
};

export default Products;
