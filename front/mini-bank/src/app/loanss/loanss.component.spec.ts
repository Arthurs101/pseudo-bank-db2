import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanComponent } from './loanss.component';

describe('LoanssComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});