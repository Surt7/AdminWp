import { ComponentFixture, TestBed } from '@angular/core/testing';
import BodyDisplayComponent from './body-display.component';

describe('BodyDisplay', () => {
  let component: BodyDisplayComponent;
  let fixture: ComponentFixture<BodyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyDisplayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
