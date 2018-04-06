import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventRoutingModule} from './event-routing.module';
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {EventListComponent} from "./event-list/event-list.component";
import {EventComponent} from "./event.component";
import {FormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap";
import {EventcardModule} from "./eventcard/eventcard.module";

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,

    AlertModule,
    EventcardModule
  ],
  declarations: [
    EventComponent,
    EventListComponent,
    EventDetailComponent
  ]
})
export class EventModule {
}
