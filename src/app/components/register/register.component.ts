import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private registerForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthorizationService,
    private router: Router
    ) { }

  registerUser(): void {

    this.authService.register(this.registerForm.value)
    .subscribe(
      (res: any) => {
        this.router.navigate(['']);
      });
  }

  isInvalid(): boolean {
    return this.registerForm.invalid;
  }

}
