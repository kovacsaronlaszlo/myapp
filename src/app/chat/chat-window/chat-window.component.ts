import {Component, Input, OnInit} from '@angular/core';
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
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
  resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
  }

  inNewMessage(newMessage: string) {
    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.resetForm = true;
          } else {
            alert("Hiba az üzenetküldés közben");
          }
        }
      );
  }
}
