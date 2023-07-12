import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRemissionComponent } from './list-remission.component';

describe('ListRemissionComponent', () => {
  let component: ListRemissionComponent;
  let fixture: ComponentFixture<ListRemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRemissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
