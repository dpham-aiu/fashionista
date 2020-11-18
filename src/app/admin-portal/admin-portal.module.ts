import { AuthGuard } from './../auth/auth.guard';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { AdminPortalComponent } from './admin-portal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'admin-portal',
    component: AdminPortalComponent,
    children: [
      {
        path: 'company',
        component: CompanyManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-company',
        component: AddCompanyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-company/:id',
        component: EditCompanyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product-management',
        component: ProductManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminPortalComponent,
    CompanyManagementComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ProductManagementComponent,
    AddProductComponent,
    EditProductComponent,
    UserManagementComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class AdminPortalModule {}
