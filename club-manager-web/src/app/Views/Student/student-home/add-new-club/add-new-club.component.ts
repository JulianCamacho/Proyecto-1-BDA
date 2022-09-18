import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private request: RequestService) {}


  categories: any[] = [
    {
      count: 2,
      category: "deportes"
    },
    {
      count: 2,
      category: "artes"
    }
  ];

  category: string = "";
  club_name: string = "";

  ngOnInit(): void {
  }
}
