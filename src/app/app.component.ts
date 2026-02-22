import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserPageComponent} from './user-page/user-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'UserService';

  ngOnInit(): void {
  }
}
