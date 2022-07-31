import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() getUserName : string ='';
  @Output() sendUserName: EventEmitter<string> = new EventEmitter<string>();
  
  
  nav = true;

  avatar = false;

  Inp = false;

  search = false;
 
  enteredSearchVal = '';

  constructor(
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
  }

  addColumn(event: string) {
    if (event) {
      this.boardService.addColumn(event)
    }
  }
  onAddCard(data: any) {
    if(data) {
      this.boardService.addCardH(data)
    }
  }
  onClick(){
  this.search = !this.search;
}

showAvatar(){
  this.avatar =  !this.avatar; 
}

showInp(){
  this.Inp = !this.Inp;
}

onSearchTextChanged(){
  this.searchTextChanged.emit(this.enteredSearchVal);
}

onSearch(){
  this.search = !this.search;
}

onGet(){
  return this.getUserName;
}
}
