import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessMyNumberComponent } from './guess-my-number.component';

describe('GuessMyNumberComponent', () => {
  let component: GuessMyNumberComponent;
  let fixture: ComponentFixture<GuessMyNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessMyNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessMyNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
