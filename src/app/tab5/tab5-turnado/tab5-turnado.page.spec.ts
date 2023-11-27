import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab5TurnadoPage } from './tab5-turnado.page';

describe('Tab5TurnadoPage', () => {
  let component: Tab5TurnadoPage;
  let fixture: ComponentFixture<Tab5TurnadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab5TurnadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
