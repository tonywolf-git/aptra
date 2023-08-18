import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiaPassPage } from './cambia-pass.page';

describe('CambiaPassPage', () => {
  let component: CambiaPassPage;
  let fixture: ComponentFixture<CambiaPassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambiaPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
