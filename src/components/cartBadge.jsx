import Badge from "@mui/material/Badge";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../app/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const products = data?.data && data?.data[0]?.productsInCart;
  const cartCount = Array.isArray(products) ? products.length : 0;

  return (
    <IconButton>
      <Badge badgeContent={cartCount} color="error" className="dark:text-white">
        <LocalGroceryStoreOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
