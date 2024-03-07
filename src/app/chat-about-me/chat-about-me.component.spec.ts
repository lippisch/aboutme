import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAboutMeComponent } from './chat-about-me.component';

describe('ChatAboutMeComponent', () => {
  let component: ChatAboutMeComponent;
  let fixture: ComponentFixture<ChatAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatAboutMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
