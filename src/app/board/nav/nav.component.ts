import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() view: EventEmitter<boolean> = new EventEmitter<boolean>();

  remove = false;
  RNav = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  onHover(){
    this.remove = !this.remove; 
  }

  removNav(){
    this.RNav = !this.RNav;
    this.view.emit(this.RNav);
  }
}
