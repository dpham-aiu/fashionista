import { AdminPortalService } from './../admin-portal.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit {
  addCompanyForm: FormGroup;
  errors: any = [];
  notify: string;
  constructor(
    private adminService: AdminPortalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  addCompany(): void {
    this.errors = [];
    this.adminService.addCompany(this.addCompanyForm.value).subscribe(
      (res) => {
        alert('Company has been added');
        this.router.navigate(['/admin-portal/company']);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
  }

  isValidInput(fieldName): boolean {
    return (
      this.addCompanyForm.controls[fieldName].invalid &&
      (this.addCompanyForm.controls[fieldName].dirty ||
        this.addCompanyForm.controls[fieldName].touched)
    );
  }

  initForm(): void {
    this.addCompanyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      companyDescription: ['', Validators.required],
    });
  }
}
