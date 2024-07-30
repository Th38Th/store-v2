import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../stores/AuthSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})