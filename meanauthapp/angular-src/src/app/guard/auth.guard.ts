import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService, private router:Router,
  private flashMessagesService:FlashMessagesService){

  }

  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.flashMessagesService.show("Please Log In!",{cssClass:'alert-danger'});
      this.router.navigate(['/login']);
      return false;
    }
  }
}
