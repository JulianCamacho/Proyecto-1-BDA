import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Views/Admin/admin-login/admin-login.component';
import { LoginComponent } from './Views/Student/login/login.component';
import { RegistryComponent } from './Views/Student/registry/registry.component';
import { StudentHomeComponent } from './Views/Student/student-home/student-home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login',
     pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'registry',
    component: RegistryComponent
  },
  {
    path: 'student-home',
    component: StudentHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
