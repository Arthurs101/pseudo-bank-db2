import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../usermodels.model';
import { minibankService } from '../backend.service';
import { Branch } from '../miscmodels.models';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @Input() accounts: Account[] | undefined;
  @Input() view: number = 0;
  places: Branch[] = []
  account_types = [{id:'monetary',value:"Monetaria"}, {id:'savings', value:"Ahorros"}, {id:'business',value:"Comercial"}]
  currencies = ['USD', 'GTQ', 'EUR', 'GBP']
  constructor(private service:minibankService)
  {
    this.service.getPlaces().subscribe(
      (res:Branch[]) => {
        this.places = res
      },
      (error) => {
        console.log("cant get places")
      })
   }

  ngOnInit() {
  }

}
