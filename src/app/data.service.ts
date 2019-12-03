import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
   API_KEY:String='CRy3ypctNFglsGee77gvKyXIRRsiQkbsfdtDs4Ft';
   url:String='https://api.nasa.gov/EPIC/api/natural/date/';
  constructor(private http: HttpClient) {}

  getDataFromNASA(date) {
    console.log(this.url+date+'?api_key='+this.API_KEY)
    return this.http.get(this.url+date+'?api_key='+this.API_KEY);
  }
}
