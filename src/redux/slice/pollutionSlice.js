import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import owmApi from "../../api/owmApi";

export const fetchAirPollution = createAsyncThunk(
  "airPollution/fetchAirPollution",
  async (params, { rejectWithValue }) => {
    try {
      const response = await owmApi.getAirPollution({ params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const airPollution = createSlice({
  name: "pollution",
  initialState: {
    airPollutionData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirPollution.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAirPollution.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.airPollutionData = action.payload;
      })
      .addCase(fetchAirPollution.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default airPollution.reducer;
