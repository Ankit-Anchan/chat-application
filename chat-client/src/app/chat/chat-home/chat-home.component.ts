import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  constructor(private socketService: SocketService,
              private dataSharingService: DataSharingService,
              private bottomSheet: MatBottomSheet) {
    this.socketService.initSocket();
    this.dataSharingService.onDisconnect.subscribe(data => {
      console.log('opening bottom sheet');
      this.bottomSheet.open(BottomSheetComponent);
    });
   }

  ngOnInit() { }

}

@Component({
  selector: 'app-bottom-sheet-component',
  template: '<mat-nav-list><span mat-list-item>SERVER DISCONNECTED</span></mat-nav-list>'
})
export class BottomSheetComponent {
    constructor(private dataSharingService: DataSharingService,
                private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {
      this.dataSharingService.onConnect.subscribe(data => {
        this.bottomSheetRef.dismiss();
      });
    }

}
