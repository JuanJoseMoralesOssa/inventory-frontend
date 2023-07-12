import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRemissionComponent } from './edit-remission.component';

describe('EditRemissionComponent', () => {
  let component: EditRemissionComponent;
  let fixture: ComponentFixture<EditRemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRemissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
