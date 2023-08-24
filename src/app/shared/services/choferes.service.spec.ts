import { TestBed } from '@angular/core/testing';

import { ChoferService } from './choferes.service';

describe('ChoferesService', () => {
  let service: ChoferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
