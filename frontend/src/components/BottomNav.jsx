import {
    FiBox,
    FiPlus,
    FiUser,
  } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
  
  function BottomNav() {
    const navigate = useNavigate();
    return (
      <div
        className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        flex
        justify-around
        py-2
        z-50
        "
      >
        <div
          className="
          flex
          flex-col
          items-center
          text-purple-600
          text-sm
          "
        >
          <FiBox size={22} />
          <span>Browse</span>
        </div>
  
        <div
          className="
          flex
          flex-col
          items-center
          text-sm
          " onClick={() =>
            navigate("/post")
           }
        >
          <div
            className="
            bg-purple-600
            text-white
            rounded-full
            p-2
            "
          >
            <FiPlus size={20} />
          </div>
  
          <span>Post</span>
        </div>
  
        <div
          className="
          flex
          flex-col
          items-center
          text-sm
          " onClick={() => navigate("/profile")}
        >
          <FiUser size={22} />
          <span>Profile</span>
        </div>
      </div>
    );
  }
  
  export default BottomNav;