import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beer } from './beer';

describe('Beer', () => {
  let component: Beer;
  let fixture: ComponentFixture<Beer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
