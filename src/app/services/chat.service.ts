import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;

  constructor( private db: AngularFireDatabase ) {
    // this.chats = db.list('/chats');
  }

  addMessage( text: string ) {

    let message: Message = {
      name:"Montxell",
      message: text
    }

    return this.chats.push( message ); //returns a promise
  }

}
