import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { inprogressList } from '../api/apiConfig';
import { NotifyError } from '../common/Toast/ToastMessage';

// Define TypeScript types
interface InprogressItem {
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
interface InprogressState {
    inprogressListData: InprogressItem[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: InprogressState = {
    inprogressListData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching inprogress list with pagination and search
export const fetchInprogressList = createAsyncThunk(
    'inprogress/fetchInprogressList',
    async (
        { status, searchQuery, currentPage }:
            { status: number; searchQuery: string; currentPage: number },
        // { rejectWithValue }
    ) => {
        try {
            const response = await inprogressList(status, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch inprogress list');
            NotifyError(error.message || "Failed to fetch inprogress list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const inprogressSlice = createSlice({
    name: 'inprogress',
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
            .addCase(fetchInprogressList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchInprogressList.fulfilled, (state, action) => {
                state.loading = false;
                state.inprogressListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            // .addCase(fetchInprogressList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchInprogressList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading } = inprogressSlice.actions;
export default inprogressSlice.reducer;
