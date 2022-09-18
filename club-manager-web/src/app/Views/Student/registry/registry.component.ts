import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  constructor(
    private router: Router,
    private request: RequestService,
    private notifications: NotificationsService) { }

  // NgModel variables used in the form
  name: string = "";
  lastname1: string = "";
  lastname2: string = "";
  section: string = "";
  username: string = ""
  password: string = "";
  confirm_password: string = "";

  fullname: string = this.name + ' ' + this.lastname1 + ' ' + this.lastname2;

  ngOnInit(): void {
  }

  // Reset all the form fields in case of any error occurs
  resetFields(){
    this.name = "";
    this.lastname1 = "";
    this.lastname2 = "";
    this.section = "";
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

    const response: any = await this.request.postUserRegistry(
      this.fullname,
      this.username,
      this.password,
      this.section);
    
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
    this.router.navigate(['/login']);
}

}
