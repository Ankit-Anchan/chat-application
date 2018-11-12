import { Component, OnInit } from '@angular/core';
import { CustomCookieService } from '../../services/custom-cookie.service';
import { ContactService } from 'src/app/services/contact.service';
import { MatSnackBar } from '@angular/material';
import { UserLoginService } from 'src/app/services/user-login.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstname: string;
  lastname: string;
  mobileNumber: string;
  _id: string;
  isProfileDataLoading: boolean;
  isPendingRequestDataLoading: boolean;
  pendingList: any[];
  socket: SocketIOClient.Socket;

  constructor (private cookieService: CustomCookieService,
               private loginService: UserLoginService,
               private contactService: ContactService,
               private router: Router,
               private snackBar: MatSnackBar,
               private dataSharingService: DataSharingService,
               private socketService: SocketService) {
      const token = this.cookieService.getCookie('token');
      if (!token || token === undefined || token === '') {
        this.router.navigate(['/login']);
        return;
      }
      this.isProfileDataLoading = true;
      const userInfo = JSON.parse(this.cookieService.getCookie('info'));
      this.firstname = userInfo.firstname;
      this.lastname = userInfo.lastname;
      this.mobileNumber = userInfo.mobile_number;
      this._id = userInfo._id;
      this.isProfileDataLoading = false;
      this.socket = this.socketService.getSocket();
      console.log(this.socket);
      this.dataSharingService.newFriendRequest.subscribe(data => {
        this.showSnackBar(data.message, 'OK');
        this.loadPendingRequest();
      });
      this.dataSharingService.newRequestAccept.subscribe(data => {
        this.showSnackBar(data.message, 'OK');
        this.loadPendingRequest();
      });
  }

  ngOnInit() {
    this.loadPendingRequest();
  }

  loadPendingRequest() {
    this.isPendingRequestDataLoading = true;
    this.contactService.getPendingRequestList()
    .subscribe(data => {
      console.log(data);
        this.pendingList = this.processPendingList(data);
        this.isPendingRequestDataLoading = false;
    },
    err => {
      console.log(err);
      if (err.status === 404) {
        this.pendingList = [];
      }
      this.isPendingRequestDataLoading = false;
    });
  }

  processPendingList(list) {
    const parsedList = [];
    for (let i = 0; i < list.length; i++) {
      const data = {
        firstname: list[i].sent_by.firstname,
        lastname: list[i].sent_by.lastname,
        mobile_number: list[i].sent_by.mobile_number,
        request_id: list[i]._id,
        _id: list[i].sent_by._id,
        created_at: list[i].created_at
      };
      parsedList.push(data);
    }
    return parsedList;
  }

  acceptFriendRequest(_id: string) {
    this.contactService.acceptFriendRequest(_id)
      .subscribe(data => {
        this.showSnackBar('Request Accepted', 'OK');
        this.loadPendingRequest();
      },
      err => {
        this.showSnackBar('Something went wrong! Please Try Again', 'OK');
      });
  }

  declineFriendRequest(_id: string) {
    this.contactService.declineFriendRequest(_id)
    .subscribe(data => {
      this.showSnackBar('Request Declined', 'OK');
      this.loadPendingRequest();
    },
    err => {
      this.showSnackBar('Something went wrong! Please Try Again', 'OK');
    });
  }

  logout() {
    this.loginService.logOut();
    this.showSnackBar('Log Out Successfull', 'OK');
    this.router.navigate(['/login']);
    return;
  }

  showSnackBar(msg: string, action: string) {
      this.dataSharingService.showSnackBar.next({message: msg, action: action});
  }

}
