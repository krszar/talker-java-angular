import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message!: string;

  xx!: string;
  usr!: string;
  usrto!: string;

  set(ab: string){
    this.xx = ab
  }
  get(){
    return this.xx
  }
  setUserFrom(user: string){
    this.usr = user;
  }
  getUserFrom(){
    return this.usr;
  }
  setUserTo(userto: string){
    this.usrto = userto;
  }
  getUserTo(){
    return this.usrto;
  }

  constructor() { }

  @Output() clickEvent = new EventEmitter<string>()
  @Output() newMessage = new EventEmitter<string>()

  ClickedId(msg: string){
    this.clickEvent.emit(msg)
  }

}
