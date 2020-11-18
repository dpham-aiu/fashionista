import { Company } from 'src/app/models/company';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminPortalService } from '../admin-portal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent implements OnInit {
  id: number;
  updateCompanyForm: FormGroup;
  errors: any = [];
  notify: string;
  company: Company;
  constructor(
    private adminService: AdminPortalService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
    this.adminService.getCompanyById(this.id).subscribe((data) => {
      this.company = data;
      this.updateCompanyForm.setValue({
        companyName: this.company.companyName,
        companyDescription: this.company.companyDescription,
      });
    });
    this.initForm();
  }

  updateCompany(): void {
    this.errors = [];
    this.adminService
      .updateCompanyById(this.updateCompanyForm.value, this.id)
      .subscribe(
        (res) => {
          alert('Company has been updated');
          this.router.navigate(['/admin-portal/company']);
        },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        }
      );
  }

  initForm(): void {
    this.updateCompanyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      companyDescription: ['', Validators.required],
    });
  }

  isValidInput(fieldName): boolean {
    return (
      this.updateCompanyForm.controls[fieldName].invalid &&
      (this.updateCompanyForm.controls[fieldName].dirty ||
        this.updateCompanyForm.controls[fieldName].touched)
    );
  }
}
