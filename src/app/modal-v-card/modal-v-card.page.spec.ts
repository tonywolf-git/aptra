import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalVCardPage } from './modal-v-card.page';

describe('ModalVCardPage', () => {
  let component: ModalVCardPage;
  let fixture: ComponentFixture<ModalVCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalVCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
