// appointmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GETAPPOINTMENTS_URL = 'http://localhost:3000/users';
const CANCELAPPOINTMENT_URL = 'http://localhost:3000/appointment/cancel';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${GETAPPOINTMENTS_URL}/${userId}`);
      return response.data.appointments; // Asegúrate de extraer la lista de turnos
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (appointmentId, thunkAPI) => {
    try {
      const response = await axios.put(`${CANCELAPPOINTMENT_URL}/${appointmentId}`);
      return response.data; // La respuesta debe contener el turno actualizado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAppointments = (state) => state.appointments.appointments;

export default appointmentsSlice.reducer;
