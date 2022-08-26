import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import { ObjectUnsubscribedError } from 'rxjs';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppStateSlice {
  [flightBookingFeatureKey]: FlightBookingState;
} 

export interface FlightBookingState {
  flights: Flight[];
  skipList: number[]; 
  basket: object;
  stats: object;

  // Normalized
  // passenger: {
  //   id: number;
  //   name: string;
  //   tickets: number[];
  // },
  // tickets: {
  //   id: number;
  //   preis: number;
  //   flight: number;
  // }

}

export const initialState: FlightBookingState = {
  flights: [],
  skipList: [4],
  basket: {},
  stats: {}
};

export const reducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),

  on(updateFlight, (state, action) => {
    const updFlight = action.flight;

    // Verboten, b/c we work w/ Immutables !!!
    // state.flights[7] = updFlight;

    const flights = state.flights.map(f => (f.id === updFlight.id)? updFlight : f);
    return { ...state, flights };
  }),

);
