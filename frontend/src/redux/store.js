import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notesReducer from "./notesSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: notesReducer,
        user: userReducer,
    },
});

export default store;