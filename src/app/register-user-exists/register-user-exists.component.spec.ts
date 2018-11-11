import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserExistsComponent } from './register-user-exists.component';

describe('RegisterUserExistsComponent', () => {
  let component: RegisterUserExistsComponent;
  let fixture: ComponentFixture<RegisterUserExistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserExistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
