import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightBookingAppStateSlice, flightBookingFeatureKey, FlightBookingState } from './flight-booking.reducer';

export const selectFlightBookingState = 
  createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);

export const selectFlights3 = createSelector(
  selectFlightBookingState,
  fbs => fbs.flights
);

export const selectSkipList = createSelector(
  selectFlightBookingState,
  fbs => fbs.skipList
);

export const selectFilteredFlights = createSelector(
  selectFlights3,
  selectSkipList,
  (flights, skipList) => flights.filter(f => !skipList.includes(f.id))
);

export const selectFlights = 
  (appState: FlightBookingAppStateSlice) => 
    appState[flightBookingFeatureKey].flights;

export const selectFlights2 = createSelector(
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].skipList,
  (flights, skipList) => flights.filter(f => !skipList.includes(f.id))
);

export function selectFlightsWithSkipList(skipList: number[]) {
  return createSelector(
    (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
    (flights) => flights.filter(f => !skipList.includes(f.id))
  );
}
