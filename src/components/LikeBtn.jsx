import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";

const LikeButton = ({ itemId, click }) => {
  const { items } = useSelector((state) => state.wishlist); 
  const [like, setLike] = React.useState(false);
  useEffect(() => {
    const find = items?.some(item => item.id === itemId)
    console.log(items)
    setLike(find)
  },[]);

  return (
    <button onClick={()=>{click(); setLike(!like)}} className="size-[40px] bg-white rounded-full">
      {like ? <FavoriteIcon className="text-[black] dark:text-[black] " /> : <FavoriteBorderIcon className="text-[black] dark:text-[black] " />}
    </button>
  );
};

export default LikeButton;
