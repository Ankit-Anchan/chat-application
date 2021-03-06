import { Component, OnInit, OnDestroy } from '@angular/core';
import {MessagingService} from '../../services/messaging.service';
import { MatSnackBar } from '@angular/material';
import { CustomCookieService } from '../../services/custom-cookie.service';
import {SocketService} from '../../services/socket.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ISubscription } from 'rxjs-compat/Subscription';

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
      this.activeChat.mobile_number = _data.mobile_number;
      this.activeChat.fullname = _data.fullname;
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

  setActiveChat(mobileNumber: string, fullName: string, id: string) {
    this.dataSharingService.activeChat.next({mobile_number: mobileNumber, fullname: fullName, _id: id});
  }

  displaySnackBar(msg: string, action: string) {
    this.dataSharingService.showSnackBar.next({message: msg, action: action});
  }

  ngOnDestroy() {
    this.newRequestAcceptSubscription.unsubscribe();
    this.activeChatSubscription.unsubscribe();
  }
}
