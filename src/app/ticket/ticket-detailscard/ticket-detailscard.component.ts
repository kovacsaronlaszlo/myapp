import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TicketModel} from "../../shared/ticket-model";

@Component({
  selector: 'app-ticket-detailscard',
  templateUrl: './ticket-detailscard.component.html',
  styleUrls: ['./ticket-detailscard.component.css']
})
export class TicketDetailscardComponent implements AfterViewInit, OnChanges {
  @Input() ticket: TicketModel;
  @Input() loading = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['loading'] != null
      && changes['loading'].currentValue !== changes['loading'].previousValue) {
      this.cdr.detectChanges();
    } else if(changers['ticket'] != null
      && !changes['ticket'].isFirstChange()) {
      const prev: TicketModel = changes['ticket'].previousValue;
      const current: TicketModel = changes['ticket'].currentValue;

      if(prev==null || current==null) {
        this.cdr.detectChanges();
      } else if(prev.seller.name != current.seller.name) {
        this.cdr.detectChanges();
      } else if(prev.numberOfTickets != current.numberOfTickets) {
        this.cdr.detectChanges();
      } else if(prev.bidEndDate != current.bidEndDate) {
        this.cdr.detectChanges();
      } else if(prev.details != current.details) {
        this.cdr.detectChanges();
      }
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }
}
