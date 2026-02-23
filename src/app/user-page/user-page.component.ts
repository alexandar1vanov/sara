import {Component, inject, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service/user-service.service';
import {User} from '../interfaces/user-interface';
import {UserCardComponent} from '../user-card/user-card.component';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-page',
  imports: [
    UserCardComponent,
    RouterLink
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {

  readonly #userService = inject(UserServiceService);

  users: User[] = [];
  filteredUsers: User[] = [];
  #subject = new Subject<string>();

  currentSearch = '';
  currentSort = 'name-asc';

  ngOnInit(): void {
    this.fetchUsers();
    this.searchUsers();
  }

  fetchUsers() {
    if (!(this.users.length > 0)) {
      this.#userService.getAllUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.applyFilterAndSort()
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  searchUsers() {
    this.#subject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe({
      next: (searchValue) => {
        this.currentSearch = searchValue;
        this.applyFilterAndSort()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  applyFilterAndSort() {
    const value = this.currentSearch.toLowerCase().trim();

    let result = this.users.filter(user =>
      user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
    );

    if (this.currentSort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.currentSort === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    this.filteredUsers = result;
  }

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value;
    this.applyFilterAndSort();
  }

  onChange(value: string) {
    this.#subject.next(value);
  }

  handleDelete(id: number) {
    this.users = this.#userService.deleteUserLocally(id);
    this.applyFilterAndSort();
  }
}
