import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userMessages: {},
};

const userMessagesSlice = createSlice({
  name: "userMessages",
  initialState,
  reducers: {
    setMessages(state, action) {
      const { email, messages } = action.payload;
      state.userMessages[email] = messages;
    },
    addMessage(state, action) {
      const { email, message } = action.payload;

      if (!state.userMessages[email]) {
        state.userMessages[email] = [];
      }

      state.userMessages[email].push(message);
    },
  },
});

export const { setMessages, addMessage } = userMessagesSlice.actions;
export default userMessagesSlice.reducer;
