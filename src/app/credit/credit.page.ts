import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {
  weather: any = [];
  constructor(private service:WeatherService) { }

  ngOnInit() {
    this.service.GetWeatherData().subscribe((data)=>{
      this.weather = data.weather;
      console.log(this.weather);
    });
  }

}
