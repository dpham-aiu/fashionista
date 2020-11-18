import { Product } from './../../models/product';
import { AdminPortalService } from './../../admin-portal/admin-portal.service';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  selectedCompany: String;
  productList: Product[] = [];
  brandList: Company[] = [];
  sortedList: Product[] = [];
  constructor(private adminService: AdminPortalService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCompanies();
  }

  getAllProducts() {
    this.adminService.getProducts().subscribe(
      (data) => {
        this.productList = data;
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
            (err) => console.log(err),
            () => {
              this.sortedList = this.productList;
            }
          );
        });
      }
    );
  }

  getAllCompanies(): void {
    this.adminService.getCompanies().subscribe(
      (data) => {
        this.brandList = data;
      },
      (err) => console.log(err)
    );
  }

  sortList(val): void {
    this.sortedList = [];
    for (let product of this.productList) {
      if (product.companyName == val) {
        this.sortedList.push(product);
      }
      if (val == '') {
        this.sortedList = this.productList;
      }
    }
  }
}
