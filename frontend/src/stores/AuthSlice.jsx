import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isLoggedIn: false,
    keepLoggedIn: false,
  },
  reducers: {
    setUserName: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.username = action.payload;
    },
    setKeepLoggedIn: (state, action) => {
      state.keepLoggedIn = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserName, setKeepLoggedIn, setIsLoggedIn } = authSlice.actions

export default authSlice.reducer