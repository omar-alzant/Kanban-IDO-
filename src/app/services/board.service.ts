import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, Column, Comment } from '../models/column.model';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  color: any;
  user : string = '';

  private initBoard = [
    {
      id: 1,
      title: 'ToDo',
      color: '#212529',
      img: 'assets/ToDoIcon.png',
      list: [
        {
          id: 1,
          text: 'Example card item',
          company: 'OSD',
          date: '7/7/2022',
          estimate: '6 hours',
          importance: 'LOW',
          colorImp: '#39AC95',
          // like: 1,
          // comments: [
          //   {
          //     id: 1,
          //     text: 'Some comment'
          //   }
          // ]
        },
      ],
    },
    {
      id: 2,
      title: 'Doing',
      color: '#212529',
      img: 'assets/DoingIcon.png',
      list: [
        {
          id: 1,
          text: 'Example card item',
          company: 'OSD',
          date: '7/7/2022',
          estimate: '6 hours',
          importance: 'LOW',
          colorImp: '#39AC95',
          // like: 1,
          // comments: [
          //   {
          //     id: 1,
          //     text: 'Some comment'
          //   }
          // ]
        },
      ],
    },
    {
      id: 3,
      title: 'Done',
      color: '#212529',
      img: 'assets/DoneIcon.png',
      list: [
        {
          id: 1,
          text: 'Example card item',
          company: 'OSD',
          date: '7/7/2022',
          estimate: '6 hours',
          importance: 'LOW',
          colorImp: '#39AC95',
          // like: 1,
          // comments: [
          //   {
          //     id: 1,
          //     text: 'Some comment'
          //   }
          // ]
        },
      ],
    },
  ];


  constructor(private fireauth: AngularFireAuth, private router: Router){}

  private board: Column[] = this.initBoard;
  private board$ = new BehaviorSubject<Column[]>(this.initBoard);
  
 
  getUser(){

    return this.user;
  }


  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
        localStorage.setItem('token','true');
        this.router.navigate(['board']);
    }, err => {
      alert(err.message);
      this.router.navigate(['login']);
    })
    this.user = email;

    console.log(this.user);
  };

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err => {alert(err.message)});
  }

  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }
  sendEmailForVarification(user: import("firebase/compat").default.User | null) {
    throw new Error('Method not implemented.');
  }
  getBoard$() {
    return this.board$.asObservable();
  }

  changeColumnColor(color: string, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.color = color;
      }
      return column;
    });
    this.board$.next([...this.board]);
  }

  addColumn(title: string) {
    const newColumn: Column = {
      id: Date.now(),
      title: title,
      color: '#009886',
      img:'',
      list: [],
    };

    this.board = [...this.board, newColumn];
    this.board$.next([...this.board]);
  }

  addCard(data: any, columnId: number) {
    switch (data[4]) {
      case 'LOW':
        this.color = '#39AC95';
        break;
      case 'MEDUIM':
        this.color = '#DC3545';
        break;
      case 'HIGH':
        this.color = '#FE913E';
        break;
      case 'none':
        this.color = 'transparent';
        break;
    }
    
    // if (data[3].match(/[a-zA-Z\d]/)) data[3] = data[3];
    // else {
    //   if (data[3].match(/\s/i)) data[3] = 'None';
    // }

    const newCard: Card = {
      id: Date.now(),
      text: data[0],
      company: data[1],
      date: data[2],
      estimate: data[3],
      importance: data[4],
      colorImp: this.color,
      // like: 0,
      // comments: [],
    };

    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = [newCard, ...column.list];
      }
      return column;
    });

    this.board$.next([...this.board]);
    console.log(this.getBoard$);
  }

