import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../../store/userMessagesSlice";

const ChatArea = ({ selectedUser }) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const currentUserId = useSelector((state) => state.user.loginUser);
  const intialMessages = useSelector(
    (state) =>
      state.userMessages.userMessages[
        currentUserId?.email && selectedUser?.email
      ] || []
  );
  const messages = intialMessages.filter((data) => {
    return (
      data?.id == currentUserId?.email || data?.sendTo == currentUserId?.email
    );
  });

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const ourMessage = {
      id: currentUserId.email,
      text: inputText,
      sender: "You",
      sendTo: selectedUser.email,
    };

    const senderMessage = {
      id: selectedUser?.email,
      sendTo: currentUserId?.email,
      sender: "From",
      text: inputText,
    };

    dispatch(addMessage({ email: selectedUser.email, message: ourMessage }));
    dispatch(
      addMessage({ email: currentUserId?.email, message: senderMessage })
    );
    dispatch(setMessages(ourMessage));
    dispatch(setMessages(senderMessage));
    showNotification("New Message", inputText);
    setInputText("");
  };

  return (
    <div className="flex-1 p-4">
      <div className="bg-gray-300 p-4 mb-4 rounded">
        {selectedUser && (
          <h2 className="text-lg font-bold">{selectedUser.name}</h2>
        )}
      </div>

      <div className="flex-1 border border-gray-300 p-4 mb-4 overflow-y-auto rounded">
        {messages.map((message) =>
          message.sender === "From" ? (
            <div key={message.id} className="mb-2">
              <strong>{selectedUser.username} : </strong>
              {message.text}
            </div>
          ) : (
            <div key={message.id} className="mb-2 justify-end text-end">
              {message.text}
              <strong> : {message.sender}</strong>
            </div>
          )
        )}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2.5 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
