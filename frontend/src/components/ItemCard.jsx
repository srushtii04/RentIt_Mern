import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ItemCard({ item }) {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
   
     <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      shadow cursor-pointer
      hover:shadow-xl
      transition
      duration-300
     "  onClick={() => navigate(`/item/${item._id}`)}
     >
   
      <img
       src={item.image}
       alt={item.title}
       className="
       h-48
       w-full
       object-cover
      "
      />
   
      <div className="p-4">
   
       {/* <h2
        className="
        font-semibold
        text-lg
       "
       >
         {item.title}
       </h2> */}

        <div className="flex justify-between items-start">

        <h2
        className="
        font-semibold
        text-lg
        "
        >
        {item.title}
        </h2>

        <span
        className={`
        px-2
        py-1
        rounded-full
        text-xs

        ${
        item.status === "available"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
        `}
        >
        {item.status}
        </span>

        </div>

       <p
            className="
            text-gray-500
            text-sm
            mt-2
            line-clamp-2
            "
            >
            {item.description}
        </p>
   
       <p
        className="
        text-gray-500
        text-sm
        mt-1
       "
       >
         {item.location}
       </p>
   
       <div className="flex justify-between items-center mt-3">
            <p className="text-purple-600 font-bold">
                ₹{item.pricePerDay}/day
            </p>

            {item.owner?._id === currentUser?._id && (
                <button
                className="
                text-red-500
                hover:text-red-700
                "
                >
                <FiTrash2 size={20} />
                </button>
            )}

        </div>
   
      </div>
   
     </div>
   
    );
   }
   
   export default ItemCard;