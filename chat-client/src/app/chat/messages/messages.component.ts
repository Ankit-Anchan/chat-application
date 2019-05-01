import { Component, OnInit, OnDestroy } from '@angular/core';
import {MessagingService} from '../../services/messaging.service';
import { MatSnackBar } from '@angular/material';
import { CustomCookieService } from '../../services/custom-cookie.service';
import {SocketService} from '../../services/socket.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ISubscription } from 'rxjs-compat/Subscription';
import { p } from '@angular/core/src/render3';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  userList: any;
  friendListFound: boolean;
  isSearchResultLoading: boolean;
  searchValue: string;
  loggedInUser: string;
  activeChat: any;
  activeChatSubscription: ISubscription;
  newRequestAcceptSubscription: ISubscription;
  INewMessageSubscription: ISubscription;

  constructor(private messageService: MessagingService,
              private cookieService: CustomCookieService,
              private dataSharingService: DataSharingService) {
    this.isSearchResultLoading = false;
    this.userList = [];
    this.friendListFound = true;
    const data = JSON.parse(this.cookieService.getCookie('info'));
    this.loggedInUser = data.mobile_number;
    this.newRequestAcceptSubscription = this.dataSharingService.newRequestAccept.subscribe(_data => {
        this.displaySnackBar(_data.message, 'OK');
        this.loadFriendList();
      });
    this.activeChat = {mobile_number: '', fullname: ''};
    this.activeChatSubscription = this.dataSharingService.activeChat.subscribe(_data => {
      console.log('active chat = ');
      console.log(_data);
      this.activeChat.mobile_number = _data.mobile_number;
      this.activeChat.fullname = _data.fullname;
      this.messageService.markAsRead(_data._id).subscribe(res => {
        console.log('messages marked as read');
      });
    });
    this.INewMessageSubscription = this.dataSharingService.newMessage.subscribe(_data => {
      console.log('got a new message');
      this.userList.map(user => {
        if (user.mobile_number === _data.sent_by_username) {
          console.log('increasing count of user ' + user.mobile_number);
          user.unread_count = user.unread_count + 1;
          return user;
        }
        return user;
      });
    });
  }

  ngOnInit() {
    this.loadFriendList();
  }

  onSearchChange(value: string ) {
    this.searchValue = value;
    this.isSearchResultLoading = true;
    if (this.searchValue === '') {
      // load friend list again
      this.isSearchResultLoading = true;
      this.loadFriendList();
    }
    if (this.searchValue.length < 3) {
      this.userList = [];
      return false;
    }
    console.log(this.searchValue);
    this.loadSearchList(this.searchValue);
  }

  loadSearchList(searchValue) {
    this.messageService.searchUser(searchValue)
    .subscribe(_list => {
      console.log(_list);
      this.userList = this.processSearchList(_list);
      this.friendListFound = true;
      this.isSearchResultLoading = false;
    },
  err => {
    this.friendListFound = false;
    this.isSearchResultLoading = false;
  });
  }

  loadFriendList() {
    this.messageService.getFriendList()
    .subscribe(list => {
      this.userList = this.processFriendList(list);
      this.friendListFound = true;
      this.isSearchResultLoading = false;
    },
      _err => {
        this.friendListFound = false;
        this.isSearchResultLoading = false;
      },
      () => {
        this.fetchUnReadMessageCount();
      });
  }

  processFriendList(list) {
    const parsedList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].sent_to) {
        parsedList.push({
          id: list[i].sent_to._id,
          mobile_number: list[i].sent_to.mobile_number,
          firstname: list[i].sent_to.firstname,
          lastname: list[i].sent_to.lastname,
          status: list[i].status
        });
      } else {
        parsedList.push({
          id: list[i].sent_by._id,
          mobile_number: list[i].sent_by.mobile_number,
          firstname: list[i].sent_by.firstname,
          lastname: list[i].sent_by.lastname,
          status: list[i].status
        });
      }
    }
    return parsedList;
  }

  processSearchList(list) {
    const parsedList = [];
    for (let i = 0; i < list.length; i++) {
      const data = {
        id: list[i]._id,
        mobile_number: list[i].mobile_number,
        firstname: list[i].firstname,
        lastname: list[i].lastname
      };
      if (list[i].contact_list && list[i].contact_list.length > 0) {
          data['status'] = list[i].contact_list[0].status;
      }
      parsedList.push(data);
    }
    return parsedList;
  }

  fetchUnReadMessageCount() {
    this.userList.map(user => {
      console.log('user = ');
      console.log(user);
      this.messageService.getUnReadMessages(user.id)
        .subscribe((res: any[]) => {
          console.log('getting unread message for = ' + user.mobile_number);
          console.log(res);
          user.unread_count = res.length;
        },
        err => {
          user.unread_count = 0;
        });
    });
  }

  sendFriendRequest(_id: string) {
    this.messageService.sendFriendRequest(_id).subscribe(res => {
        console.log(res);
        this.loadSearchList(this.searchValue);
        this.displaySnackBar('Request Sent', 'OK');
    },
    err => {
        alert('Something went wrong while sending request');
    });
  }

  setActiveChat(user: any) {
    user.unread_count = 0;
    console.log('setting active chat = ');
    console.log(user);
    this.dataSharingService.activeChat.next({mobile_number: user.mobile_number,
                                            fullname: user.firstname + ' ' + user.lastname,
                                            _id: user.id});
  }

  displaySnackBar(msg: string, action: string) {
    this.dataSharingService.showSnackBar.next({message: msg, action: action});
  }

  ngOnDestroy() {
    this.newRequestAcceptSubscription.unsubscribe();
    this.activeChatSubscription.unsubscribe();
    this.INewMessageSubscription.unsubscribe();
  }
}
