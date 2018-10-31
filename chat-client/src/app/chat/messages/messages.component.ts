import { Component, OnInit } from '@angular/core';
import {MessagingService} from "../../services/messaging.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  userList: any;
  friendListFound: boolean;
  isSearchResultLoading: boolean;

  constructor(private messageService: MessagingService) {
    this.isSearchResultLoading = false;
    this.userList = [
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      },
      {
        'mobile_number': '0000000000',
        'firstname': 'Shiba',
        'lastname': 'Inu'
      }
    ];
    this.friendListFound = false;
  }

  ngOnInit() {
  }

  onSearchChange(searchValue: string ) {
    this.isSearchResultLoading = true;
    if (searchValue === '') {
      // load friend list again
      this.isSearchResultLoading = true;
      this.messageService.getFriendList()
        .subscribe(list => {
          this.userList = list;
          this.isSearchResultLoading = false;
        },
          _err => {
            this.friendListFound = false;
            this.isSearchResultLoading = false;
          });
    }
    if (searchValue.length < 3) {
      this.userList = [];
      return false;
    }
    console.log(searchValue);
    this.messageService.searchUser(searchValue)
      .subscribe(_list => {
        this.userList = _list;
        this.friendListFound = true;
        this.isSearchResultLoading = false;
      },
err => {
      this.friendListFound = false;
      this.isSearchResultLoading = false;
    });
  }

}
