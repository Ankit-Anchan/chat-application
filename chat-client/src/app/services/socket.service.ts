import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DataSharingService } from './data-sharing.service';
import { CustomCookieService } from './custom-cookie.service';

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;
    private info: any;

    constructor(private dataSharingService: DataSharingService, private cookieService: CustomCookieService) { }

    initSocket() {
        this.socket = io(environment.server_url);
        console.log('socket initialized');
        this.info = JSON.parse(this.cookieService.getCookie('info'));
        this.onConnect();
    }

    onConnect() {
        this.socket.on('connect', (data) => {
            console.log('socket connection established');
            this.dataSharingService.onConnect.next('connected');
            this.socket.emit('new_user', {sent_by: this.info.mobile_number});

            // New friend request
            this.socket.on('new_request', (_data) => {
                console.log('new request socket service invoked');
                this.dataSharingService.newFriendRequest.next(_data);
            });

            this.socket.on('accept_request', (_data) => {
                console.log('accept request socket service invoked');
                this.dataSharingService.newRequestAccept.next(_data);
            });
        });
    }

    getSocket() {
        if (this.socket) {
           return this.socket;
        }
        return null;
    }

    onDisconnect() {
        this.socket.on('disconnect', () => {
            console.log('socket disconnected');
        });
    }
}
