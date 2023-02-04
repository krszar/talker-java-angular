import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Musisz podać email';
    }

    return this.email.hasError('email') ? 'Niepoprawny email' : '';
  }

  public registerForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      login: [''],
      email: [''],
      password: [''],
      password2: [''],
      'action': ['register']
    })
  }

  gotoHome(){
    this.router.navigate(['/home'])
  }
  
  register(){
    this.http.get('http://localhost:8080/register/'+this.registerForm.value.login+'/'+this.registerForm.value.email+'/'+this.registerForm.value.password
    +'/'+this.registerForm.value.password).subscribe(data => {

            if(data == true){
        this.gotoHome()
      }else{
        alert("Zły login i/lub hasło");
      }
    })
  }

}