import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styles:[

  ]
})
export class ToDoComponent implements OnInit {
  todos: any[]=[];
  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({idField:'id'}).subscribe((items)=>{
      this.todos=items.sort((a:any,b:any)=>{
        return a.isDone -b.isDone
      });
    })
  }
  todoAdd(titleInput:HTMLInputElement){
    if(titleInput.value){
    this.todoService.addTodo(titleInput.value)
    titleInput.value='';
    }
  }
  onStatusChange(id:string,newStatus:boolean){
    this.todoService.updateTodoStatus(id,newStatus);
  }
  todoDelete(id:string){
    this.todoService.deleteTodo(id)
  }

}
