import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { RightChatComponent } from '../right-chat/right-chat.component';
import { LeftChatComponent } from '../left-chat/left-chat.component';
import { HttpClient} from '@angular/common/http';
import { SharedService } from 'src/app/shared/shared.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from "stompjs"

let stompClient: any = null;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message!: string;

  constructor(private http: HttpClient, private shared: SharedService) { }

  connect(){
    let sock = new SockJS("http://localhost:8080/chat");
    stompClient = Stomp.over(sock)
    stompClient.connect({}, () =>{
      stompClient.subscribe("/message", (mess:any) =>{
 
        if(JSON.parse(mess.body).from == localStorage.getItem("who")){
          let a = this.container.createComponent(RightChatComponent)
          a.instance.item = JSON.parse(mess.body).msg
          a.instance.from = JSON.parse(mess.body).from

        }else{
          let a = this.container.createComponent(LeftChatComponent)
          a.instance.item = JSON.parse(mess.body).msg
          a.instance.from = JSON.parse(mess.body).from
        }

      })
      
    })
  }
  

  @ViewChild("ref", { read: ViewContainerRef }) container!: ViewContainerRef;
  ngOnInit(): void {
    this.shared.clickEvent.subscribe((data:string) => {})
  }

  currentItem = "Test";

  @ViewChild('scroll') content!: ElementRef;

  ngAfterViewInit() {

 

    this.http.get('http://localhost:8080/getMessages').subscribe((msg: any = null) => {
      for(var i = 0; i < msg.length; i++){
       if(msg[i][0] == localStorage.getItem("who")){
        let a = this.container.createComponent(RightChatComponent)
        a.instance.item = msg[i][1]
        a.instance.from = msg[i][0]
          
       }else{
          let a = this.container.createComponent(LeftChatComponent)
          a.instance.item = msg[i][1]
          a.instance.from = msg[i][0]
       }
            
      }
         
    })

    this.connect()

    this.shared.clickEvent.subscribe((data: string) => {
      this.shared.set(data)
    })

  }

  ngAfterViewChecked() {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  
}
}