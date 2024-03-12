import React from "react";
import { useDispatch } from "react-redux";
import { setIsCurrentUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isShowUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsCurrentUser(false));
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-4">Messaging Dashboard</h1>

        {isShowUser && (
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
          >
            <img
              src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
              alt="User Profile"
              className="w-6 h-6 object-cover rounded-full"
            />
          </button>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
