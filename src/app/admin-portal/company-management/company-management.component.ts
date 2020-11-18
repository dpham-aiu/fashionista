import { Router } from '@angular/router';
import { AdminPortalService } from './../admin-portal.service';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css'],
})
export class CompanyManagementComponent implements OnInit {
  companyList: Company[] = [];
  constructor(
    private adminService: AdminPortalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies(): void {
    this.adminService.getCompanies().subscribe(
      (data) => {
        this.companyList = data;
        console.log(data);
      },
      (err) => console.log(err)
    );
  }

  deleteCompany(id): void {
    if (confirm('Are you sure you want to delete ' + id)) {
      this.adminService.deleteCompanyById(id).subscribe(
        (res) => {
          alert('Company deleted' + res);
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
