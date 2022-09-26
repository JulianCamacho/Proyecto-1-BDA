import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  // SnackBar set up
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snack: MatSnackBar) { }

  /*
  When this method is called, a notification is showed on screen
  with the "message" and for "seconds" s of time.
  */ 
  showNotification(message: string, seconds: number) {
    this.snack.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: seconds * 1000,
    });
  }

}
