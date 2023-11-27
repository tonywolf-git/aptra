import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecadorDescPage } from './checador-desc.page';

describe('ChecadorDescPage', () => {
  let component: ChecadorDescPage;
  let fixture: ComponentFixture<ChecadorDescPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChecadorDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
