import {Injectable} from '@angular/core';
import {EventModel} from "./event-model";

@Injectable()
export class EventService {
  private _events: EventModel[];

  constructor() {
    this._events = this._getMockData();
  }

  getAllEvents(): EventModel[] {
    return this._events;
  }

  getEventById(id: number) {
    const ev = this._events.filter(x => x.id === id);
    return ev.length > 0 ? ev[0] : new EventModel(EventModel.emptyEvent);
  }

  update(param: EventModel) {
    this._events = this._events.map( ev => {
      // if (ev.id === param.id) {
      //   return {...param};
      // } else {
      //   return ev;
      // }
      return ev.id === param.id ? {...param} : ev;
    });
  }

  create(param: EventModel) {
    this._events = [
      ...this._events,
      {
        id: this._getMaxId() + 1,
        ...param
      }
    ];
  }

  private _getMaxId() {
    return this._events.reduce((x, y) => x.id > y.id ? x : y).id;
  }

  private _getMockData() {
    return [
      new EventModel({
        'id': 1,
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        'id': 2,
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      }),
      new EventModel({
        'id': 3,
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.'
      }),
      new EventModel({
        'id': 4,
        'name': 'Nyuszi Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'http://ujsag.allatvilag.net/wp-content/uploads/2011/11/nyulak_hq.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        'id': 5,
        'name': 'Ludovico Einaudi',
        'date': '2017-08-03',
        'pictureURL': 'http://www.ludovicoeinaudi.com/new/wp-content/uploads/2016/03/RAY_2679.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        'id': 6,
        'name': 'Chinese Man',
        'date': '2017-08-03',
        'pictureURL': 'http://www.altmusicbox.com/wp-content/uploads/2016/05/52366eac1fe5c.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        'id': 7,
        'name': 'Club Des Belugas',
        'date': '2017-08-03',
        'pictureURL': 'http://club-des-belugas.com/images/Club-des-Belugas-Orchestra.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        'id': 8,
        'name': 'The Rumjacks',
        'date': '2017-08-03',
        'pictureURL': 'http://cdn1-www.musicfeeds.com.au/assets/uploads/the-rumjacks-2016-press-pic-supplied.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        'id': 9,
        'name': 'Dropkick Murphys',
        'date': '2017-08-03',
        'pictureURL': 'https://i.ytimg.com/vi/dmuWW0HNub8/maxresdefault.jpg',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      })
    ];
  }
}

