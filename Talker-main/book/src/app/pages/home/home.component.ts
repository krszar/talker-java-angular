import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, HostListener, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { FriendComponent } from 'src/app/components/friend/friend.component';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { SharedService } from 'src/app/shared/shared.service';
import { Subject, takeUntil } from 'rxjs';
// import { emit } from 'process';
export let socket = io('http://localhost:3000');

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

  messageSend(msg: string) {
    this.http.post<any>('http://localhost:3000/api/query', { action: 'getUserID' }).subscribe(userid => {

      // socket.on('connect', () =>{
      //   console.log(socket.id+" "+userid.userID)
      //   socket.emit('handshake',{ socketID: socket.id, userID: userid.userID})
      // })
      console.log("test receiver:" + this.shared.get())


      socket.emit("chat", { senderID: userid.userID, message: msg, receiverID: this.shared.get() })

    })

  }


  gotoLogin() {
    this.router.navigate(['/login'])
  }

  logout() {
    // this.http.post<any>('http://localhost:3000/api/query', { action: 'logout' }).subscribe()
    this.http.get('http://localhost:8080/logout').subscribe()
    console.log("logout")
    this.ngOnInit()
  }

  // socket = io('http://localhost:3000');
  // sendMessage() {
  //   this.socket.emit('test')
  //   console.log("socket log")
  // }
  @ViewChild("container", { read: ViewContainerRef }) container!: ViewContainerRef;




  ngOnInit() {

    this.http.get('http://localhost:8080/check').subscribe(data => {
      console.log(data)   
      if (data == false) {
        this.gotoLogin()
        console.log("działa")
      }

    })
    // this.sendMessage()
    //   let socket = io('http://localhost:3000');
    //   this.http.post<any>('http://localhost:3000/api/query', { action: 'getUserID' }).subscribe(userid => {

    //     socket.on('connect', () =>{
    //       console.log(socket.id+" "+userid.userID)
    //       socket.emit('handshake',{ socketID: socket.id, userID: userid.userID})
    //     })

    // })
  }

  ngAfterViewInit() {


    console.log(this.container)

    // this.http.post<any>('http://localhost:3000/api/query', { action: 'getFriendsList' }).subscribe(list => {
    //   console.log(list.users)
    //   let id = list.users._id;

    //   for (var i = 0; i < list.users.length; i++) {
    //     let a = this.container.createComponent(FriendComponent)
    //     a.instance.friend_txt = list.users[i].login
    //     a.instance.friend_img = "https://stonebridgesmiles.com/wp-content/uploads/2019/12/GettyImages-1128826884-scaled.jpg"

    //   }
    // })
    
    this.http.get('http://localhost:8080/friends').pipe(takeUntil(this.destroy$)).subscribe((list: any = null) => {
      
      console.log(list)
      console.log(list.length)   
      const uniqueFriends:any = [...new Set(list)]
      console.log(uniqueFriends)
        //   console.log(list.users)
    //   let id = list.users._id;

      for (var i = 0; i < uniqueFriends.length; i++) {
        let a = this.container.createComponent(FriendComponent)
        
        a.instance.friend_txt = uniqueFriends[i]
        a.instance.friend_img = "https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=826&t=st=1670879117~exp=1670879717~hmac=c6cd13c4bfdc2173d0b97adcb93f6948fc64792e8e325c796c3fe4e79ffdb0ec"

      }

    })
    


    // this.sendMessage()

    // this.http.post<any>('http://localhost:3000/api/query', { action: 'getUserID' }).subscribe(userid => {
    //   socket.on('connect', () => {
    //     if (socket) socket.emit('handshake', { socketID: socket.id, userID: userid.userID })
    //   })
    // })

    //only for angular server

    // fr.instance.friend_txt="Jaś Fasola"
    // fr.instance.friend_img="https://stonebridgesmiles.com/wp-content/uploads/2019/12/GettyImages-1128826884-scaled.jpg"

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

