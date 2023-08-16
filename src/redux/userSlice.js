import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoggedIn: false,
  loggedInUser: null,
  // nextUserId: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // const newUser = { ...action.payload, id: state.nextUserId };
      // state.nextUserId++;
      state.users?.push(action.payload);
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload;
    },
    clearLogin: (state) => {
      state.isLoggedIn = false;
      state.loggedInUser = null;
    },
  },
});

export const { addUser, loginSuccess, clearLogin, addToCart } = userSlice.actions;
export default userSlice.reducer;
