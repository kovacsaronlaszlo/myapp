import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventModel} from "../../shared/event-model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../event.service";
import {Location} from "@angular/common";
import {UserService} from "../../shared/user.service";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: EventModel;
  viewForm = true;

  private _destroy$ = new Subject<void>();

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _location: Location,
              public userService: UserService) {
  }

  ngOnInit() {
    const evId = this._route.snapshot.params['id'];
    this.event = new EventModel();
    this.viewForm = !!evId;
    if (evId) {
      this._eventService.getEventById(evId)
        .takeUntil(this._destroy$)
        .subscribe(evm => this.event = evm);
      console.log('esemény id ', evId);
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit() {
    this._eventService.save(this.event)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Probléma van az ürlap mentésénél: ${err}`);
        }
      );
  }

  delete() {
    this._eventService.delete(this.event)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Probléma az űrlap törlésénél: ${err}`);
        }
      );
  }

  navigateBack() {
    this._location.back();
  }

}
