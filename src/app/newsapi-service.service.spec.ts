import { TestBed } from '@angular/core/testing';

import { NewsapiServiceService } from './newsapi-service.service';

describe('NewsapiServiceService', () => {
  let service: NewsapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
