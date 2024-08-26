/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaginatorIntl.service.tsService } from './paginator-intl.service.ts.service';

describe('Service: PaginatorIntl.service.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginatorIntl.service.tsService]
    });
  });

  it('should ...', inject([PaginatorIntl.service.tsService], (service: PaginatorIntl.service.tsService) => {
    expect(service).toBeTruthy();
  }));
});
