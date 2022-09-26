import { R3SelectorScopeMode } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private notifications: NotificationsService,
    private request: RequestService) { }

  // NgModel variables used in the form
  username: string = "";
  password: string = "";

  ngOnInit(): void {
  }

  // Validate Login by request
  async requestLogin(){
    const response:any = await this.request.postAdminLogin(
      this.username,
      this.password);
      
    let status = response['ok'];
    let response_message = response['msg'];

    if(!status){
      this.resetFields();
      this.notifications.showNotification(
        response_message, 3
      );
      return
    }

    this.resetFields();
    let response_username = response['username'];
    let response_uid = response['uid']

    localStorage.setItem('userName', response_username);
    localStorage.setItem('userId', response_uid);

    this.goAdminHome();
  }

  // Reset the user login's fields in case the login returns any error
  async resetFields(){
    this.username = "";
    this.password = "";
  }

  // Go to the Registry Component using the Angular Router
  goRegistry(){
      this.router.navigate(['/admin-registry']);
  }

  // Go to the Admin Home component by router
  goAdminHome(){
    this.router.navigate(['/admin-home']);
  }

  // Go to the Student's Login component by router
  goStudentLogin(){
    this.router.navigate(['/login']);
  }

}





