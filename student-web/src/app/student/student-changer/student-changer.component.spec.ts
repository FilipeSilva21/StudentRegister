import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChangerComponent } from './student-changer.component';

describe('StudentChangerComponent', () => {
  let component: StudentChangerComponent;
  let fixture: ComponentFixture<StudentChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentChangerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
