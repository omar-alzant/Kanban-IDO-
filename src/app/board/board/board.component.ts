import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
@Input() viewQ: boolean = true;

user = '';
searchText = '';
nav = false ;
  
  constructor(
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
    console.log('BOARD - INIT')
  }

  onGetUser(user:string){
    
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


  // onChangeLike(event: {card: any, increase: boolean}, columnId: number ) {
  //   const { card: { id }, increase } = event
  //   this.boardService.changeLike(id, columnId, increase)
  // }

  // onAddComment(event: {id: number, text: string}, columnId: number) {
  //   this.boardService.addComment(columnId, event.id, event.text)
  // }
  
  // onDeleteComment(comment:any, columnId:any, item:any) {
  //   this.boardService.deleteComment(columnId, item.id, comment.id)
  // }

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
