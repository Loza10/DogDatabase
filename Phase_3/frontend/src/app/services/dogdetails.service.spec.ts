import { TestBed } from '@angular/core/testing';

import { DogDetailsService } from './dogdetails.service';

describe('DogService', () => {
  let service: DogDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
