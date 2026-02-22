import {Component, Input} from '@angular/core';
import {User} from '../interfaces/user-interface';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() userData!: User;

}
