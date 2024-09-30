import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3000/users/login', userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Error desconocido' });
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message || 'Error al iniciar sesión';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
