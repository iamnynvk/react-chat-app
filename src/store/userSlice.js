import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  currentUser: false,
  loginUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList(state, action) {
      state.data.push(action.payload);
    },
    setIsCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setLoginUser(state, action) {
      state.loginUser = action.payload;
    },
  },
});

export const {
  setUserList,
  setIsCurrentUser,
  setLoginUser,
  setMessages,
  addMessage,
} = userSlice.actions;
export default userSlice.reducer;
