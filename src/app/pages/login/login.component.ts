import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Response} from "./app.interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authFailed: boolean = false;
  authFailedMessage: string = "";
  signedIn: boolean = false;
  hide: boolean = true;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.authService.isSignedIn().subscribe(
      isSignedIn => {
        this.signedIn = isSignedIn;

        if(this.signedIn) {
          this.router.navigateByUrl('/').then();
        }
      });
  }

  ngOnInit(): void {
    this.authFailed = false;
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      });
  }

  public signIn() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.signIn(email, password).subscribe(
      response => {
        if (response.isSuccess) {
          this.router.navigateByUrl('home').then(r => console.log(r));
        } else {
          return;
        }
      },
      error => {
        if (!error?.error?.isSuccess) {
          this.authFailed = true;
          this.authFailedMessage = error?.error?.message;
        }
      });
  }
}
