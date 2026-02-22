import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly #url = 'https://jsonplaceholder.typicode.com/users';
  readonly #http = inject(HttpClient);

  getAllUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#url)
  }
}
