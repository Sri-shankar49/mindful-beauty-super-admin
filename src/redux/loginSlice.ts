import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { verifyOTP } from "../api/apiConfig";

interface LoginState {
    phoneNumber: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    phoneNumber: null, // Ensure this is set
    loading: false,
    error: null,
};

// Thunk for OTP Validation
export const verifyOTPThunk = createAsyncThunk(
    "login/verifyOTP",
    async ({ phoneNumber, otp }: { phoneNumber: string; otp: number }, { rejectWithValue }) => {
        try {
            const response = await verifyOTP(phoneNumber, otp); // Call the API for OTP validation
            console.log("Login Response ==>", response);

            if (response.status === "success") {
                return {
                    token: response.token,
                    userId: response.user_id,
                };
            } else {
                return rejectWithValue(response.message || "Invalid OTP"); // Use API's message if available
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "OTP validation failed"); // Handle API errors
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload; // Set phone number in Redux state
        },
        logout: state => {
            state.phoneNumber = null;
            sessionStorage.removeItem('EnteredPhoneNumber');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOTPThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTPThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPhoneNumber, logout } = loginSlice.actions;
export default loginSlice.reducer;

