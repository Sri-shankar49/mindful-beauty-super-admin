import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { completedList } from '../api/apiConfig';
import { NotifyError } from '../common/Toast/ToastMessage';

// Define TypeScript types
interface CompletedItem {
    count: number;
    next: string | null;
    previous: string | null;
    id: string;
    date: string;
    time: string;
    phone: string;
    services: Service[];
    amount: string;
    status: string;
    status_id?: string;
    name: string;
    modify_status: string;
    location: string;
    stylist: string;
    stylist_id?: string;
    payment_status: string;
    provider_name: string;
}

interface Service {
    service_id: number;
    name: string;
    price: number;
}

// Define initial state
interface CompletedState {
    completedListData: CompletedItem[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: CompletedState = {
    completedListData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching completed list with pagination and search
export const fetchCompletedList = createAsyncThunk(
    'completed/fetchCompletedList',
    async (
        { status, searchQuery, currentPage, pageSize }:
            { status: number; searchQuery: string; currentPage: number, pageSize: number },
        // { rejectWithValue }
    ) => {
        try {
            const response = await completedList(status, searchQuery, currentPage, pageSize);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch completed list');
            NotifyError(error.message || "Failed to fetch completed list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const completedSlice = createSlice({
    name: 'completed',
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
        // setError: (state, action) => {
        //     state.error = action.payload;
        //     state.loading = false; // Reset loading on error
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompletedList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchCompletedList.fulfilled, (state, action) => {
                state.loading = false;
                state.completedListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            // .addCase(fetchCompletedList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchCompletedList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading } = completedSlice.actions;
export default completedSlice.reducer;
