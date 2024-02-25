import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarTransaccionComponent } from './realizar-transaccion.component';

describe('RealizarTransaccionComponent', () => {
  let component: RealizarTransaccionComponent;
  let fixture: ComponentFixture<RealizarTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizarTransaccionComponent]
    });
    fixture = TestBed.createComponent(RealizarTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
