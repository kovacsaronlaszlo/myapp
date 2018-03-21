import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EventService} from "../../shared/event.service";
import {EventModel} from "../../shared/event-model";
import {UserService} from "../../shared/user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {
  public eventsGrouppedBy3$: Observable<EventModel[][]>;

  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.eventsGrouppedBy3$ = this._eventService.getAllEvents()
      .map(data => {
        return data.reduce((acc: Array<any>, curr: EventModel, ind: number) => {
              if (ind % 3 === 0) {
                acc.push([]);
              }
              acc[acc.length - 1].push(curr);
              return acc;
        }, []);
      });
  }

}
