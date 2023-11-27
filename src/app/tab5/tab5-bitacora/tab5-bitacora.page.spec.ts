import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab5BitacoraPage } from './tab5-bitacora.page';

describe('Tab5BitacoraPage', () => {
  let component: Tab5BitacoraPage;
  let fixture: ComponentFixture<Tab5BitacoraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab5BitacoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
