import { TestBed } from '@angular/core/testing';

import { MovimientoProductosService } from './movimiento-productos.service';

describe('MovimientoProductosService', () => {
  let service: MovimientoProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientoProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
