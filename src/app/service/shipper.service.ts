import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipper } from '../interfaces/shipper.interface';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {
  private apiUrl = 'https://localhost:7035/api/Shipper';

  constructor(private http: HttpClient) {}

  getShippers(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(this.apiUrl);
  }
}
