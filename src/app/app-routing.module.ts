import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { EditComponent } from './component/edit/edit.component';
import { CreatComponent } from './component/creat/creat.component';
import { LoginComponent } from './component/Auth/login/login.component';
import { SignupComponent } from './component/Auth/signup/signup.component';
import { AuthGuard } from './component/guard.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},

  {path:'register',component:SignupComponent},

  {path:'home',component:HomeComponent,canActivate:[AuthGuard], children:[
    {path:'edit/:id',component:EditComponent},
  ]},
  {
    path:'', redirectTo:'home',pathMatch:'full'
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
