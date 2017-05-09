import { Component, OnInit, } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  email:String;
  username:String;
  password:String;

  constructor(private ValidateService:ValidateService,
    private FlashMessagesService : FlashMessagesService,
    private authService: AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    
    const user = {
      name : this.name,
      email : this.email,
      username : this.username,
      password : this.password
    }

    if(this.ValidateService.validateUser(user)){
      this.FlashMessagesService.show("plz fill all the fields!",{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.ValidateService.validateEmail(user.email)){
      this.FlashMessagesService.show("Plz fill right Email Address",{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.registerUser(user)


    // subscribe 三个callback函数
    // .subscribe(
    // function(response) { console.log("Success Response" + response)},
    // function(error) { console.log("Error happened" + error)},
    // function() { console.log("the subscription is completed")}
    // );
    
    .subscribe(response=> {

      //
      if(response.success){
        this.FlashMessagesService.show("Registeredss Successfully",{cssClass: 'alert-success', timeout:3000});
        //console.log("test!");
        this.router.navigate(['login']);
        


      }
      else{
        this.FlashMessagesService.show("Some Error Happens!",{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['register']);
      }
    })
    
  }
}
