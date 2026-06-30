import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const nameRegex = /^[A-Za-z ]{3,30}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!nameRegex.test(fullName)) {
      newErrors.fullName =
        "Name should contain only letters";
    }

    if (!emailRegex.test(email)) {
      newErrors.email =
        "Enter a valid email";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Must contain uppercase, lowercase, number and special character";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;

    try {

    const data =
        await registerUser({
        fullName,
        email,
        password
        });
    
    localStorage.setItem(
        "token",
        data.token
    );
    
    localStorage.setItem(
        "user",
        JSON.stringify(data)
    );
    
    navigate("/");
    
    }
    catch(error){
    
    alert(
        error.response?.data?.message ||
        "Signup Failed"
    );
    
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-lg p-5">

        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-md">
            <span className="text-white text-xl">
              👤
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mt-4">
          Join RentHub
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1">
          Start renting & listing today
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >

          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-3
            py-2.5
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
          />

          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName}
            </p>
          )}

          <label className="block text-sm font-medium mt-4 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-3
            py-2.5
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}

          <label className="block text-sm font-medium mt-4 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-3
            py-2.5
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
          />

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password}
            </p>
          )}

          <button
            type="submit"
            className="
            w-full
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            font-semibold
            py-2.5
            rounded-lg
            mt-6
            transition
            "
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?

          <Link
            to="/login"
            className="text-indigo-600 font-medium ml-1"
          >
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;