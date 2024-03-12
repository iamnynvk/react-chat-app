import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatList = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const userList = useSelector((state) => state.user.data);
  const currentUser = useSelector((state) => state.user.loginUser);

  const filteredUserList = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user?.email !== currentUser?.email
  );

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Users Here..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>

      <ul>
        {filteredUserList.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer p-2 hover:bg-gray-300"
            onClick={() => onUserSelect(user)}
          >
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-xs font-light	">{user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
