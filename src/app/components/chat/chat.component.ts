import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message: string = "";
  element: any;


  constructor( public _cs: ChatService ) {

    this._cs.loadMessages()
      .subscribe( () => {
        console.log("Messages loaded...");

        setTimeout( () => this.element.scrollTop = this.element.scrollHeight, 50);

      })
  }

  ngOnInit() {
    this.element = document.getElementById("app-messages");
  }

  send() {
    if (this.message.length == 0) {
      return;
    }

    this._cs.addMessage( this.message )
        .then( ()=> console.log("Done!"))
        .catch( (error) => console.error(error));

    this.message = "";
  }

}
