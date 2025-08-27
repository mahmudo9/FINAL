import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WishlistIcon = () => {
  const items = useSelector((state) => state.wishlist.items);

  return (
    <IconButton>
      <Badge badgeContent={items?.length} color="error" className="dark:text-white"><FavoriteBorderIcon /></Badge>
    </IconButton>
  );
};

export default WishlistIcon;
