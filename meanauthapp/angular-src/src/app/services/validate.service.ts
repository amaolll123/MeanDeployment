import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateUser(user){
    if(user.name==undefined||user.email==undefined||user.username==undefined||user.password==undefined){
      return true;
    }else{
      return false;
    }
  }

  validateEmail(email){
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      return true;
    }else{
      return false;
    }
  }

}
