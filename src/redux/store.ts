import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";             // Use localStorage as the default storage


import loginReducer from "../redux/loginSlice";              // Adjust the path as needed
import allbookingReducer from './allbookingSlice'
import scheduleReducer from './scheduleSlice'
import inprogressReducer from './inprogressSlice'
import completedReducer from './completedSlice'
import cancelledReducer from './cancelledSlice'

// Persist configuration
const persistConfig = {
    key: "root", // Key for localStorage
    storage, // Use localStorage
    whitelist: ["login"], // Only persist login state
};

// Combine reducers
const rootReducer = combineReducers({
    login: loginReducer,
    allbooking: allbookingReducer,
    schedule: scheduleReducer,
    inprogress: inprogressReducer,
    completed: completedReducer,
    cancelled: cancelledReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Configure store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Ignore Redux Persist non-serializable warnings
            ignoredActions: [
                'persist/PERSIST',
                'persist/REHYDRATE',
                'persist/PAUSE',
                'persist/FLUSH',
                'persist/PURGE',
                'persist/REGISTER',
            ],
        }),
});



// Configure the Redux store
// export const store = configureStore({
//     reducer: {
//         login: loginReducer,
//     },
// });

// Create persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
