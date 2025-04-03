import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("/notes/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data.message || error.message);
    }
});

export const addNote = createAsyncThunk("notes/addNote", async (noteData, { rejectWithValue }) => {
    try {
        const response = await API.post("/notes/", noteData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data.message || error.message);
    }
});

const notesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addNote.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(addNote.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default notesSlice.reducer;
