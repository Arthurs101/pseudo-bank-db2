import { Component, OnInit } from '@angular/core';
import { minibankService } from '../backend.service';
import { User } from '../usermodels.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  user: User | null = null;

  constructor(private service: minibankService) {}

  ngOnInit(): void {
    this.user = this.service.getUser();
  }
}
