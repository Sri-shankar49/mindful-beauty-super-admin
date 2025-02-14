import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { reviewsList } from '../api/apiConfig';

// Define TypeScript types
interface ReviewRatingItem {
    count: number;
    next: string | null;
    previous: string | null;
    review_id: number;
    created_at: string;
    order_id: string;
    user_id: string;
    customer_name: string;
    rating: string | null;
    comment: string | null;
    service_objects: Services[];
}

interface Services {
    service_id: number;
    service_name: string;
}

// Define initial state
interface ReviewRatingState {
    reviewsListData: ReviewRatingItem[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: ReviewRatingState = {
    reviewsListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching review list with pagination and search
export const fetchReviewRatingsList = createAsyncThunk(
    'review/fetchReviewRatingsList',
    async (
        { searchQuery, currentPage }:
            { searchQuery: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await reviewsList(searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch review & ratings list');
        }
    }
);

// Create slice
const reviewSlice = createSlice({
    name: 'review',
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
            .addCase(fetchReviewRatingsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewRatingsList.fulfilled, (state, action) => {
                state.loading = false;
                state.reviewsListData = action.payload.results.data || [];
                state.totalItems = action.payload.count || 0;
            })
            .addCase(fetchReviewRatingsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading, setError } = reviewSlice.actions;
export default reviewSlice.reducer;
