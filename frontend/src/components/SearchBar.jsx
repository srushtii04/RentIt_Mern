import { FiSearch } from "react-icons/fi";

function SearchBar({
  searchTerm,
  setSearchTerm
}) {
  return (
    <div className="mt-4 relative">

      <FiSearch
        size={20}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
      />

      <input
        type="text"
        placeholder="Search for items to rent..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="
        w-full
        bg-white
        rounded-xl
        border
        border-gray-200
        pl-12
        pr-4
        py-3
        text-sm
        outline-none
        focus:ring-2
        focus:ring-purple-500
        "
      />
    </div>
  );
}

export default SearchBar;