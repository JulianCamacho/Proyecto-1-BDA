import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Club } from 'src/app/Interfaces/club';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { RequestService } from 'src/app/Services/request.service';
import { AddNewClubComponent } from './add-new-club/add-new-club.component';
import { InterestedInClubComponent } from './interested-in-club/interested-in-club.component';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private notifications: NotificationsService,
    private request: RequestService
  ) { }

  //user global variables
  username: any = "";
  userId: any = "";

  // Mat Table settings
  displayedColumnSuggested: string[] = ['name', 'category'];
  dataSourceSuggested: Club[] = [];
 

  displayedColumnInterested: string[] = ['name', 'category'];
  dataSourceInterested: Club[] = [];

  displayedColumnNotInterested: string[] = ['name', 'category', 'action'];
  dataSourceNotInterested: Club[] = [];

 

  ngOnInit(): void {
    // When this component is opened, the user variables are fetched
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('userName');
    this.updateRemoteData();
  }

  // Open a Dialog Component to confirm if the user wants to interest on a club
  openInterestClub(club_name: string): void {
    const dialogRef = this.dialog.open(InterestedInClubComponent, {
      width: '300px',
      data: {club_name: club_name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.interestOnClub(club_name);
      }
    });
  }

  // Open a Dialog Component to suggest new clubes
  openAddClub(username: string): void {
    const dialogRef = this.dialog.open(AddNewClubComponent, {
      width: '400px',
      data: {username: username},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false){
        if(this.checkSuggestedClubList(result) == false){
          this.notifications.showNotification(
            'Se deben proveer todos los datos de los clubes sugeridos', 3
          );
        }
        let json_array = [];
        for(let sc of result){
          json_array.push(
            {
              "name": sc['name'],
              "category": sc['category'],
              "suggestedBy": this.userId,
              "interested": []
            }
          )
        }
        this.suggestNewClub(json_array);
      }
    });
  }

  // Go to the Student Login Component
  goStudentLogin(){
    this.router.navigate(['/login']);
  }



  // Fetch the suggested clubes by user
  async fetchSuggestedClubes(){
    const response: any = await this.request.getSuggestedClubes(
      this.userId);

    this.dataSourceSuggested = [];

    for(var club of response['clubes']){
      this.dataSourceSuggested.push({
        name: club['name'],
        category: club['category'],
        suggestedBy: club['suggestedBy']
      })
    }
  }

  // Fetch the interested clubes
  async fetchInterestedClubes(){
    const response: any = await this.request.getInterestClubes(
      this.username);

    this.dataSourceInterested = [];

    for(var club of response['clubes']){
      this.dataSourceInterested.push({
        name: club['name'],
        category: club['category'],
        suggestedBy: club['suggestedBy']
      })
    }
  }

  // Fetch not interested clubes
  async fetchNotInterestedClubes(){
    const response: any = await this.request.getNotInterestClubes(
      this.username);

    this.dataSourceNotInterested = [];

    for(var club of response['clubes']){
      this.dataSourceNotInterested.push({
        name: club['name'],
        category: club['category'],
        suggestedBy: club['suggestedBy']
      })
    }
  }

  // Post interest in club
  async interestOnClub(club_name: string){
    const response:any = await this.request.postInterestedOnClub(
      club_name, this.username);

    let status = response['ok'];
    let response_message = response['msg'];
  
    if(!status){
      this.notifications.showNotification(
        response_message, 3
      );
      return;
      }
      
      this.updateRemoteData();
      this.notifications.showNotification(
        'Se ha guardado tu interés en el club de ' + club_name, 4);
  }

  // suggest a new club
  async suggestNewClub(json_array: any){
    const response: any = await this.request.postNewClub(json_array);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notifications.showNotification(
        response_message, 3
      );
      return;
      }
        
      this.updateRemoteData();
      this.notifications.showNotification(
        'Se han sugerido los clubes correctamente', 3);
  }

  // Update all fetching arrays
  updateRemoteData(){
    this.fetchSuggestedClubes();
    this.fetchInterestedClubes();
    this.fetchNotInterestedClubes();
  }

  // Loop through an array and check if the item's fields have some data
  checkSuggestedClubList(suggestedClubs: any[]){
    for(let sc of suggestedClubs){
      if(sc['name'] == "" || sc['category'] == ""){
        return false;
      }
    }
    return true;
  }

}