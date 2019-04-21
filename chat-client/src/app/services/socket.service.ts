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

            this.socket.on('downstream_message', (_data) => {
                console.log('downstream message socket service invoked');
                console.log('socket id = ' + this.socket.id);
                this.dataSharingService.newMessage.next(_data);
            });

            this.socket.on('disconnect', () => {
                console.log('socket disconnected');
                this.dataSharingService.onDisconnect.next({});
                // this.socket.removeAllListeners();
            });
        });

        // this.dataSharingService.sendMessage.subscribe(_data => {
        //     console.log('socket id = ' + this.socket.id);
        //     console.log('emitting a new message');
        //     console.log(_data);
        //     this.socket.emit('upstream_message', _data);
        // });
        this.dataSharingService.logOut.subscribe(_data => {
            this.socket.emit('log_out', _data);
        });
    }

    sendMessage(_message) {
        console.log('socket id = ' + this.socket.id);
        console.log('emitting a new message');
        console.log(_message);
        this.socket.emit('upstream_message', _message);
    }

    getSocket() {
        if (this.socket) {
           return this.socket;
        }
        return null;
    }
}
