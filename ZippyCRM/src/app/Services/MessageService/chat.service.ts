import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7269/ChatHub', {
      withCredentials: true, // Allow credentials
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start();
    this.connection.on(
      'ReceiveMessage',
      (user: string, message: string, messageTime: string) => {
        this.messages = [...this.messages, { user, message, messageTime }];
        this.messages$.next(this.messages);
      }
    );

    this.connection.on('ConnectedUser', (users: any) => {
      this.connectedUsers$.next(users);
    });
  }

  //start connection
  public async start() {
    debugger;
    try {
      await this.connection.start();
    } catch (error) {}
  }

  //Join Room
  public async joinRoom(user: string, room: string) {
    return this.connection.invoke('JoinRoom', { user, room });
  }

  // Send Messages
  public async sendMessage(message: string) {
    return this.connection.invoke('SendMessage', message);
  }

  //leave
  public async leaveChat() {
    return this.connection.stop();
  }
}
