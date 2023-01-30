import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDepotComponent } from './ajout-depot.component';

describe('AjoutDepotComponent', () => {
  let component: AjoutDepotComponent;
  let fixture: ComponentFixture<AjoutDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
