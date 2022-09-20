import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Views/Admin/admin-login/admin-login.component';
import { LoginComponent } from './Views/Student/login/login.component';
import { RegistryComponent } from './Views/Student/registry/registry.component';
import { StudentHomeComponent } from './Views/Student/student-home/student-home.component';
import { AdminRegistryComponent } from './Views/Admin/admin-registry/admin-registry.component';
import { AdminHomeComponent } from './Views/Admin/admin-home/admin-home.component';

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
    path: 'admin-registry',
    component: AdminRegistryComponent
  },
  {
    path: 'student-home',
    component: StudentHomeComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
