import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public onConnect = new Subject<any>();
    public newFriendRequest = new Subject<any>();
    public newRequestAccept = new Subject<any>();
    public newRequestDecline = new Subject<any>();
    public showSnackBar = new Subject<any>();
}