addCardH(data: any) {
 let  exist = <boolean>false;
    switch (data[4]) {
      case 'LOW':
        this.color = '#39AC95';
        break;
      case 'MEDUIM':
        this.color = '#DC3545';
        break;
      case 'HIGH':
        this.color = '#FE913E';
        break;
      case 'none':
        this.color = 'transparent';
        break;
    }
    const newCard: Card = {
      id: Date.now(),
      text: data[0],
      company: data[1],
      date: data[2],
      estimate: data[3],
      importance: data[4],
      colorImp: this.color,
      // like: 0,
      // comments: [],
    };

    let titleNew = String(data[5]).replace(/\s/g, '').toLowerCase();

    this.board = this.board.map((column: Column) => {
    let  columnNew = column.title.replace(/\s/g, '').toLowerCase();
      
    console.log(data[5])
    if (columnNew == titleNew) {
      column.list = [newCard, ...column.list];
      exist = true;
    }
    return column;
    });
    if(!exist)       
      alert('Title not Exist');
    this.board$.next([...this.board]);
    // console.log(data[1]);
  }

  deleteColumn(columnId: any) {
    this.board = this.board.filter((column: Column) => column.id !== columnId);
    this.board$.next([...this.board]);
  }

  deleteCard(cardId: number, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.filter((card: Card) => card.id !== cardId);
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

  changeComp(cardId: number, columnId: number, comp: string) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if (card.id === cardId) {
            if (comp) {
              card.company = comp;
            }
          }
          return card;
        });

        column.list = list;
        return column;
      } else {
        return column;
      }
    });

    this.board$.next([...this.board]);
  }

  changeEst(cardId: number, columnId: number, est: string) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if (card.id === cardId) {
            if (est) {
              card.estimate = est;
            }
          }
          return card;
        });

        column.list = list;
        return column;
      } else {
        return column;
      }
    });

    this.board$.next([...this.board]);
  }

  changeDate(cardId: number, columnId: number, date: string) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if (card.id === cardId) {
            if (date) {
              card.date = date;
            }
          }
          return card;
        });

        column.list = list;
        return column;
      } else {
        return column;
      }
    });

    this.board$.next([...this.board]);
  }

  changeImp(cardId: number, columnId: number, imp: string) {
    switch (imp) {
      case 'LOW':
        this.color = '#39AC95';
        break;
      case 'MEDUIM':
        this.color = '#DC3545';
        break;
      case 'HIGH':
        this.color = '#FE913E';
        break;
      case 'none':
        this.color = 'transparent';
        break;
    }
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if (card.id === cardId) {
            if (imp) {
              card.importance = imp;
              card.colorImp = this.color;
            }
          }
          return card;
        });

        column.list = list;
        return column;
      } else {
        return column;
      }
    });

    this.board$.next([...this.board]);
  }

  changeTitle(cardId: number, columnId: number, text: string) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if (card.id === cardId) {
            if (text) {
              card.text = text;
            }
          }
          return card;
        });

        column.list = list;
        return column;
      } else {
        return column;
      }
    });

    this.board$.next([...this.board]);
  }

  // changeLike(cardId: number, columnId: number, increase: boolean) {
  //   this.board = this.board.map((column: Column) => {
  //     if (column.id === columnId) {
  //       const list = column.list.map((card: Card) => {
  //         if (card.id === cardId) {
  //           if (increase) {
  //             card.like++;
  //           } else {
  //             if (card.like > 0) {
  //               card.like--;
  //             }
  //           }
  //         }
  //         return card;
  //       });

  //       column.list = list;
  //       return column;
  //     } else {
  //       return column;
  //     }
  //   });

  //   this.board$.next([...this.board]);
  // }

  // addComment(columnId: number, cardId: number, text: string) {
  //   this.board = this.board.map((column: Column) => {
  //     if (column.id === columnId) {
  //       const list = column.list.map((card: Card) => {
  //         if (card.id === cardId) {
  //           const newComment = {
  //             id: Date.now(),
  //             text,
  //           };
  //           card.comments = [newComment, ...card.comments];
  //         }
  //         return card;
  //       });

  //       column.list = list;
  //     }
  //     return column;
  //   });

  //   this.board$.next([...this.board]);
  // }

  // deleteComment(columnId:any, itemId:any, commentId:any) {
  //   this.board = this.board.map((column: Column) => {
  //     if(column.id === columnId) {
  //       const list = column.list.map((item)=> {
  //         if(item.id === itemId) {
  //           item.comments = item.comments.filter((comment: Comment) => {
  //             return comment.id !== commentId
  //           })
  //         }
  //         return item
  //       })
  //       column.list = list
  //     }
  //     return column
  //   })
  //   this.board$.next([...this.board])
  // }
}
