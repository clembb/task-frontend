import { title } from 'process';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FruitService } from '../../service/fruit.service';
import { Fruit } from '../../fruit';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-creat',
  templateUrl: './creat.component.html',
  styleUrl: './creat.component.css',
})
export class CreatComponent implements OnInit {
  inputdata: any;
  editdata: any;
  todos: any[] = [];
  newTodo: any = { date: new Date() };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoservice: FruitService,
    private dialog: MatDialog,
    private messageserivce: MessageService,
    private buildr: FormBuilder
  ) {}
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log("here data",this.inputdata)
    if(this.inputdata.id.todoid>0){
      this.setpopdata(this.inputdata.id.todoid)

    }
  }

  formatDate(date: Date): string {
    const isoString = date.toISOString(); 
    return isoString.split('T')[0]; // Extract YYYY-MM-DD part
  }
  fetchTodos(): void {
    this.todoservice.getAllTodos().subscribe(
      (response) => {
        console.log(response);

        this.todos = response;
      },
      (error) => {
        console.error('Failed to fetch todos', error);
      }
    );
  }
  updateTodo(): void {

    this.newTodo = this.myform.value;
     if(this.inputdata.id.todoid>0){
      this.newTodo.todoid = this.inputdata.id.todoid; // Set the todoid
    this.todoservice.updateTodo(this.newTodo).subscribe(
      () => {
        this.messageserivce.add({
          key:'bc',
          severity: 'info',
          summary: 'Success',
          detail: 'Task updated successfully',
        });
        this.closedialog()
      },
      (error) => {
        console.error('Failed to update todo', error);
      }, () => {
        this.fetchTodos();
      }
    );
     }else{
      console.error('invalid id')
     }
  }


  
  setpopdata(id: any) {
    this.todoservice.getTaskById(id).subscribe((item) => {
      this.editdata = item;
      console.log("editdata",this.editdata);
      
      this.myform.setValue({
        title: this.editdata.title,
        description: this.editdata.description,
        date: this.editdata.date,
      });     

    });
  }

  myform = this.buildr.group({
    title: this.buildr.control(''),
    description: this.buildr.control(''),
    date: this.buildr.control(''),
  });

  closedialog() {
    this.dialog.closeAll();
  }
  addTodo(): void {
    this.newTodo.date = this.formatDate(this.newTodo.date); // Format the date

    this.todoservice.addTodo(this.newTodo).subscribe(
      () => {
        console.log('this is the todo', this.newTodo);

        console.log('Todo added successfully');

        this.messageserivce.add({
          key:'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'Task added succefuly',
        });
        this.newTodo = {};
        this.closedialog();
      },
      (error) => {
        console.error('Failed to add todo', error);
      },
      () => {
        this.fetchTodos();
      }
    );
  }
}
