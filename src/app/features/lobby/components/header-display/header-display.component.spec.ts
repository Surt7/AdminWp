import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderDisplayComponent } from './header-display.component';

describe('HeaderDisplayComponent', () => {
  let component: HeaderDisplayComponent;
  let fixture: ComponentFixture<HeaderDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderDisplayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
