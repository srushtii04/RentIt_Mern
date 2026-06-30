import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      className="
      bg-white
      shadow-sm
      px-4
      lg:px-6
      py-3
      flex
      justify-between
      items-center
      "
    >
      <h1
        className="
        text-2xl
        lg:text-3xl
        font-bold
        text-purple-600
        "
      >
        RentHub
      </h1>

      <div className="flex items-center gap-3">
        <button
          className="
          border
          rounded-full
          px-3
          py-2
          flex
          items-center
          gap-2
          text-sm
          "
        >
          <FiUser />
          {user?.fullName || "User"}
        </button>

        <button onClick={handleLogout}>
          <FiLogOut
            size={22}
            className="
            text-red-500
            hover:text-red-700
            "
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;