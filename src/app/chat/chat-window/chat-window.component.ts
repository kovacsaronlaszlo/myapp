import {
  AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit,
  ViewChild
} from '@angular/core';
import "rxjs/add/operator/skip";
import "rxjs/add/operator/distinctUntilChanged";
import {environment} from "../../../environments/environment";
import {MockedChatDatas} from "../mocked-chat.service";
import {Observable} from "rxjs/Observable";
import {ChatMessageModel} from "../model/chat.model";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
  resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = true;

  constructor(private chatService: ChatService) {
  }

  ngAfterViewChecked(): void {
    if(this.shouldScrolling) {
      this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
      this.shouldScrolling = false;
    }
  }

  ngOnInit() {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
  }

  inNewMessage(newMessage: string) {
    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.shouldScrolling = true;
            this.resetForm = true;
          } else {
            alert("Hiba az üzenetküldés közben");
          }
        }
      );
  }

  trackByMessages(index: number, model: ChatMessageModel) {
    return model.$id;
  }
}
