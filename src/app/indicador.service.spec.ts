import { TestBed } from '@angular/core/testing';

import { IndicadorService } from './indicador.service';

describe('IndicadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndicadorService = TestBed.get(IndicadorService);
    expect(service).toBeTruthy();
  });
});
