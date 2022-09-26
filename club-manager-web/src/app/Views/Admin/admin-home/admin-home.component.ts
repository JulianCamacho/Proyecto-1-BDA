import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Club } from 'src/app/Interfaces/club';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { RequestService } from 'src/app/Services/request.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private notifications: NotificationsService,
    private request: RequestService
  ) { }

  //user global variables
  username: any = "";
  userId: any = "";

  //Category chart data 
  categories: any[] = [];
  count: any[] = [];

  //Top students chart data
  students: any[] = [];
  numberOfClubs: any[] = [];

  //Tables data
  displayedColumns: string[] = ['position', 'name', 'category', 'count'];
  top5clubs: any[] =  []
  bottom3clubs: any[] = []


  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('userName');
   
    this.updateRemoteData();  

    const categoryChart = new Chart("categories", {
      type: 'polarArea',
      data: {
        labels: this.categories,
        datasets: [{
          label: 'CantidadporCategoria',
          data: this.count,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: { }
    });


    const clubTop3Chart = new Chart("clubsTop3Students", {
      type: 'bar',
      data: {
        labels: this.students,
        datasets: [{
          label: 'Cantidad de clubes',
          data: this.numberOfClubs,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }); 

    this.addDataCategoryChart(categoryChart, this.categories, this.count)
    this.addDataTop3Chart(clubTop3Chart, this.students, this.numberOfClubs)

  }

  generateCharts(){
    

  }
  addDataCategoryChart(chart:any, labels:any, data:any) {
    this.removeData(chart);
    this.categories.shift();
    chart.data.labels[0] = labels;
    chart.data.datasets[0].data = data;
    chart.update('none');
  }
  
  addDataTop3Chart(chart:any, labels:any, data:any) {
    this.removeData(chart);
    this.categories.shift();
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update('active');
  }

  removeData(chart:any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset:any) => {
        dataset.data.pop();
    });
    chart.update();
  }

  // Get clubs by category
  async getByCategory(){
    const response: any = await this.request.getClubesByCategory();

    //this.categories=[]
    //this.count = []
    
    for(var category of response['result']){
      this.categories.push(category['category']);
      this.count.push(category['count']);
    }
  }

  // Get clubs by category
  async getTop3Students(){
    const response: any = await this.request.getClubsOfTop3Students();

    //this.numberOfClubs=[];
    //this.students=[];
    
    for(var student of response['result']){
      this.numberOfClubs.push(student['suggestedClubs']);
      var suggestedBy = student['suggestedBy'];
      this.students.push(suggestedBy['name']);
    }
  }

  // Get top 5 clubs
  async getClubsTop5(){
    const response: any = await this.request.getTop5Clubs();

    this.top5clubs = [];
    var i = 1;
    for(var club of response['result']){
      this.top5clubs.push({
        position:i,
        name: club['name'],
        category: club['category'],
        interestedCount: club['interestedCount']
      })
      i++;
    }
  }

   // Get bottom 3 clubs
   async getClubsBottom3(){
    const response: any = await this.request.getBottom3Clubs();

    this.bottom3clubs = [];

    var i = 1;
    for(var club of response['result']){
      this.bottom3clubs.push({
        position:i,
        name: club['name'],
        category: club['category'],
        interestedCount: club['interestedCount']
      })
      i++;
    }
  }

  // Update all fetching arrays
  updateRemoteData(){
    this.getByCategory();
    this.getTop3Students();
    this.getClubsTop5();
    this.getClubsBottom3();
  }


  // Go to the Student Login Component
  goStudentLogin() {
    this.router.navigate(['/admin-login']);
  }
   

}
