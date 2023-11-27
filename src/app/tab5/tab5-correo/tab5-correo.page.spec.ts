import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab5CorreoPage } from './tab5-correo.page';

describe('Tab5CorreoPage', () => {
  let component: Tab5CorreoPage;
  let fixture: ComponentFixture<Tab5CorreoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab5CorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
