import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export enum UserChoice {
  Lower = 'lower',
  Higher = 'higher',
  Found = 'found'
}

export class Game {
  numbers: number[] = [];
  min?: number;
  max?: number;
}

class GMNArguments {
  numbers: number[] = [];
  is?: UserChoice;
}

export interface GameResponse {
  numbers: number[];
  nextGuess: number;
  min: number;
  max: number;
}

// TODO: move to a configuration
const API_PATH = "/api/guessMyNumber";


/**
 * Interacts with the 'GuessMyNumber' service hosted in AWS. The state of a 
 * game is represented in a Game object, which is 
 */
@Injectable({
  providedIn: 'root'
})
export class GuessMyNumberService {


  constructor(private http: HttpClient) { }

  startGame(): Observable<GameResponse> {
    let gmnArgs = new GMNArguments();

    return this.http.post<GameResponse>(API_PATH, gmnArgs);

  }

  userResponse(result: UserChoice, lastResponse: GameResponse): Observable<GameResponse> {
    let gmnArgs = new GMNArguments();
    gmnArgs.numbers = lastResponse.numbers;
    gmnArgs.numbers.push(lastResponse.nextGuess);
    gmnArgs.is = result;

    return this.http.post<GameResponse>(API_PATH, gmnArgs);

  }

}
