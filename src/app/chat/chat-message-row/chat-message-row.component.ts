import {Component, Input, OnInit} from '@angular/core';
import {ChatMessageModel} from "../model/chat.model";

@Component({
  selector: 'app-chat-message-row',
  templateUrl: './chat-message-row.component.html',
  styleUrls: ['./chat-message-row.component.css']
})
export class ChatMessageRowComponent implements OnInit {
  @Input() msg: ChatMessageModel;
}
