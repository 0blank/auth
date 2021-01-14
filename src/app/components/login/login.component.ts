import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {LoginModel } from "../../models/login.model";
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

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
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder,private loginService: LoginService,private router: Router,private el: ElementRef) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm);
    this.isSubmitted = true;
    for (const key of Object.keys(this.loginForm.controls)) {
      if (this.loginForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
}
    if(this.loginForm.valid){
      // const formData: LoginModel = Object.assign({}, this.loginForm.value);
    this.loginService.handleLogin(this.loginForm.value).subscribe(res => {
      localStorage.setItem("token",res)
      this.router.navigate(["/app/home"]);
    });
    // Resets to blank object
  // this.loginForm.reset();

    // Resets to provided model
  // this.loginForm.reset({ LoginModel: new LoginModel(), requestType: '', text: '' });
    }
  }

}
