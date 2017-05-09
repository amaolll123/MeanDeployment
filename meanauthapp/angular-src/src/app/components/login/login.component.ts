import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;

  constructor(private authService:AuthService,
              private flashMessagesService:FlashMessagesService,
              private router: Router
               ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    // const user = new User();
    // user.username = this.username;
    // user.password = this.password;
    //上下等价
    const user = {
      username : this.username,
      password : this.password
    }

    this.authService.validateUser(user).subscribe(res=>{
      if(res.success){
        //存token，user
        this.authService.storeUserData(res.token,res.user);
        this.flashMessagesService.show('Log in Successfully',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['dashboard']);
      }
      else{
        this.flashMessagesService.show(res.msg,{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['login']);
      }
    })

    
   
    
  }
}
