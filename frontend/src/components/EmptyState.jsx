import { FiPackage } from "react-icons/fi";

function EmptyState() {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      h-[55vh]
      text-center
      "
    >
      <div
        className="
        bg-purple-100
        p-6
        rounded-3xl
        "
      >
        <FiPackage
          size={48}
          className="text-purple-600"
        />
      </div>

      <h2
        className="
        text-xl
        font-semibold
        mt-5
        "
      >
        No items available
      </h2>

      <p
        className="
        text-gray-500
        text-sm
        mt-2
        "
      >
        Be the first to post an item!
      </p>
    </div>
  );
}

export default EmptyState;