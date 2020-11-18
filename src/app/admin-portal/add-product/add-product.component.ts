import { AdminPortalService } from './../admin-portal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  companyList = [];
  addProductForm: FormGroup;
  errors: any = [];
  notify: string;
  selectedCompany: String;
  constructor(
    private adminService: AdminPortalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.adminService.getCompanies().subscribe(
      (data) => {
        this.companyList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addProduct(): void {
    this.errors = [];
    this.adminService.addProduct(this.addProductForm.value).subscribe(
      (res) => {
        alert('Product has been added');
        this.router.navigate(['/admin-portal/product-management']);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
  }

  isValidInput(fieldName): boolean {
    return (
      this.addProductForm.controls[fieldName].invalid &&
      (this.addProductForm.controls[fieldName].dirty ||
        this.addProductForm.controls[fieldName].touched)
    );
  }

  initForm(): void {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      imageURL: ['', Validators.required],
      quantity: ['', Validators.required],
      company: ['', Validators.required],
    });
  }
}
