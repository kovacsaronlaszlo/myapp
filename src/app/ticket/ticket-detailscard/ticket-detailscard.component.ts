import {Component, Input} from '@angular/core';
import {TicketModel} from "../../shared/ticket-model";

@Component({
  selector: 'app-ticket-detailscard',
  templateUrl: './ticket-detailscard.component.html',
  styleUrls: ['./ticket-detailscard.component.css']
})
export class TicketDetailscardComponent {
  @Input() ticket: TicketModel;
}
