import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardService } from '../services/board.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password: string = '';
  constructor(private auth: BoardService) { }

  ngOnInit(): void {
  }


  login(){
    if(this.email==''){
      alert('Please enter email');
      return;
    }
    if(this.password==''){
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);
    this.email = '';
    this.password = '';

  }
}
