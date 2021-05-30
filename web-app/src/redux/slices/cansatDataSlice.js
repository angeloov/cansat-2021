import { createSlice } from "@reduxjs/toolkit";

export const cansatDataSlice = createSlice({
  name: "cansatData",
  initialState: {
    isAbleToReplay: true,
    altitudeDatapoints: [0],
    labels: [0],
    seconds: 0,
    temperature: 0,
    humidity: 0,
    pressure: 0,
    altitude: 0,
  },
  reducers: {
    populateCansatState: (state, action) => {
      const { seconds, temperature, humidity, pressure, altitude } = action.payload;

      state.seconds = seconds;
      state.temperature = temperature;
      state.humidity = humidity;
      state.pressure = pressure;
      state.altitude = altitude;

      state.altitudeDatapoints = state.altitudeDatapoints.concat([altitude]);

      const lastIndex = state.labels.length - 1;
      state.labels = state.labels.concat([state.labels[lastIndex] + 1]);
    },
  },
});

// Action creators are generated for each case reducer function
export const { populateCansatState } = cansatDataSlice.actions;

export default cansatDataSlice.reducer;
