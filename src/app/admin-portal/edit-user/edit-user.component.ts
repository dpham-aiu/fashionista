import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPortalService } from '../admin-portal.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  formData: any = {};
  errors: any = [];
  id: number;
  user: User;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminPortalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = params['id'];
      },
      (err) => {
        if (err) console.log(err);
      }
    );
    this.auth.getUserById(this.id.toString()).subscribe((data) => {
      this.user = data;
      this.formData = {
        username: this.user.username,
        email: this.user.email,
      };
    });
  }

  updateUser(): void {
    this.errors = [];
    this.adminService.updateUserById(this.formData, this.id).subscribe(
      (res) => {
        alert('User has been updated');
        this.router.navigate(['/admin-portal/user-management']);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
  }
}
