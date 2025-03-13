import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingsList } from '../api/apiConfig';
import { NotifyError } from '../common/Toast/ToastMessage';

// Define TypeScript types
interface AllbookingItem {
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
    stylist_photo?: string;
    payment_status: string;
    provider_name: string;
}

interface Service {
    service_id: number;
    name: string;
    price: number;
}

// Define initial state
interface AllbookingState {
    bookingListData: AllbookingItem[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: AllbookingState = {
    bookingListData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching booking list with pagination and search
export const fetchBookingList = createAsyncThunk(
    'allbooking/fetchBookingList',
    async (
        { searchQuery, currentPage, pageSize }:
            { searchQuery: string; currentPage: number, pageSize: number },
        // { rejectWithValue }
    ) => {
        try {
            const response = await bookingsList(searchQuery, currentPage, pageSize);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch booking list');
            NotifyError(error.message || "Failed to fetch booking list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const allbookingSlice = createSlice({
    name: 'allbooking',
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
            .addCase(fetchBookingList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchBookingList.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            // .addCase(fetchBookingList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchBookingList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading } = allbookingSlice.actions;
export default allbookingSlice.reducer;
