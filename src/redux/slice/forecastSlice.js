import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import owmApi from "../../api/owmApi";

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (params, { rejectWithValue }) => {
    try {
      const response = await owmApi.getForecast5days({ params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forecast5days = createSlice({
  name: "forecast",
  initialState: {
    forecastData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecastData = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default forecast5days.reducer;
