import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { CustomCookieService } from 'src/app/services/custom-cookie.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
