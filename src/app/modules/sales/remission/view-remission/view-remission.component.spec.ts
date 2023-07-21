import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemissionComponent } from './view-remission.component';

describe('ViewRemissionComponent', () => {
  let component: ViewRemissionComponent;
  let fixture: ComponentFixture<ViewRemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRemissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
