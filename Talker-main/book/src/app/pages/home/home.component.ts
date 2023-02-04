import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { FriendComponent } from 'src/app/components/friend/friend.component';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { SharedService } from 'src/app/shared/shared.service';
import { Subject, takeUntil } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from "stompjs"

let stompClient: any = null;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{

  constructor(private http: HttpClient, private router: Router,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private shared: SharedService) {
    this.matIconRegistry.addSvgIcon('send', this.domSanitizer.bypassSecurityTrustResourceUrl('send.svg'))
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  connect(){
    let sock = new SockJS("http://localhost:8080/chat");
 
    stompClient = Stomp.over(sock)
    stompClient.connect({}, () =>{
      stompClient.subscribe("/message", () =>{

      })

    })
  }
  
  messageSend(msg: string) {
    if(msg != ""){
      stompClient.send("/app/chat", {}, JSON.stringify({'from':localStorage.getItem("who"), 'message':msg, 'to': this.shared.getUserTo()}))
    }

  }

  gotoLogin() {
    this.router.navigate(['/login'])
  }

  logout() {
    this.http.get('http://localhost:8080/logout').subscribe()
    this.ngOnInit()
  }

  @ViewChild("container", { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnInit() {

    this.http.get('http://localhost:8080/check').subscribe(data => {
      if (data == false || localStorage.getItem("who") == null) {
        this.gotoLogin()
      }

    })
    
  }

  ngAfterViewInit() {

    this.connect()

    this.http.get('http://localhost:8080/friends').pipe(takeUntil(this.destroy$)).subscribe((list: any = null) => {
      
      const uniqueFriends:any = [...new Set(list)]

      for (var i = 0; i < uniqueFriends.length; i++) {
        let a = this.container.createComponent(FriendComponent)
        a.instance.friend_txt = uniqueFriends[i]
        a.instance.friend_img = "https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=826&t=st=1670879117~exp=1670879717~hmac=c6cd13c4bfdc2173d0b97adcb93f6948fc64792e8e325c796c3fe4e79ffdb0ec"

      }

    })
    

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}