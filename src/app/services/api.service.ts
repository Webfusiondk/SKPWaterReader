import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Reader } from '../Reader';
import { ReaderUpdateDTO } from '../ReaderDTO';
import { LocationObj } from '../Location';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readerUrl = 'https://localhost:44397/api/Reader/';
  private readerHistoryUrl = 'https://localhost:44397/api/Reader/history/'
  private locationUrl = 'https://localhost:44397/api/Location';
  constructor(private http: HttpClient) {
  }
  getReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>(this.readerUrl);
  }
  getReadersByLocation(locationName: string): Observable<Reader[]> {
    return this.http.get<Reader[]>(this.readerUrl + locationName);
  }
  updateReader(readerDTO: ReaderUpdateDTO): Observable<any> {
    return this.http.put(this.readerUrl, readerDTO, httpOptions);
  }
  createReader(reader: Reader): Observable<any> {
    return this.http.post(this.readerUrl, reader, httpOptions);
  }
  getLocation() {
    return this.http.get<Location[]>(this.locationUrl);
  }
  getReaderHistory(reader: Reader): Observable<any> {
    return this.http.get<Reader[]>(this.readerHistoryUrl + reader.readerNumber)
  }
}
