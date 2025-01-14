import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/889_v2f2zxmtmdi.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://web-production-6d7c3.up.railway.app/api/users/register", {
        email,
        password,
        name,
        phone
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-[#94DAFF] lg:w-96 w-72 rounded-lg">
        <img src={image} alt="" className="object-cover h-20" />
        <form
          onSubmit={handleRegister}
          className="p-6 bg-white rounded-lg shadow-md "
        >
          <h2 className="mb-4 text-2xl font-bold">Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Number Phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
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
            Register
          </button>
          <p className="mt-4 text-right hover:underline">
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
