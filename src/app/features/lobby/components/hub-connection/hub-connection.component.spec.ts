import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubStatusConnection } from './hub-connection.component';

describe('HubConnection', () => {
  let component: HubStatusConnection;
  let fixture: ComponentFixture<HubStatusConnection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubStatusConnection],
    }).compileComponents();

    fixture = TestBed.createComponent(HubStatusConnection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
