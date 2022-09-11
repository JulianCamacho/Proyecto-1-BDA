import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
  }

  // Go to the Registry Component using the Angular Router
  goRegistry(){
      this.router.navigate(['/registry']);
  }

}
