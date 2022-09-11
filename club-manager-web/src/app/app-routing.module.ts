import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/Student/login/login.component';
import { RegistryComponent } from './Views/Student/registry/registry.component';

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
    path: 'registry',
    component: RegistryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
