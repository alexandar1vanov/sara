import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {User} from '../interfaces/user-interface';
import {UserServiceService} from '../user-service/user-service.service';

@Component({
  selector: 'app-user-details-page',
  imports: [
    RouterLink
  ],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss'
})
export class UserDetailsPageComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #service = inject(UserServiceService);

  user: User | undefined;

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    if (id) {
      const userId = Number(id);
      const user = this.#service.getUserById(userId);
      if (!user) {
        this.#router.navigate(['/users']);
      }
    }
  }

}
