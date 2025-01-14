import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import image from "../assets/889_v2f2zxmtmdi.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://web-production-6d7c3.up.railway.app/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;

      console.log(token, user);

      login(token, user.id);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center bg-[#94DAFF] lg:w-96 w-72 rounded-lg">
        <img src={image} alt="" className="object-cover h-20 " />
        <form
          onSubmit={handleLogin}
          className="p-6 bg-white rounded-lg shadow-md "
        >
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button className="w-full p-2 text-white bg-blue-500 rounded">
            Login
          </button>
          <p className="mt-4 text-right hover:underline">
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
