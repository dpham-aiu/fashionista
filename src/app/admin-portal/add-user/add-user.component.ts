import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  formData: any = {};
  errors: any = [];
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(): void {
    this.errors = [];
    this.authService.register(this.formData).subscribe(
      () => {
        this.router.navigate(['/admin-portal/user-management']);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
  }
}
