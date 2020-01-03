import { TestBed } from '@angular/core/testing';

import { AuthModuleService } from './auth-module.service';

describe('AuthModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthModuleService = TestBed.get(AuthModuleService);
    expect(service).toBeTruthy();
  });
});
