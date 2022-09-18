import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-interested-in-club',
  templateUrl: './interested-in-club.component.html',
  styleUrls: ['./interested-in-club.component.css']
})
export class InterestedInClubComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InterestedInClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}

  ngOnInit(): void {
  }
}
