import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EfemeridesDescPage } from './efemerides-desc.page';

describe('EfemeridesDescPage', () => {
  let component: EfemeridesDescPage;
  let fixture: ComponentFixture<EfemeridesDescPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EfemeridesDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
