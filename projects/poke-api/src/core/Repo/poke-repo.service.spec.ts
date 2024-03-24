import { TestBed } from '@angular/core/testing';

import { PokeRepoService } from './poke-repo.service';

describe('PokeRepoService', () => {
  let service: PokeRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
