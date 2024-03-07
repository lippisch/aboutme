import { Component, ElementRef, ViewChild } from '@angular/core';
import { AssistantThread, ChatAboutMeService, ChatMessage, ChatResponse, ThreadStatus } from '../services/chat-about-me.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-about-me',
  templateUrl: './chat-about-me.component.html',
  styleUrl: './chat-about-me.component.scss'
})
export class ChatAboutMeComponent {

  conversationId: string|null = null;
  loading = true;
  startingUp = true;
  errorState = false;
  errorMessage: string = '';
  lastNavigationId: string|null  = null;
  username = 'Anonymous'

  chatText: string = '';

  chatHistory: ChatMessage[] = [];
  @ViewChild('chatArea', { static: false }) chatArea?: ElementRef;
  @ViewChild('msgInput') msgInput?: ElementRef;

  constructor(
    private chatSvc: ChatAboutMeService,
    private router: Router,) {

    this.startingUp = false;
    this.loading = false;
  }

  startOver() {
    this.conversationId = null;
    this.chatHistory = [];
  }

  checkForCtrlEnter(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
        this.sendMessage();
    }
  }

  quickStart(message: string) {
    this.chatText = message;
    this.sendMessage();
  }

  sendMessage() {

    let message = this.chatText.trim();

    if (!this.loading && !this.errorState) {

      if (message.length == 0) {
        // TODO handle error
        return;
      }

      if (!this.conversationId) {
        // the conversation didn't start yet, so we have to kick it off
        this.chatSvc.startConversation(this.username, message).subscribe({
          next: (response:any) => {
            console.log(response)
            this.conversationId = response.conversationId;
            this.updateThread(response);
          }
        });
      } else {

        this.chatSvc.postMessage(this.conversationId, message).subscribe({
          next: (at:ChatResponse) => this.updateThread(at)
        });

      }
      this.chatHistory.push(new ChatMessage(this.chatText, true)); // already add it, so it does not flicker when we receive it back.
      this.loading = true;
      this.chatText = '';
      this.scrollChatToBottom();
      this.msgInput?.nativeElement.focus();
    }
  }

  updateThread(at: ChatResponse) {
    if (at.conversationId != this.conversationId) {
      return; // ignore any events that may come from an instance we are no longer interested in...
    }

    /*
    if (at.navigationTarget && at.navigationId && at.navigationId !== this.lastNavigationId) {
      this.handleNavigation(at.navigationTarget);
      this.lastNavigationId = at.navigationId;
    }
    */

    this.startingUp = false;
    if (at.messages && at.messages.length > 0) {
      // status updates contain no messages, so we keep what we have...
      this.chatHistory = [];
      at.messages.forEach(msg => {
        if (msg.message) {
          this.chatHistory.push(new ChatMessage(msg.message, msg.role === 'user'))
        }
      });
    }

    if (at.state == 'ready') {
      this.loading = false;
    } else {
      if (at.state == 'running') {
        this.loading = true;
        this.autoRefresh();
      } else {
        this.loading = false;
      }
    }
    this.scrollChatToBottom();
  }

  handleNavigation(target: string) {
    console.log(`Navigating to ${target}`);
    if (target === 'goto_cv') {
      this.router.navigate(['/about']);
    }
  }

  autoRefresh() {
    setTimeout(() => this.refresh(), 700);
  }

  refresh() {
    if (!this.conversationId) return;
    this.chatSvc.getUpdate(this.conversationId).subscribe({
      next: (at:any) => this.updateThread(at),
      error: (err:any) => this.handleCommsError(err)
    });
  }

  handleCommsError(err:any) {
    console.error(err);
    this.errorState = true;
    this.errorMessage = `Error: ${err.message}`;
    this.loading = false;
    this.startingUp = false;
  }

  scrollChatToBottom() {
    setTimeout(() => {
      if (this.chatArea) {
        const element: HTMLDivElement = this.chatArea.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    });
  }

}
