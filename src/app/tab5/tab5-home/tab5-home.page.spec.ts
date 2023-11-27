import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab5HomePage } from './tab5-home.page';

describe('Tab5HomePage', () => {
  let component: Tab5HomePage;
  let fixture: ComponentFixture<Tab5HomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab5HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
