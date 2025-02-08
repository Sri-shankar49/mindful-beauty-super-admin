import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


import { Provider } from "react-redux"; // Import Redux Provider
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.ts"; // Import store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
