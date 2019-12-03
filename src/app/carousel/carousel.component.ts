
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource , NgbCarouselConfig,NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service'
// import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
// @Component({selector: 'ngbd-carousel-pause', templateUrl: './carousel-pause.html'})
export class CarouselComponent {
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  private paused = false;
  images=[];
  date= '2015-10-31';
  datePicker: NgbDate = new NgbDate(2015,10,31); 
  
 

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  play() {
    this.carousel.cycle();
    this.paused = true;
  }
  pause() {
    this.carousel.pause();
    this.paused = false;;
  }

  selectDate(date: NgbDate){   
    this.date=date.year+'-'+date.month+'-'+date.day;
    this.images=[];
    this.initDataFromNASA(this.date);
    console.log(this.images);
  }

  constructor(config: NgbCarouselConfig, private dataService: DataService) {
    config.interval = 500;
    // config.wrap=false;
    config.keyboard = false;
    config.pauseOnHover = false;
    // config.showNavigationArrows= true;
    config.showNavigationIndicators = false;
  }
  initDataFromNASA(date){
    this.dataService.getDataFromNASA(date).subscribe(data => {
      console.log(data);
      Object.keys(data).map(i => {
        data[i].image = `https://epic.gsfc.nasa.gov/archive/natural/${date.split('-').join('/')}/png/${data[i].image}.png?api_key=${this.dataService.API_KEY}`
        this.images.push(data[i].image)
        // console.log(typeof data[i])
      });
      console.log(this.images)
      // console.log(data);
    });
    
  }

  ngOnInit() {
    this.carousel.pause();
    this.initDataFromNASA(this.date);
  }
}