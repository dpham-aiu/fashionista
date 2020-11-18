import { User } from './../../models/user';
import { AdminPortalService } from './../admin-portal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userList: User[];
  constructor(private adminService: AdminPortalService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe((data) => {
      this.userList = data;
    });
  }

  deleteUser(id): void {
    if (confirm('Are you sure you want to delete ' + id)) {
      this.adminService.deleteUserById(id).subscribe(
        (res) => {
          alert('User deleted' + res);
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
