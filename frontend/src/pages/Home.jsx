import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import BottomNav from "../components/BottomNav";
import { getItems} from "../services/itemService";
import ItemCard from "../components/ItemCard";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [items,setItems] = useState([]);

  const [searchTerm, setSearchTerm] =
  useState("");

  // const filteredItems =
  //   selectedCategory === "All"
  //   ? items
  //   : items.filter(
  //       item =>
  //       item.category ===
  //       selectedCategory
  //     );

  const filteredItems = items.filter((item) => {

    const categoryMatch =
      selectedCategory === "All" ||
      item.category === selectedCategory;
  
    const searchMatch =
      item.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );
  
    return (
      categoryMatch &&
      searchMatch
    );
  
  });

  useEffect(() => {

    const fetchItems =
    async () => {
   
      const data =
      await getItems();
   
      const user =
      JSON.parse(
       localStorage.getItem(
         "user"
       )
      );
   
      const filtered =
      data.filter(
       item =>
       item.owner._id !== user._id
      );
   
      setItems(filtered);
    };
   
    fetchItems();
   
   },[]);

  return (
    <div
      className="
      min-h-screen
      bg-[#f7f5fb]
      pb-20
      "
    >
      <Navbar />

      <div className="px-4 py-3">

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <CategoryFilter
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
        />

        {filteredItems.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            mt-5
            "
          >
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
             />
            ))}
          </div>
        )}

      </div>

      <BottomNav />
    </div>
  );
}

export default Home;