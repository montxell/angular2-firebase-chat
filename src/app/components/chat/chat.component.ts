import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message: string = "";


  constructor( public _cs: ChatService ) {

    this._cs.loadMessages()
      .subscribe( () => {
        console.log("Messages loaded...");
      })
  }

  ngOnInit() {
  }

  send() {
    if (this.message.length == 0) {
      return;
    }

    this._cs.addMessage( this.message )
        .then( ()=> console.log("Done!"))
        .catch( (error) => console.error(error));
  }

}
