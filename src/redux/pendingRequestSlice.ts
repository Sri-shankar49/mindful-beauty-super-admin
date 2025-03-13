import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProvidersList } from '../api/apiConfig';
import { NotifyError } from '../common/Toast/ToastMessage';

// Define TypeScript types
interface PendingRequestItem {
    count: number;
    next: string | null;
    previous: string | null;
    salon_id: number;
    salon_name: string;
    email: string;
    mobile: string;
    owner_name: string | null;
    location: string | null;
    service_type_id: number;
    service_type_name: string;
}

// Define initial state
interface PendingRequestState {
    pendingRequestData: PendingRequestItem[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    serviceTypeID: number; // Add serviceTypeID
    currentPage: number;
    totalItems: number;
}

const initialState: PendingRequestState = {
    pendingRequestData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    serviceTypeID: 0, // Default to "All"
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching pending request list with pagination and search
export const fetchPendingRequestList = createAsyncThunk(
    'pendingRequest/fetchPendingRequestList',
    async (
        { status, searchQuery, currentPage, pageSize, serviceTypeID }:
            { status: string; searchQuery: string; currentPage: number, pageSize: number, serviceTypeID: number },
        // { rejectWithValue }
    ) => {
        try {
            const response = await fetchProvidersList(status, searchQuery, currentPage, pageSize, serviceTypeID);
            console.log("Pending Request Data log:", response);

            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch Pending Request list');3
            NotifyError(error.message || "Failed to fetch Pending Request list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const pendingRequestSlice = createSlice({
    name: 'pendingRequest',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setServiceTypeID(state, action: PayloadAction<number>) { // ✅ Add this
            state.serviceTypeID = action.payload;
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
            .addCase(fetchPendingRequestList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchPendingRequestList.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingRequestData = action.payload.results.data || [];
                state.totalItems = action.payload.count || 0;
            })
            // .addCase(fetchPendingRequestList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchPendingRequestList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setServiceTypeID, setCurrentPage, setLoading } = pendingRequestSlice.actions;
export default pendingRequestSlice.reducer;
