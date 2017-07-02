import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Message } from '../interfaces/message.interface';

import * as firebase from 'firebase/app';


@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;
  user: any = {};

  constructor( private db: AngularFireDatabase,
               private afAuth: AngularFireAuth ) {

    if ( localStorage.getItem('user') ) {
      // User logged
      this.user = JSON.parse(localStorage.getItem('user'));

      //console.log(this.user);

    } else {

      this.user = null;

    }
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
      name: this.user.user.displayName,
      message: text,
      uid: this.user.user.uid
    }

    return this.chats.push( message ); //returns a promise
  }



  login( selectedProvider: string ) {

    let provider;

    if ( selectedProvider == "google" ) {

      provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

    } else {

      provider = new firebase.auth.TwitterAuthProvider();

    }

    // Using a popup.
    firebase.auth().signInWithPopup(provider).then( (result) => {

     console.log( result );

     // This gives you a Google or Twitter Access Token.
     let token = result.credential.accessToken;

     // This gives you a Twitter API secret.
     let secret = result.credential.secret;

     // The signed-in user info.
     this.user = result;

     localStorage.setItem('user', JSON.stringify(result));

    });
  }


  logout() {

    localStorage.removeItem('user');
    this.user = null;
    this.afAuth.auth.signOut();

  }

}
