import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';


export enum ThreadStatus {
  NotStarted = 'NotStarted',
  Ready = 'Ready',
  Processing = 'Processing'
}

export class ChatMessage {
  prefix?: string;
  type?: string;
  constructor(public message: string, public sent: boolean = false) {}
}

export class AssistantThread {
  instanceId?: string;
  status?: ThreadStatus;
  navigationTarget?: string;
  navigationId?: string;
  messages: ChatMessage[] = [];
}

export class ChatResponse {
  conversationId?: string;
  state?: string;
  messages?: ChatResponseMessage[];
  missing?: boolean;
}

export class ChatResponseMessage {
  role?: string;
  message?: string;
}

const API_PATH = "/api/chatam";

@Injectable({
  providedIn: 'root'
})
export class ChatAboutMeService {

  private clientId: string;
  private dummyThreads: Map<string, AssistantThread> = new Map<string, AssistantThread>();

  threadUpdatedEvent = new EventEmitter<AssistantThread>();

  constructor(private http: HttpClient) { 
    this.clientId = this.generateUID()
  }


  generateUID(): string {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < array.length; i++) {
      result += array[i].toString(16).padStart(8, '0');
    }
    return result;
  }

  startConversation(username: string, firstMessage: string) {
    let payload = {
      "action" : "start",
      "clientId" : this.clientId,
      "username" : username,
      "message" : firstMessage
    }
    return this.http.post<ChatResponse>(API_PATH, payload);
  }

  postMessage(conversationId: string, message: string) {
    let payload = {
      "action" : "post",
      "conversationId" : conversationId,
      "message" : message
    }
    return this.http.post<ChatResponse>(API_PATH, payload);
  }

  getUpdate(conversationId: string) {
    let payload = {
      "action" : "get_update",
      "conversationId" : conversationId
    }
    return this.http.post<ChatResponse>(API_PATH, payload);
  }

  getAssistantThreadStatus(instanceId: string): Observable<AssistantThread> {
    throw new Error('Method not implemented.');
  }

  dummySendMessage(instanceId: string, message: string) {
    let at = this.dummyThreads.get(instanceId);
    if (!at) {
      at = new AssistantThread();
      at.instanceId = instanceId;
      at.status = ThreadStatus.NotStarted;
      this.dummyThreads.set(instanceId, at);
    }

    at.messages.push(new ChatMessage(message, true));
    at.status = ThreadStatus.Processing;


    at.messages.push(new ChatMessage('That is a very good point, let me check this out for you.'));
    at.status = ThreadStatus.Ready;
    this.threadUpdatedEvent.emit(at);

    return of(at).pipe(
      delay(200)
    );

  }

}
