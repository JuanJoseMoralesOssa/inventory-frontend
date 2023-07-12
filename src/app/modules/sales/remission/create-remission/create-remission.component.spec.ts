import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemissionComponent } from './create-remission.component';

describe('CreateRemissionComponent', () => {
  let component: CreateRemissionComponent;
  let fixture: ComponentFixture<CreateRemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRemissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
