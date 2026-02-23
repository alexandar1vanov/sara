import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {User} from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly #url = 'https://jsonplaceholder.typicode.com/users';
  readonly #http = inject(HttpClient);
  #cachedUsers: User[] = JSON.parse(localStorage.getItem('my_users') || '[]');

  getAllUsers(): Observable<User[]> {
    if (this.#cachedUsers.length > 0) {
      return of(this.#cachedUsers);
    }
    return this.#http.get<User[]>(this.#url).pipe(
      tap(users => {
        this.#cachedUsers = users;
        this.#saveToStorage();
      })
    );
  }

  addUserLocally(newUser: User) {
    this.#cachedUsers = [newUser, ...this.#cachedUsers];
    this.#saveToStorage();
  }

  deleteUserLocally(id: number) {
    this.#cachedUsers = this.#cachedUsers.filter(u => u.id !== id);
    this.#saveToStorage();
    return this.#cachedUsers;
  }

  #saveToStorage() {
    localStorage.setItem('my_users', JSON.stringify(this.#cachedUsers));
  }

  getUserById(id: number): User | undefined {
    return this.#cachedUsers.find(u => u.id === id)
  }

  updateUser(updatedUser: User) {
    const index = this.#cachedUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.#cachedUsers[index] = updatedUser;
      this.#saveToStorage();
    }
  }
}
