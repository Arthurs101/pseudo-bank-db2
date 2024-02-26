import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../usermodels.model';
import { minibankService } from '../backend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  view = 0;
  constructor(private router: Router,private route: ActivatedRoute, private service:minibankService ) { // Inyectar el Router aquí
    Chart.register(...registerables);
  }

  setView(view:number) {
    this.view = view;
  }

  ngOnInit(): void {
    this.user = this.service.getUser();
    if (this.user == null){
      this.router.navigate(['/not-found'])
    }
    console.log(this.user?.accounts)
  }
}
