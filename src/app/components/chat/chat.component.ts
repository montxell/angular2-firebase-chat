import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message: string="";


  constructor() { }

  ngOnInit() {
  }

  send() {
    if (this.message.length == 0) {
      return;
    }
    
    console.log(this.message);
  }

}
