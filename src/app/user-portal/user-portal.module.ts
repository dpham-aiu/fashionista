import { UserPortalComponent } from '../user-portal/user-portal.component';
import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'user-portal',
    component: UserPortalComponent,
    children: [
      { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      {
        path: 'cart/:id',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [UserPortalComponent, ShopComponent, CartComponent],
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
export class UserPortalModule {}
