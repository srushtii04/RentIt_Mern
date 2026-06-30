const categories = [
    "All",
    "Electronics",
    "Tools",
    "Vehicles",
    "Sports",
    "Furniture",
    "Other",
  ];
  
  function CategoryFilter({
    selectedCategory,
    setSelectedCategory,
  }) {
    return (
      <div
        className="
        flex
        gap-2
        overflow-x-auto
        mt-4
        pb-2
        "
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`
            px-4
            py-2
            rounded-full
            border
            whitespace-nowrap
            text-sm
            transition
  
            ${
              selectedCategory === category
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-200"
            }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  
  export default CategoryFilter;