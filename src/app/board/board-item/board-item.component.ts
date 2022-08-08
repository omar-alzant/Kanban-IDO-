import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

type NewType = any;

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() item:any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();
  @Output() emitChangeTitle: EventEmitter<{ card: any; text: string}> = new EventEmitter();
  @Output() emitChangeDate: EventEmitter<{card: any; date:string}> = new EventEmitter();
  @Output() emitChangeEst: EventEmitter<{card: any; est:string}> = new EventEmitter();
  @Output() emitChangeComp: EventEmitter<{card: any; comp:string}> = new EventEmitter();
  @Output() emitChangeImp: EventEmitter<{card: any; imp:string; color?:string}> = new EventEmitter();

  color :any;
  commentInput = ''
  titleInput = ''
  DateInput = ''
  EstInput = ''
  compInput = ''
  impInput = ''
  titleB = false;
  dateB = false;
  noneB = false;
  estB = false;
  compB = false;
  impB = false;
  open = false;
  importance = [
    {type:'LOW',color:'#39AC95'},
    {type: 'MEDUIM', color: '#DC3545'},
    {type: 'HIGH', color:'#FE913E'},
    {type: 'none', color: 'transparent'}    
]



  constructor() {
    switch(this.impInput){
      case 'LOW': this.color = '#39AC95'; break;
      case 'MEDUIM': this.color = '#DC3545'; break;
      case 'HIGH' : this.color = '#FE913E'; break;
      case 'none' : this.color = 'transparent'; break;
    } 
  }



  ngOnInit(): void {}


  onOpenComment() {
    this.open = !this.open
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



  onOpenDate(){
    this.dateB = !this.dateB;
  }

  onCardTitleEmit(card: any) {
    this.titleB = !this.titleB;
    this.emitChangeTitle.emit({card,text: this.titleInput});
    this.titleInput = ''
  }



  onRadioClick(){
    this.noneB = !this.noneB;
    this.DateInput = 'None';
  }
 
  onCardEstEmit(card: any) {
    this.estB = !this.estB;
    if(this.EstInput.match(/[a-zA-Z\d]/))
      this.emitChangeEst.emit({card,est: this.EstInput});
    else{
      if(this.EstInput.match(/\s/i))
       this.emitChangeEst.emit({card,est: 'None'}); 
    }
      this.EstInput = ''
  }

  onCardCompEmit(card: any) {
    this.compB = !this.compB;
    this.emitChangeComp.emit({card,comp: this.compInput});
    this.compInput = ''
  }

  onCardImpEmit(card: any) {
    this.impB = !this.impB;
    this.emitChangeImp.emit({card,imp: this.impInput});
    switch(this.impInput){
      case 'LOW': this.color = '#39AC95'; break;
      case 'MEDUIM': this.color = '#DC3545'; break;
      case 'HIGH' : this.color = '#FE913E'; break;
      case 'none' : this.color = 'transparent'; break;
    }
    this.impInput = ''
  }

  

  onCardDateEmit(card: any) {
    if(typeof(this.DateInput) == 'object') 
        this.DateInput = this.DateInput;
    else{
        this.DateInput = 'none' 
    }
    this.dateB = !this.dateB;
    this.emitChangeDate.emit({card,date: this.DateInput});
    this.DateInput = ''
  }


  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }

  onCardItemEmit(card: any, increase: boolean) {
    this.emitCardItem.emit({ card, increase });
  }

  onCardDelete(id: number) {
    this.emitDeleteCard.emit(id)
  }
}
