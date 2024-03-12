import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/common/Navbar";

function Profile() {
  const userList = useSelector((state) => state.user.data);
  const currentUser = useSelector((state) => state.user.loginUser);

  const getUserData = userList.filter((item) => {
    return item?.email === currentUser?.email;
  });

  return (
    <div>
      <Navbar isShowUser={false} />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{getUserData[0].name}</h2>
            <p className="text-gray-600">@{getUserData[0].username}</p>
          </div>

          <div>
            <p className="text-gray-700">
              <strong>Email:</strong> {getUserData[0].email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {getUserData[0].phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
