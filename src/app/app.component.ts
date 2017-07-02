import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: FirebaseListObservable<any[]>;
  
  constructor( private db: AngularFireDatabase,
               public _cs: ChatService) {

    this.chats = db.list('/chats');

  }
}
