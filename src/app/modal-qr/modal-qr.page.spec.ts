import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalQRPage } from './modal-qr.page';

describe('ModalQRPage', () => {
  let component: ModalQRPage;
  let fixture: ComponentFixture<ModalQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
