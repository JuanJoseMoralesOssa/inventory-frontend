import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRemissionComponent } from './delete-remission.component';

describe('DeleteRemissionComponent', () => {
  let component: DeleteRemissionComponent;
  let fixture: ComponentFixture<DeleteRemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRemissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
