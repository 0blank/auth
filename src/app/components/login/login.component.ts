import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {LoginModel } from "../../models/login.model";
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input()

  loginForm: FormGroup = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
  });

  constructor(private fb: FormBuilder,private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const formData: LoginModel = Object.assign({}, this.loginForm.value);
    console.log(this.loginForm);
    this.loginService.handleLogin(formData).subscribe(res => {
      console.log(res)
    });
    // Resets to blank object
  // this.loginForm.reset();

    // Resets to provided model
  // this.loginForm.reset({ LoginModel: new LoginModel(), requestType: '', text: '' });
  }

}
