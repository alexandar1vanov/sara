import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../interfaces/user-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../user-service/user-service.service';

@Component({
  selector: 'app-user-form-page',
  imports: [
    FormsModule
  ],
  templateUrl: './user-form-page.component.html',
  styleUrl: './user-form-page.component.scss'
})
export class UserFormPageComponent implements OnInit {

  readonly #userService = inject(UserServiceService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  userToEdit: User | undefined;
  isEditMode = false;

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userToEdit = this.#userService.getUserById(Number(id))
      if (!this.userToEdit) {
        this.#router.navigate(['/users']);
      }
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const formValue = form.value;

    const userData: User = {
      ...(this.isEditMode ? this.userToEdit : {}),
      id: this.isEditMode ? this.userToEdit!.id : Date.now(),
      name: formValue.name,
      email: formValue.email,
      username: formValue.name.toLowerCase().replace(/\s+/g, '_'),
      website: formValue.website || '',
      address: {
        ...this.userToEdit?.address,
        city: formValue.address?.city || '',
        zipcode: formValue.address?.zipcode || '',
        geo: this.userToEdit?.address?.geo || {lat: '0', lng: '0'}
      },
      company: {
        ...this.userToEdit?.company,
        name: formValue.company?.name || '',
        catchPhrase: formValue.company?.catchPhrase || '',
        bs: this.userToEdit?.company?.bs || ''
      }
    } as User;

    if (this.isEditMode) {
      this.#userService.updateUser(userData);
    } else {
      this.#userService.addUserLocally(userData);
    }
    this.#router.navigate(['/users']);
  }

  onCancel(form: NgForm): void {
    if (this.isEditMode) {
      this.#router.navigate(['/users']);
    } else {
      form.resetForm();
    }
  }
}
