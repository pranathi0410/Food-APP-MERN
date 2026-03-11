import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

function Body() {
  const [inputText, setInputText] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  function handleSearch() {
    if (inputText.trim() === "") {
      setDisplayList(restaurantList);
      return;
    }

    const filtered = restaurantList.filter((restaurant) =>{
      restaurant.name.toLowerCase().includes(inputText.toLowerCase())
  });
    setDisplayList(filtered);
    console.log(displayList,"heyyyyyy")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/restaurants/");
        if (!res.ok) throw new Error("Server error");

        const restaurants = await res.json();

        setRestaurantList(restaurants);
        setDisplayList(restaurants);
      } catch (err) {
        console.log("Error fetching restaurants:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#EDEDED] min-h-screen text-[#2B2B2B]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={inputText}
            placeholder="Search for restaurants..."
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white px-5 py-3 rounded-xl outline-none border border-gray-300 focus:border-[#F55951] transition"
          />

          <button
            onClick={handleSearch}
            className="bg-[#F55951] hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm"
          >
            Search 
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {restaurantList.length === 0 ? (
          <Shimmer />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayList.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id + "-" + index}
                resData={restaurant}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;