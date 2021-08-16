import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Reader } from '../Reader';
import { ReaderUpdateDTO } from '../ReaderDTO';
import { LocationObj } from '../Location';
import { catchError, retry } from 'rxjs/operators';
import { ReaderWithDate } from '../models/ReaderWithDate';

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
  getReaderByReaderNumber(readerNumber: string){
    return this.http.get<Reader>(this.readerUrl + "readerNumber/" + readerNumber);
  }
  deleteReader(reader: Reader) {
    return this.http.delete(this.readerUrl + reader.readerNumber);
  }
  updateReader(reader: Reader) {
    return this.http.put(this.readerUrl, reader, httpOptions);
  }
  updateReaderReading(readerDTO: ReaderUpdateDTO): Observable<any> {
    return this.http.put(this.readerUrl + "reading", readerDTO, httpOptions);
  }
  createReader(reader: Reader): Observable<any> {
    return this.http.post(this.readerUrl, reader, httpOptions);
  }
  getLocation() {
    return this.http.get<Location[]>(this.locationUrl);
  }
  getAllReadersHistory(): Observable<any> {
    return this.http.get<Reader[]>(this.readerHistoryUrl);
  }
  getReaderHistory(reader: Reader): Observable<any> {
    return this.http.get<Reader[]>(this.readerHistoryUrl + reader.readerNumber)
  }
  getReaderHistoryByDate(readerWithDate: ReaderWithDate): Observable<any> {
    return this.http.get<Reader[]>(this.readerHistoryUrl + readerWithDate.reader.readerNumber + "/" + readerWithDate.startDate + "/" + readerWithDate.endDate);
  }
}
