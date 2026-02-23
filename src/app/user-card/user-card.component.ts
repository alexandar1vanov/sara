import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../interfaces/user-interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() userData!: User;
  @Output() deletedRequest = new EventEmitter<number>();

  onDelete(id: number){
    if (confirm('Are you sure you want to delete this user?')){
      this.deletedRequest.emit(id);
    }
  }
}
