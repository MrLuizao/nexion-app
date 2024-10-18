import { TestBed } from '@angular/core/testing';

import { ListRestService } from './list-rest.service';

describe('ListRestService', () => {
  let service: ListRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
