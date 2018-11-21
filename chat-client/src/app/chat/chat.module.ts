import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHomeComponent, BottomSheetComponent } from './chat-home/chat-home.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { ChatSearchComponent } from './chat-search/chat-search.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [ {
  path: '',
  component: ChatHomeComponent,
  pathMatch: 'prefix',
  children: [{
    path: '', component: MessagesComponent
  },
    {
      path: 'search', component: ChatSearchComponent
    },
  {
    path: 'profile', component: ProfileComponent
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  declarations: [ChatHomeComponent, ChatSearchComponent, MessagesComponent, MessageViewComponent, ProfileComponent, BottomSheetComponent]
})
export class ChatModule { }
