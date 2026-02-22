import {Component, inject, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service/user-service.service';
import {User} from '../interfaces/user-interface';
import {UserCardComponent} from '../user-card/user-card.component';

@Component({
  selector: 'app-user-page',
  imports: [
    UserCardComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {

  readonly #userService = inject(UserServiceService);
  users: User[] = [];

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.#userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('this.users', this.users)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
