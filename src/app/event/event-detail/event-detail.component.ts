import { Component, OnInit } from '@angular/core';
import {EventModel} from "../../shared/event-model";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../shared/event.service";
import {Location} from "@angular/common";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  editForm = false;

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _location: Location,
              public userService: UserService) { }

  ngOnInit() {
    const evId = +this._route.snapshot.params['id'];
    if (evId) {
      this.event = this._eventService.getEventById(evId);
      console.log('esemény id ', evId);
      console.log('esemény ', this.event);
    } else {
      this.event = new EventModel(EventModel.emptyEvent);
      this.editForm = true;
      console.log('nem kaptunk semmit... lol');
    }

  }

  onSubmit(form) {
    if(this.event.id) {
      console.log('update branch');
      this._eventService.update(this.event);
    } else {
      console.log('create branch');
      this._eventService.create(this.event);
    }
    this._location.back();
  }

  navigateBack() {
    this._location.back();
  }

}
