import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {
@Output() emitData : EventEmitter<string> = new EventEmitter();

  dateB = false;
  importance = [
    {type:'LOW',color:'#39AC95'},
    {type: 'MEDUIM', color: '#DC3545'},
    {type: 'HIGH', color:'#FE913E'},
    {type: 'none', color: 'transparent'}    
]



  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
 
  }

  onRadioClick(){
    this.dateB = !this.dateB;
    this.emitData.emit('none');
  }
 

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
