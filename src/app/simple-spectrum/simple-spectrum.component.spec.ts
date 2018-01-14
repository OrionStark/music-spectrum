import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSpectrumComponent } from './simple-spectrum.component';

describe('SimpleSpectrumComponent', () => {
  let component: SimpleSpectrumComponent;
  let fixture: ComponentFixture<SimpleSpectrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSpectrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSpectrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
