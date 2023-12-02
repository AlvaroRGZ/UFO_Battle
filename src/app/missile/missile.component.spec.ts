import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissileComponent } from './missile.component';

describe('MissileComponent', () => {
  let component: MissileComponent;
  let fixture: ComponentFixture<MissileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissileComponent]
    });
    fixture = TestBed.createComponent(MissileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
