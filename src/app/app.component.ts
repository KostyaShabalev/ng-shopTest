import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ng-frontend';
  isReady: boolean;

  constructor(private authService: AuthorizationService) {

    this.authService.isReady().pipe(
      tap((state: boolean) => {
        this.isReady = state;
      })
    ).subscribe();

 }

}
