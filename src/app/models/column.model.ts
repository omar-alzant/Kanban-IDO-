export interface Comment { 
  id: number,
  text: string,
}

export interface Card { 
  id: number,
  text: string,
  company: string,
  date: any,
  estimate: string,
  importance: string,
  colorImp: string,
  // like: number,
  // comments: Comment[]
}

export interface Column { 
  id: number,
  title: string,
  color: string,
  img: string,
  list: Card[]
}
