import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQComponent } from './show-q.component';

describe('ShowQComponent', () => {
  let component: ShowQComponent;
  let fixture: ComponentFixture<ShowQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
