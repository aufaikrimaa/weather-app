import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import owmApi from "../../api/owmApi";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (params, { rejectWithValue }) => {
    try {
      const response = await owmApi.getCurrentWeather({ params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const currentWeather = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default currentWeather.reducer;
