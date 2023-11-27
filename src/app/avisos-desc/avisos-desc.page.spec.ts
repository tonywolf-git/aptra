import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisosDescPage } from './avisos-desc.page';

describe('AvisosDescPage', () => {
  let component: AvisosDescPage;
  let fixture: ComponentFixture<AvisosDescPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvisosDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
