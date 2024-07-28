import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slice/weatherSlice";
import forecastSlice from "./slice/forecastSlice";
import pollutionSlice from "./slice/pollutionSlice";

export default configureStore({
  reducer: {
    weather: weatherSlice,
    forecast: forecastSlice,
    pollution: pollutionSlice,
  },
});
