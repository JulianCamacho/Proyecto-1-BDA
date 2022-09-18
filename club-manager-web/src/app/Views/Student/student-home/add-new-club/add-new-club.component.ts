import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-add-new-club',
  templateUrl: './add-new-club.component.html',
  styleUrls: ['./add-new-club.component.css']
})
export class AddNewClubComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddNewClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private request: RequestService,
    private notification: NotificationsService) {}

  // Array used to store the fetched club's categories
  categories: any[] = [];

  // Array used to create or delete NewClubForms
  dynamicFormStructure: any[] = [];

  ngOnInit(): void {
    // When opened, club's categories are fetched
    this.fetchClubCategories();

    // Show a message to the user
    this.notification.showNotification(
      'Agregue los forms necesarios antes de ingresar los datos', 2
    );
  }

  // Add a new Club form on screen
  addClubForm(){
    this.dynamicFormStructure.push(
      {
        name: "",
        category: ""  
      }
    );
  }

  // Remove a Club form on screen
  removeClubForm(form: any){
    this.dynamicFormStructure.forEach( (item, index) => {
      if(item === form) this.dynamicFormStructure.splice(index,1);
    });
  }

  // Request all the existing club categories
  async fetchClubCategories(){
    const response: any = await this.request.getClubesByCategory();
    this.categories = response['result'];
  }
}
