import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-admin-registry',
  templateUrl: './admin-registry.component.html',
  styleUrls: ['./admin-registry.component.css']
})
export class AdminRegistryComponent implements OnInit {

  constructor(
    private router: Router,
    private request: RequestService,
    private notifications: NotificationsService) { }

  // NgModel variables used in the form
  nameA: string = "";
  lastname1A: string = "";
  lastname2A: string = "";
  username: string = "";
  password: string = "";
  confirm_password: string = "";


  ngOnInit(): void {
  }

  // Reset all the form fields in case of any error occurs
  resetFields(){
    this.nameA = "";
    this.lastname1A = "";
    this.lastname2A = "";
    this.username = "";
    this.password = "";
    this.confirm_password = "";
  }

  async requestRegistry(){
    if(this.password != this.confirm_password){
      this.notifications.showNotification(
        'Las contraseñas deben ser las iguales',
        3);
      this.password = "";
      this.confirm_password = "";
      return;
    
    }
  
    var fullname = this.nameA + ' ' + this.lastname1A + ' ' + this.lastname2A;

    const response: any = await this.request.postAdminRegistry(
      fullname,
      this.username,
      this.password);
    
    let status = response['ok'];
    let response_message = response['msg'];

    if(!status){
      this.notifications.showNotification(
        response_message, 3);
      this.resetFields();
      return;
    }

    this.resetFields();
    this.notifications.showNotification(
      'El usuario ha sido creado exitosamente', 3);

    this.goLogin();
  }

  // Go to the Login Component using the Angular Router
  goLogin(){
    this.router.navigate(['/admin-login']);
  }

}
