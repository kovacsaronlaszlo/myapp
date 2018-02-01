import {Injectable} from '@angular/core';
import {EventService} from './event.service';
import {TicketModel} from './ticket-model';
import {UserService} from './user.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/of";
import {UserModel} from "./user-model";
import {EventModel} from "./event-model";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";

@Injectable()
export class TicketService {

  constructor(private _eventService: EventService,
              private  _userService: UserService,
              private _http: HttpClient) {
  }

  getAllTickets() {
    return this._http.get(`${environment.firebase.baseUrl}/tickets.json`)
      .map(ticketsObject => Object.values(ticketsObject))
      .map(ticketsArray => ticketsArray.map(tm =>
      Observable.zip(
        Observable.of(tm),
        this._eventService.getEventById(tm.eventId),
        this._userService.getUserById(tm.sellerUserId),
        (t: TicketModel, e: EventModel, u: UserModel) => {
          return {
            ...t,
            event: e,
            seller: u
          };
        })
      ))
      .switchMap(zipStreamArray => Observable.forkJoin(zipStreamArray));
  }

  create(param: TicketModel) {
    return this._http
      .post<{name: string}>(`${environment.firebase.baseUrl}/tickets.json`, param)
      .map(fbPostReturn => fbPostReturn.name)
      .switchMap(ticketId => this._saveGeneratedId(ticketId))
      .switchMap(ticketId => this._eventService.addTicket(param.eventId, ticketId))
      .switchMap(ticketId => this._userService.addTicket(ticketId));
  }

  private _saveGeneratedId(ticketId: string): Observable<string> {
    return this._http.patch<{id: string}>(
      `${environment.firebase.baseUrl}/tickets/${ticketId}.json`,
      {id: ticketId}
    ).map(x => x.id);
  }

  getEventNameById(id: number) {
    // return this._eventService.getEventById(id).name;
  }
}
