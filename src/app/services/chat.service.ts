import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;
  user: any = {
    name: "Montxell"
  };

  constructor( private db: AngularFireDatabase ) {
    // this.chats = db.list('/chats');
  }


  loadMessages() {

    this.chats = this.db.list('chats'), {
      query: {
        limitToLast: 20,
        orderByKey: true
      }
    };

    return this.chats;
  }


  addMessage( text: string ) {

    let message: Message = {
      name:"Montxell",
      message: text
    }

    return this.chats.push( message ); //returns a promise
  }

}
