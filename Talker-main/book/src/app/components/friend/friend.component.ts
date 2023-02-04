import { Component, OnInit, Input} from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  constructor(private shared: SharedService, private http: HttpClient) { }
  message = "data passing"
  ngOnInit(): void {
  }

  @Input() friend_img = '';
  @Input() friend_txt = '';

  frChat(){
    this.shared.setUserTo(this.friend_txt)
  }

}
