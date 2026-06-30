import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async(e) => {
    e.preventDefault();

    let newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Must contain uppercase, lowercase, number and special character";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try{

        const data =
            await loginUser({
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
            "Login Failed"
        );
    
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-lg p-5">

        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-md">
            <span className="text-white text-xl">
              ↪
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mt-4">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1">
          Sign in to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign In
          </button>

        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          Don't have an account?

          <Link
            to="/signup"
            className="text-indigo-600 font-medium ml-1"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;