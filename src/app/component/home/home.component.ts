import { Component, OnInit, ViewChild } from '@angular/core';
import { FruitService } from '../../service/fruit.service';
import { Fruit } from '../../fruit';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatComponent } from '../creat/creat.component';
import { title } from 'process';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.fetchTodos();
  }

  datasource: MatTableDataSource<Fruit> = new MatTableDataSource<Fruit>();
  displayedColumns: string[] = ['title', 'date', 'description', 'action'];

  todos: any[] = [];
  newTodo: any = {};

  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private todoService: FruitService,
    private dialog: MatDialog,
    private messageserivce: MessageService
  ) {
    this.fetchTodos();
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.datasource.filter = value.trim().toLowerCase();
  }

  fetchTodos(): void {
    this.todoService.getAllTodos().subscribe(
      (response) => {
        console.log('this is the list', response);
        this.todos = response;
        this.datasource = new MatTableDataSource<any>(response);
        this.datasource.paginator = this.paginatior;
        this.datasource.sort = this.sort;
      },
      (error) => {
        console.error('Failed to fetch todos', error);
      }
    );
  }

  updateTodo(todo: any): void {
  
        this.openDialog(todo,"Edit task")
        
  }
  addtask(){
    this.openDialog(0, "Add task");
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        console.log('Todo deleted successfully');
        this.messageserivce.add({
          key:'bc',
          severity: 'error',
          summary: 'error',
          detail: 'Task deleted successfully',
        });
      },
      (error) => {
        console.error('Failed to delete todo', error);
      },
      () => {
        this.fetchTodos();
      }
    );
  }

  openDialog(id:any,title:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      title: title,
      id:id
    };

    const dialogRef = this.dialog.open(CreatComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((item) => {
      this.fetchTodos();
    });
  }
}
