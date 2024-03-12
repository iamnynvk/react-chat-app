import React, { useState } from "react";
import ChatList from "../components/chat/ChatList";
import ChatArea from "../components/chat/ChatArea";
import Navbar from "../components/common/Navbar";

function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <Navbar isShowUser={true} />
      <div className="flex h-screen">
        <ChatList onUserSelect={handleUserSelect} />
        {selectedUser && <ChatArea selectedUser={selectedUser} />}
      </div>
    </div>
  );
}

export default Dashboard;
