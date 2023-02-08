import login from '@/services/user/loginServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
    'auth/login',
    async (email, password) => {
        const res = await login(email, password);
        return res;
    }
);

const initialState = {
    user: null,
    loading: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
        },
    },
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.loading = true;
        },
        [fetchUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.error = '';
                state.user = action.payload.data;
            } else {
                state.error = action.payload.data;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { logOut } = authSlice.actions;

export default authSlice.reducer;
