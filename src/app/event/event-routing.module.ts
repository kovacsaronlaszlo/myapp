import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from "./event-list/event-list.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {LoggedInGuard} from "../shared/logged-in.guard";
import {EventComponent} from "./event.component";

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {path: '', component: EventListComponent},
      {path: 'new', component: EventDetailComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: EventDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
