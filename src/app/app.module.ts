import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CreatComponent } from './component/creat/creat.component';
import { EditComponent } from './component/edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FruitModule } from './fruit/fruit.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './component/Auth/login/login.component';
import { SignupComponent } from './component/Auth/signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from'@angular/material/icon'
import {MatInputModule}  from'@angular/material/input'
import {MatCardModule} from "@angular/material/card"
import {MatPaginatorModule} from "@angular/material/paginator"
import { MatTableModule } from '@angular/material/table';

import {MatSortModule} from "@angular/material/sort"
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatComponent,
    EditComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FruitModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    MatCheckboxModule,
    CardModule,
    InputTextModule,
  
    
  ],
  providers: [
    MessageService,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
