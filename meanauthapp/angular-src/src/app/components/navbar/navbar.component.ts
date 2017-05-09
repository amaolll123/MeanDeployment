import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private flashMessagesService:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
  }

  onClickLogout(){
    this.authService.logOut();
    this.flashMessagesService.show("You are now logged out!",{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['login']);
  }
}
