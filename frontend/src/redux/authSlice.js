import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Async action for registering a new user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await API.post("api/auth/register/", userData);

            if (response.data.status !== "success") {
                throw new Error(response.data.message || "Registration failed");
            }

            return {
                user_id: response.data.user_id,
                name: response.data.name,
                email: response.data.email,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

// ✅ Async action for logging in a user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await API.post("api/auth/login/", credentials);

            if (response.data.status !== "success") {
                throw new Error(response.data.message || "Login failed");
            }

            // Store token and user details in local storage
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
