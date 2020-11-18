import { UserPortalService } from './../user-portal.service';
import { User } from 'src/app/models/user';
import { AuthService } from './../../auth/auth.service';
import { Purchase } from './../../models/purchase';
import { Item } from './../../models/item';
import { ActivatedRoute } from '@angular/router';
import { AdminPortalService } from './../../admin-portal/admin-portal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;
  totalQuantity: number = 0;
  user: User;
  paymentForm: any = {};
  orderComplete: boolean = false;
  constructor(
    private adminService: AdminPortalService,
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private userService: UserPortalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      var id = params['id'];
      if (id) {
        var productName, price, productId;
        this.adminService.getProductById(id).subscribe(
          (data) => {
            productName = data.productName;
            price = data.price;
            productId = data._id;
          },
          (err) => console.log(err),
          () => {
            console.log(productName);
            var item: Item = {
              productId: productId,
              productName: productName,
              price: price,
              quantity: 1,
            };
            if (localStorage.getItem('cart') == null) {
              console.log('Creating new cart');
              let cart: any = [];
              cart.push(JSON.stringify(item));
              localStorage.setItem('cart', JSON.stringify(cart));
            } else {
              let cart: any = JSON.parse(localStorage.getItem('cart'));
              let index: number = -1;
              for (var i = 0; i < cart.length; i++) {
                let item: Item = JSON.parse(cart[i]);
                if (item.productId == id) {
                  index = i;
                  break;
                }
              }
              if (index == -1) {
                cart.push(JSON.stringify(item));
                localStorage.setItem('cart', JSON.stringify(cart));
              } else {
                let item: Item = JSON.parse(cart[index]);
                item.quantity += 1;
                cart[index] = JSON.stringify(item);
                localStorage.setItem('cart', JSON.stringify(cart));
              }
            }
            this.loadCart();
          }
        );
      } else {
        // if (this.items.length == 0) {
        //   return;
        // }
        console.log('calling load cart');
        this.loadCart();
      }
    });
    this.getUserInfo();
  }

  loadCart(): void {
    this.totalQuantity = 0;
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));

    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      console.log(this.items);
      this.items.push({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      });
      this.totalQuantity += item.quantity;
      this.total += item.price * item.quantity;
      Math.round((this.total + Number.EPSILON) * 100) / 100;
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.productId == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

  checkOut() {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let purchase: Purchase = {
      purchases: cart,
      userId: this.user._id,
      fullName: this.paymentForm.fullName,
      email: this.paymentForm.email,
      address: this.paymentForm.address,
      city: this.paymentForm.city,
      state: this.paymentForm.state,
      zip: this.paymentForm.zip,
      cardName: this.paymentForm.cardname,
      cardNumber: this.paymentForm.cardnumber,
      expmonth: this.paymentForm.expmonth,
      expyear: this.paymentForm.expyear,
      cvv: this.paymentForm.cvv,
    };
    if (
      confirm(`Are you sure you want to purchase the items for $${this.total}?`)
    ) {
      this.userService.addItem(purchase).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => console.log(err),
        () => {
          this.orderComplete = true;
          localStorage.removeItem('cart');
        }
      );
    } else {
      this.orderComplete = false;
      alert(`${this.paymentForm.fullName}'s transaction has been canceled.`);
    }
  }

  getUserInfo(): void {
    this.AuthService.getUserById(this.AuthService.getUserId()).subscribe(
      (data) => {
        this.user = data;
      },
      (err) => console.log(err),
      () => {}
    );
  }
}
