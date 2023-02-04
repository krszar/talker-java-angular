import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Musisz podać email';
    }

    return this.email.hasError('email') ? 'Niepoprawny email' : '';
  }

  public loginForm !: FormGroup

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [''],
      password: [''],
      'action': ['login']
    })
 
  }

  gotoHome(){
    this.router.navigate(['/home'])
  }

  login(){

    this.http.get('http://localhost:8080/login/'+this.loginForm.value.login+'/'+this.loginForm.value.password).subscribe(data => {

        if(data == true){
           
              localStorage.setItem("who", this.loginForm.value.login)
        this.gotoHome()

      }else{
        alert("Zły login i/lub hasło");
        (document.getElementById("mat-input-0") as HTMLInputElement).value="";
        (document.getElementById("mat-input-1") as HTMLInputElement).value="";  
      }
    })
    
  }

}