import { TestBed } from '@angular/core/testing';

import { GuessMyNumberService } from './guess-my-number.service';

describe('GuessMyNumberService', () => {
  let service: GuessMyNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessMyNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
