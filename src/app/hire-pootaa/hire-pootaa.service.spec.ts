import { TestBed } from '@angular/core/testing';

import { HirePootaaService } from './hire-pootaa.service';

describe('HirePootaaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HirePootaaService = TestBed.get(HirePootaaService);
    expect(service).toBeTruthy();
  });
});
