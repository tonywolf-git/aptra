import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EfemeridesPage } from './efemerides.page';

describe('EfemeridesPage', () => {
  let component: EfemeridesPage;
  let fixture: ComponentFixture<EfemeridesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EfemeridesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
