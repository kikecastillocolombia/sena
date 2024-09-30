import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    auth: authReducer,
  },
});

export default store;
