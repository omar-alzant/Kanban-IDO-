import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import { Observable } from 'rxjs';
import { BoardItemComponent } from '../board-item/board-item.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  todoList$!: Observable<any[]>;
  doingList$!: Observable<any[]>;
  doneList$!: Observable<any[]>;
  

  @Input() todoId:any;
  @Input() doingId:any;
  @Input() doneId:any;


  
  @Input() viewQ: boolean = true;

user = '';
searchText = '';
nav = false ;
titleB = false;
dateB = false;
noneB = false;
estB = false;
compB = false;
impB = false;

commentInput = ''
titleInput = ''
DateInput = ''
EstInput = ''
compInput = ''
impInput = ''


  constructor(
    public boardService: BoardService  ) { }

  ngOnInit(): void {
    console.log('BOARD - INIT')
    this.todoList$ = this.boardService.getTodoList();
    this.doingList$ = this.boardService.getDoingList();
    this.doneList$ = this.boardService.getDoneList();
    

  }

 titleColumn(){
  return ["todo","doing","done"];
 }



onOpenTitle(){
  this.titleB = !this.titleB;
}
onOpenEst(){
  this.estB = !this.estB;
}
onOpenComp(){
  this.compB = !this.compB;
}
onOpenImp(){
  this.impB = !this.impB;
}


  onColorChange(color: string, columnId: number) {
    this.boardService.changeColumnColor(color, columnId)
  }
  
  onAddCard(data: any, columnId: number) {
    if(data) {
      this.boardService.addCard(data, columnId)
    }
  }

  onDeleteColumn(columnId: number) {
    this.boardService.deleteColumn(columnId)
  }
  
  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId)
  }

  onChangeTitle(event: {card:any, text: string}, columnId:number){
    const { card: {id}, text } = event;
    this.boardService.changeTitle(id, columnId, text)
  }

  changeTitleApi(item:any){
    let todoItem = {
      id: item.id,
      text: item.text,
      company: item.company,
      date: item.date,
      estimate: item.estimate,
      importance: item.importance
    }

    let id: number = item.id;
    this.boardService.updateTitleTodo(id,item);
  }

  onChangeImp(event: {card:any, imp: string}, columnId:number){
    const { card: {id}, imp } = event;
    this.boardService.changeImp(id, columnId, imp)
  }


  onChangeDate(event: {card:any, date: string}, columnId:number){
    const { card: {id}, date } = event;
    this.boardService.changeDate(id, columnId, date)
  }
  onChangeComp(event: {card:any, comp: string}, columnId:number){
    const { card: {id}, comp } = event;
    this.boardService.changeComp(id, columnId, comp)
  }



  onChangeEst(event: {card:any, est: string}, columnId:number){
    const { card: {id}, est } = event;
    this.boardService.changeEst(id, columnId, est)
  }


  onSearchTextEntered(searchValue:string){
     this.searchText = searchValue;
     console.log(this.searchText);
  }

  showNav(){
    this.nav = !this.nav;
    this.viewQ = !this.viewQ;
  }

  onView(view: boolean){
    this.viewQ = !view;
    this.nav = !this.nav;

  }


  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
