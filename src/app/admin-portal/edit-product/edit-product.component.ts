import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AdminPortalService } from '../admin-portal.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  companyList = [];
  updateProductForm: FormGroup;
  errors: any = [];
  notify: string;
  selectedCompany: String;
  id: number;
  product: Product;
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
    this.adminService.getCompanies().subscribe(
      (data) => {
        this.companyList = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.adminService.getProductById(this.id).subscribe((data) => {
      this.product = data;
      this.updateProductForm.setValue({
        productName: this.product.productName,
        productDescription: this.product.productDescription,
        price: this.product.price,
        imageURL: this.product.imageURL,
        quantity: this.product.quantity,
        company: this.product.company,
      });
    });
    this.initForm();
  }

  isValidInput(fieldName): boolean {
    return (
      this.updateProductForm.controls[fieldName].invalid &&
      (this.updateProductForm.controls[fieldName].dirty ||
        this.updateProductForm.controls[fieldName].touched)
    );
  }

  initForm(): void {
    this.updateProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      imageURL: ['', Validators.required],
      quantity: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  updateProduct(): void {
    this.errors = [];
    this.adminService
      .updateProductById(this.updateProductForm.value, this.id)
      .subscribe(
        (res) => {
          alert('Product has been updated');
          this.router.navigate(['/admin-portal/product-management']);
        },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        }
      );
  }
}
