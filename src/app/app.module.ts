import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AlertModule, CollapseModule} from "ngx-bootstrap";
import {NavbarComponent} from './core/navbar/navbar.component';
import {JumbotronComponent} from './core/jumbotron/jumbotron.component';
import {EventcardComponent} from './event/eventcard/eventcard.component';
import {FooterComponent} from './core/footer/footer.component';
import {AppRoutingModule} from "./app-routing.module";
import {EventService} from "./shared/event.service";
import {UserService} from "./shared/user.service";
import {TicketService} from "./shared/ticket.service";
import {LoggedInGuard} from "./shared/logged-in.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth-interceptor";
import {TicketDetailscardComponent} from './ticket/ticket-detailscard/ticket-detailscard.component';
import {BiddingCardComponent} from './ticket/bidding-card/bidding-card.component';
import {MomentModule} from "angular2-moment";
import 'moment/locale/hu';
import {BidFormComponent} from './ticket/bid-form/bid-form.component';
import {LoadingSpinnerComponent} from './core/loading-spinner/loading-spinner.component';
import {BidService} from "./shared/bid.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    ...AppRoutingModule.routableComponents,
    TicketDetailscardComponent,
    BiddingCardComponent,
    BidFormComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [
    EventService,
    UserService,
    TicketService,
    LoggedInGuard,
    BidService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
