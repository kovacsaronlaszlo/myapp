import {Injectable} from '@angular/core';
import {ChatService} from "./chat.service";
import {Observable} from "rxjs/Observable";
import {ChatMessageModel} from "./model/chat.model";
import {UserService} from "../shared/user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/delay";
import "rxjs/add/observable/of";
import * as moment from 'moment';

export const MockedChatDatas = {
  mockedRoomId: '-Ky0HolLJBH3Q5uVHWZf',
  mockedUserId: 'Y5YDzpZqwKgk6pj6wFORCWXKhoW2',
  mockedUserName: 'Kovács Áron',
  mockedUserPictureUrl: 'http://ouaibelephant.free.fr/Blacksad/smirnov.jpg'
};

@Injectable()
export class MockedChatService extends ChatService {

  private rooms$ = new BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]>([]);


  constructor(userService: UserService) {
    super(userService);
    // fill mocked messages
    const mockedMessages = [];
    for(let i=0; i < 10; i++) {
      mockedMessages.push({
        $id: null,
        msg: ` test message: ${i}`,
        userId: MockedChatDatas.mockedUserId,
        userName: MockedChatDatas.mockedUserName,
        userPictureUrl: MockedChatDatas.mockedUserPictureUrl,
        created: +moment().unix()
      });
    }

    const currentRooms = this.rooms$.getValue();
    currentRooms[MockedChatDatas.mockedRoomId] = new BehaviorSubject<ChatMessageModel[]>(mockedMessages);
    this.rooms$.next(currentRooms);
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    const rooms = this.rooms$.getValue();
    const roomMessages = rooms[roomId].getValue();

    return this.userService.getCurrentUser()
      .delay(300)
      .switchMap(
        user => {
          roomMessages.push(
            new ChatMessageModel({
              $id: null,
              'msg': msg,
              userId: MockedChatDatas.mockedUserId,
              userName: MockedChatDatas.mockedUserName,
              userPictureUrl: MockedChatDatas.mockedUserPictureUrl,
              created: +moment().unix()
            })
          );
          rooms[roomId].next(roomMessages);

          return Observable.of(true);
        }
      );

  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    const rooms = this.rooms$.getValue();
    if (rooms[roomId] == null) {
      // first init room
      rooms[roomId] = new BehaviorSubject<ChatMessageModel[]>([]);
      this.rooms$.next(rooms);
    }
    return rooms[roomId].asObservable();
  }
}
