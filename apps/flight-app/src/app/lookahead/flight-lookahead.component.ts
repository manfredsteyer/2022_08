import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  interval,
  Observable,
  startWith,
  distinctUntilChanged,
  combineLatest,
  Subject,
  BehaviorSubject,
  of,
} from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
  takeUntil,
} from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
})
export class FlightLookaheadComponent implements OnDestroy {
  control: FormControl;
  flights$: Observable<Flight[]>;
  loading$ = new BehaviorSubject<boolean>(false); // TODO: Get rid of this

  online$!: Observable<boolean>;
  error$ = new BehaviorSubject<unknown>(null);

  click$ = new Subject<void>();
  close$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.control = new FormControl();

    this.online$ = interval(2000).pipe(
      startWith(-1),
      tap((x) => console.log('counter', x)),
      map(() => Math.random() < 0.5), // t, t, t, f, f, t, t
      map(() => true),
      distinctUntilChanged(), // t, f, t
      shareReplay({ bufferSize: 1, refCount: true })
      // shareReplay(1),
      // RxJS 7
      // share({
      //     connector: () => new ReplaySubject(1),
      //     resetOnRefCountZero: true,
      //     resetOnError: true,
      //     resetOnComplete: true
      // })
    );

    this.online$.pipe(takeUntil(this.close$)).subscribe();

    // setTimeout(() => sub.unsubscribe(), 7000);

    const input$ = this.control.valueChanges.pipe(
      filter((v) => v.length >= 3),
      debounceTime(300)
    );

    // RxJS 7 (Angular 13)
    this.flights$ = combineLatest({ input: input$, online: this.online$ }).pipe(
      filter((combined) => combined.online),
      tap(() => this.loading$.next(true)),
      switchMap((combined) => this.load(combined.input)),
      tap(() => this.loading$.next(false))
    );

    // this.flights$ = input$.pipe(
    //     withLatestFrom(this.online$),
    //     filter( ([, online]) => online),
    //     tap(() => (this.loading = true)), // TODO: Get rid of side effect
    //     switchMap(([input, ]) => this.load(input)),
    //     tap(() => (this.loading = false)) // TODO: Get rid of side effect
    // );
  }

  ngOnDestroy(): void {
    this.close$.next();
  }

  load(from: string) {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams().set('from', from);

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers }).pipe(
      // delay(7000)
      catchError((err) => {
        console.error('err', err);
        this.error$.next(err);
        return of([]);
      })
    );
  }

  onClick() {
    this.click$.next();
  }
}
