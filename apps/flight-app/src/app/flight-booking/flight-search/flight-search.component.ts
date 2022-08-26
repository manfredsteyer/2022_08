import {Component, OnInit} from '@angular/core';

import { Store } from '@ngrx/store';
import { loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice } from '../+state/flight-booking.reducer';
import { selectFlightsWithSkipList } from '../+state/flight-booking.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$ = this.store.select(selectFlightsWithSkipList([4]));

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store<FlightBookingAppStateSlice>) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));
   
  }

  delay(): void {

    this.flights$.pipe(take(1)).subscribe(flights => {
      const flight = flights[0];
  
      const oldDate = new Date(flight.date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: newDate.toISOString() };
  
      this.store.dispatch(updateFlight({flight: newFlight}));
    });
  }
  
}
