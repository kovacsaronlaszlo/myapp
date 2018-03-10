import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicketModel} from "../../shared/ticket-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {bidMinimumValidator} from "./bid.validators";
import {BidService} from "../../shared/bid.service";

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit {
  @Input() ticket: TicketModel;
  @Output() bid = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;

  constructor(private fb: FormBuilder,
              private bidService: BidService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        bid: [
          null,
          Validators.compose(
            [
              Validators.required,
              bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)
            ]
          )
        ]
      }
    );
  }

  onBidWithBidStep() {
    this.toBid(this.ticket.currentBid + this.ticket.bidStep)
      .subscribe(
        () => {
          // notification user
          this.submitSuccessAlert = true;
          this.bid.emit();
        },
        err => {
          console.error(err);
          this.submitErrorAlert = true;
        }
      );
  }

  displayBidWithStep($event: Event) {
    !event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;
    if (this.form.valid) {
      this.toBid(this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;
            this.form.reset({bid: null});
            // notification user
            this.submitSuccessAlert = true;
            this.bid.emit();
          },
          err => {
            console.error(err);
            this.submitErrorAlert = true;
          }
        );
    }
    console.log('licit történt');
    console.log(this.form.value);
    console.log(this.form.valid);
  }

  toBid(value: number) {
    return this.bidService.bid(this.ticket.id, value);
  }
}
