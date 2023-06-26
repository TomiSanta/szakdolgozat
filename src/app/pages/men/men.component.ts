import { Component, OnInit } from '@angular/core';
import { MenService } from '../../shared/services/men.service';
import { Image } from '../../shared/models/Image';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  menObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private menService: MenService){
    
  }

  ngOnInit(): void {
    this.menService.loadImageMeta('__menClothes.json').subscribe((data: Array<Image>) => {
      this.menObject = data;
    })
  }

  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
  }

}
