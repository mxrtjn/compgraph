import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(public router: Router) {

  }

  onGeoLocationClick() {
    this.router.navigateByUrl('/pages/maps/bubble');
  }
}
