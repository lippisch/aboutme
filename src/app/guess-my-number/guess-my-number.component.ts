import { Component } from '@angular/core';
import { GameResponse, GuessMyNumberService, UserChoice } from '../services/guess-my-number.service';

export enum GameState {
  NotStarted = 'NotStarted',
  Guessing = 'Guessing',
  Waiting = 'Waiting',
  Finished = 'Finished',
  Error = 'Error'
}

@Component({
  selector: 'app-guess-my-number',
  templateUrl: './guess-my-number.component.html',
  styleUrl: './guess-my-number.component.scss'
})
export class GuessMyNumberComponent {

  gameState: GameState = GameState.NotStarted;
  lastGuess?: number;
  latestResponse?: GameResponse;
  lastError?: string;
  guessCount = 0;

  constructor(private gmnSvc: GuessMyNumberService) {

  }

  onStartNewGame() {
    this.gameState = GameState.Guessing;
    this.gmnSvc.startGame().subscribe({
      next: resp => this.handleResponse(resp),
      error: error => this.handleError(error)
      }
    )
  }

  onLower() {
    if (!this.latestResponse) {
      this.lastError = "Invalid state, need to start the game first.";
      return;
    }
    this.lastGuess = undefined;
    this.gameState = GameState.Guessing;
    this.gmnSvc.userResponse(UserChoice.Lower, this.latestResponse).subscribe({
      next: resp => this.handleResponse(resp),
      error: error => this.handleError(error)
      }
    );
  }

  onHigher() {
    if (!this.latestResponse) {
      this.lastError = "Invalid state, need to start the game first.";
      return;
    }
    this.lastGuess = undefined;
    this.gameState = GameState.Guessing;
    this.gmnSvc.userResponse(UserChoice.Higher, this.latestResponse).subscribe({
      next: resp => this.handleResponse(resp),
      error: error => this.handleError(error)
      }
    );
  }

  onFound() {
    this.gameState = GameState.Finished;
  }

  onRestart() {
    this.gameState = GameState.NotStarted;
    this.lastGuess = undefined;
    this.latestResponse = undefined;
  }

  handleResponse(resp: GameResponse) {
    this.gameState = GameState.Waiting;
    this.lastGuess = resp.nextGuess;
    this.guessCount = resp.numbers.length + 1;
    this.latestResponse = resp;
  }

  handleError(error: any) {
    if (error.status == 400) {
      this.lastError = error.error.message;
    } else {
      this.lastError = 'An unexpected problem occured. Please try again later!';
    }
    
    this.gameState = GameState.Error;
  }

}
