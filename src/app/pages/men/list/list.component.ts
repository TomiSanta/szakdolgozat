import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges{
  @Input() menObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImage: any;

  constructor(){
    
  }

  ngOnChanges(): void {
    if (this.menObjectInput){
      this.chosenImage = this.menObjectInput[0];
      this.reload();
    }
  }

  ngOnInit(): void {
    
  }

  reload(){
    this.imageObjectEmitter.emit(this.chosenImage);
  }

}
