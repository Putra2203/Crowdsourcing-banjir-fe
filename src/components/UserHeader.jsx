import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function UserHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="flex justify-end p-4 bg-white shadow">
      <button
        className="px-4 py-2 text-white bg-blue-800 rounded "
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}

export default UserHeader;
