import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { CustomCookieService } from 'src/app/services/custom-cookie.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {

  activeChat: any;
  msgList: any[];
  loggedInUser: string;
  isFetchingMessages: boolean;
  message: string;
  info: any;

  constructor(private dataSharingService: DataSharingService,
              private cookieService: CustomCookieService,
              private messageService: MessagingService) {
    this.activeChat = {mobile_number: '', fullname: '', _id: ''};
    this.message = '';
    this.info = JSON.parse(this.cookieService.getCookie('info'));
    const lastActiveChat = (this.cookieService.getCookie('active_chat')) ? JSON.parse(this.cookieService.getCookie('active_chat')) : null;
    if (lastActiveChat) {
      this.activeChat.fullname = lastActiveChat.fullname;
      this.activeChat.mobile_number = lastActiveChat.mobile_number;
      this.activeChat._id = lastActiveChat._id;
      this.dataSharingService.activeChat.next(this.activeChat);
    }
    this.loggedInUser = this.info.mobile_number;
    this.dataSharingService.activeChat.subscribe(data => {
      this.activeChat.mobile_number = data.mobile_number;
      this.activeChat.fullname = data.fullname;
      this.activeChat._id = data._id;
      this.cookieService.saveCookie('active_chat', JSON.stringify(this.activeChat), 0);
      this.loadMessageList(this.activeChat._id);
    });
    this.loadMessageList(this.activeChat._id);
    this.dataSharingService.newMessage.subscribe(_data => {
      if (this.activeChat.mobile_number === _data.sent_by_username || this.activeChat.mobile_number === _data.sent_to_username) {
        this.msgList.push({message: _data.message, created_at: _data.created_at});
      }
    });
  }

  ngOnInit() {
  }

  loadMessageList(sent_to: string) {
    this.isFetchingMessages = true;
    this.messageService.getMessageList(sent_to)
      .subscribe((msgList: any[]) => {
        this.msgList = msgList;
        this.isFetchingMessages = false;
      }, err => {
        this.msgList = [];
        this.isFetchingMessages = false;
      });
  }

  sendMessage() {
    if (!this.message || this.message === '') {
      this.showSnackBar('Type something to send a message', 'OK');
      return;
    }
    console.log('message = ' + this.message);
    const msg = {
      message: this.message,
      sent_by: this.info._id,
      sent_by_username: this.info.mobile_number,
      sent_to: this.activeChat._id,
      sent_to_username: this.activeChat.mobile_number
    };
    this.dataSharingService.sendMessage.next(msg);
    // this.msgList.push(msg);
    this.message = '';
  }

  showSnackBar(msg: string, action: string) {
    this.dataSharingService.showSnackBar.next({message: msg, action: action});
  }
}
