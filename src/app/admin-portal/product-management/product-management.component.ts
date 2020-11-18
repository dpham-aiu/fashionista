import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { AdminPortalService } from '../admin-portal.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  productList: Product[];
  brandList: Company[] = [];
  constructor(
    private adminService: AdminPortalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.adminService.getProducts().subscribe(
      (data) => {
        this.productList = data;
        console.log(data);
      },
      (err) => console.log(err),
      () => {
        let comp: Company;
        this.productList.forEach((data) => {
          this.adminService.getCompanyById(data.company).subscribe(
            (result) => {
              comp = result;
              data.companyName = comp.companyName;
            },
            (err) => console.log(err)
          );
        });
      }
    );
  }

  deleteProduct(id): void {
    if (confirm('Are you sure you want to delete ' + id)) {
      this.adminService.deleteProductById(id).subscribe(
        (res) => {
          alert('Product deleted' + res);
        },
        (err) => {
          console.log(err);
        },
        () => {
          location.reload();
        }
      );
    }
  }
}
