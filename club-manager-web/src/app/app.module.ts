import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NotificationsService } from './Services/notifications.service';
import { LoginComponent } from './Views/Student/login/login.component';
import { RegistryComponent } from './Views/Student/registry/registry.component';
import { InterestedInClubComponent } from './Views/Student/student-home/interested-in-club/interested-in-club.component';
import { StudentHomeComponent } from './Views/Student/student-home/student-home.component';
import { AddNewClubComponent } from './Views/Student/student-home/add-new-club/add-new-club.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './Services/request.service';
import { AdminLoginComponent } from './Views/Admin/admin-login/admin-login.component';
import { AdminRegistryComponent } from './Views/Admin/admin-registry/admin-registry.component';
import { AdminHomeComponent } from './Views/Admin/admin-home/admin-home.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    StudentHomeComponent,
    InterestedInClubComponent,
    AddNewClubComponent,
    AdminLoginComponent,
    AdminRegistryComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [NotificationsService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
