import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclassFormComponent } from './myclass-form.component';

describe('MyclassFormComponent', () => {
  let component: MyclassFormComponent;
  let fixture: ComponentFixture<MyclassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyclassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyclassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
