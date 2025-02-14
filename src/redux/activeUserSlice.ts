import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProvidersList } from '../api/apiConfig';

// Define TypeScript types
interface ActiveUserItem {
    count: number;
    next: string | null;
    previous: string | null;
    salon_id: number;
    salon_name: string;
    email: string;
    mobile: string;
    owner_name: string | null;
    location: string | null;
}

// Define initial state
interface ActiveUserState {
    activeUserData: ActiveUserItem[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: ActiveUserState = {
    activeUserData: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching active User list with pagination and search
export const fetchActiveUserList = createAsyncThunk(
    'activeUser/fetchActiveUserList',
    async (
        { status, searchQuery, currentPage }:
            { status: string; searchQuery: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetchProvidersList(status, searchQuery, currentPage);
            console.log("Active Users Data log:", response);

            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch active users list');
        }
    }
);

// Create slice
const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Reset loading on error
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.activeUserData = action.payload.results.data || [];
                state.totalItems = action.payload.count || 0;
            })
            .addCase(fetchActiveUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading, setError } = activeUserSlice.actions;
export default activeUserSlice.reducer;
