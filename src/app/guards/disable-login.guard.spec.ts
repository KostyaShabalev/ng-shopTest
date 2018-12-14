import { TestBed, async, inject } from '@angular/core/testing';

import { DisableLoginGuard } from './disable-login.guard';

describe('DisableLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisableLoginGuard]
    });
  });

  it('should ...', inject([DisableLoginGuard], (guard: DisableLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
