import { TestBed } from '@angular/core/testing';

import { ChatAboutMeService } from './chat-about-me.service';

describe('ChatAboutMeService', () => {
  let service: ChatAboutMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAboutMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
