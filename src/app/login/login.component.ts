import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { HttpService } from '../http.service';
import { AuthenticationService } from '../_services/authentication.service';

declare const M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  inlogForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errormsg = '';

  constructor(
    private _http: HttpService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
        // redirect naar home pagina als al ingelogd bent
        if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
        }
   }

  ngOnInit() {
      this.inlogForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  // convenience getter for easy access to form fields
  get f() { return this.inlogForm.controls; }

  onSubmit() {
    this.submitted = true;


        // stop here if form is invalid
        if (this.inlogForm.invalid) {
            return;
        }

        this.loading = true

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    M.toast({html: 'U bent succesvol ingelogd', classes: 'rounded bg-main'})
                    this.router.navigate(['']);
                },
                error => {
                    this.errormsg = 'Gebruikersnaam of wachtwoord incorrect!';
                    this.loading = false;
                });

  }
}