import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MyEntity } from './my-entity';

@Injectable({ providedIn: 'root' })
export class MyEntityDataService {
  constructor(private http: HttpClient) {}

  load(id: string): Observable<MyEntity> {
    const url = 'http://demo.angulararchitects.io/api/my-entity';

    const params = new HttpParams().set('id', id);

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<MyEntity>(url, { params, headers });
  }
}
