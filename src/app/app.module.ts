import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AlertModule, CollapseModule} from "ngx-bootstrap";
import {AppRoutingModule} from "./app-routing.module";
import {UserService} from "./shared/user.service";
import {TicketService} from "./shared/ticket.service";
import {LoggedInGuard} from "./shared/logged-in.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TicketDetailscardComponent} from './ticket/ticket-detailscard/ticket-detailscard.component';
import {BiddingCardComponent} from './ticket/bidding-card/bidding-card.component';
import {MomentModule} from "angular2-moment";
import 'moment/locale/hu';
import {BidFormComponent} from './ticket/bid-form/bid-form.component';
import {BidService} from "./shared/bid.service";
import * as firebase from 'firebase';
import {environment} from "../environments/environment";
import {EventcardModule} from "./event/eventcard/eventcard.module";
import {CoreModule} from "./core/core.module";
import {EventModule} from "./event/event.module";


@NgModule({
  declarations: [
    AppComponent,
    ...AppRoutingModule.routableComponents,
    TicketDetailscardComponent,
    BiddingCardComponent,
    BidFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    EventcardModule,
    CoreModule,
    EventModule.forRoot()
  ],
  providers: [
    UserService,
    TicketService,
    LoggedInGuard,
    BidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
