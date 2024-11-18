import { TestBed } from '@angular/core/testing';

import { AuditorioProductosService } from './auditorio-productos.service';

describe('AuditorioProductosService', () => {
  let service: AuditorioProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditorioProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
