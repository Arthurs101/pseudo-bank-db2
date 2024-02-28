import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../usermodels.model';
import { minibankService } from '../backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  images = [
    '../../assets/gato.jpg"/',
   ' ../../asssets/prestar.jpg/ ',
    '../../assets/gato.jpg',
 
  ];

  user: User | null = null;
  view = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: minibankService
  ) {
    Chart.register(...registerables);
  }

  setView(view: number) {
    this.view = view;

    if (view === 1) {
      this.router.navigate(['/realizar-transaccion']);
    }
    else if (view === 4) {
      this.router.navigate(['/configuracion-usuario']);
    }
    else if (view === 2) {
      this.router.navigate(['/prestamos']);
    }
    
  }

  ngOnInit(): void {
    this.user = this.service.getUser();
    if (this.user == null) {
      this.router.navigate(['/not-found']);
    }
    else {
      this.startSlideshow();
    }
  }


  startSlideshow(): void {
    const images = document.querySelectorAll('#image-container img');
    let currentImageIndex = 0;

    setInterval(() => {
      // Remueve la clase 'active' de la imagen actual
      images[currentImageIndex].classList.remove('active');

      // Calcula el índice de la siguiente imagen
      currentImageIndex = (currentImageIndex + 1) % images.length;

  
      images[currentImageIndex].classList.add('active');
    }, 1500);
  }
  adminAction() {
    
    this.router.navigate(['/charts']);
  }




}


