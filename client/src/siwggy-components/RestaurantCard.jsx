import { Link } from "react-router-dom";
import burgerImg from "../assets/burgerImg.png";
import cafeImg from "../assets/cafemochaImg.png";
import chaatImg from "../assets/chaatImg.png";
import dosaImg from "../assets/dosaImg.png";
import kebabImg from "../assets/kebabImg.png";
import pizzaImg from "../assets/pizzaImg.png";
import noodlesImg from "../assets/noodlesImg.png";
import pitahouseImg from "../assets/pitahouseImg.png";
import sushiImg from "../assets/sushiImg.png";
import thaliImg from "../assets/thaliImg.png";
import wafflesImg from "../assets/wafflesImg.png";
import sweetImg from "../assets/sweettoothImg.png";
import defaultImg from "../assets/logo.png";

const cuisineImageMap = {
  pizzas: pizzaImg,
  burgers: burgerImg,
  cafe: cafeImg,
  desserts: sweetImg,
  chinese: noodlesImg,
  "south indian": dosaImg,
  kerala: dosaImg,
  arabian: kebabImg,
  biryani: kebabImg,
  snacks: chaatImg,
  beverages: cafeImg,
  bakery: wafflesImg,
  mexican: pitahouseImg,
  thali: thaliImg,
  sushi: sushiImg
};

function RestaurantCard({ resData }) {

  const {
    resId,
    name,
    cuisines,
    costForTwo,
    rating,
    locality,
    areaName,
    deliveryTime
  } = resData;

  const getCuisineImage = (cuisines = []) => {
    for (let cuisine of cuisines) {
      const key = cuisine.toLowerCase();
      if (cuisineImageMap[key]) {
        return cuisineImageMap[key];
      }
    }
    return defaultImg;
  };

  const cuisineImage = getCuisineImage(cuisines);

  return (
    <Link to={`/restaurant/${resId}`}>

      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer">

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={cuisineImage}
            alt="food"
            className="w-full h-48 object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">

          <h3 className="text-[#2B2B2B] font-semibold text-lg">
            {name}
          </h3>

          <p className="text-[#5E5E5E] text-sm">
            {locality}, {areaName}
          </p>

          <p className="text-[#5E5E5E] text-sm line-clamp-1">
            {cuisines?.join(", ")}
          </p>

          {/* Rating + Delivery */}
          <div className="flex justify-between items-center pt-2">

            <span className="bg-[#F55951] text-white text-sm px-3 py-1 rounded-md font-semibold">
              ⭐ {rating}
            </span>

            <span className="text-[#5E5E5E] text-sm">
              🛵 {deliveryTime} mins
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default RestaurantCard;