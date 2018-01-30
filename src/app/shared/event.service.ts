import {Injectable} from '@angular/core';
import {EventModel} from "./event-model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventService {


  constructor(private _http: HttpClient) {
  }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get(`${environment.firebase.baseUrl}/events.json`)
      .map(data => Object.values(data).map(evm => new EventModel(evm)));
  }

  getEventById(id: number) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
  }
  save(param: EventModel) {
    console.log(param);
    if (param.id)
      return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    else
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param);
  }

  delete() {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }



}

