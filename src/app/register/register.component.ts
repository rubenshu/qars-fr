import { AfterViewInit, Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { CustomerService } from '../_services/customer.service';
import { AuthenticationService } from '../_services/authentication.service';

declare const M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  message = {
		succeed: '',
		error: ''
	}

  constructor(
    private customerService: CustomerService,
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
      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        telefoon: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
        username: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern("^[_A-z0-9]*((-|\s)*[_A-z0-9])*$")]),
        password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
        password2: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
        street: ['', Validators.required],
        housenumber: ['', Validators.required],
        postal: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern("^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$")]),
        city: ['', Validators.required],
        privacy: ['', Validators.required]      
    },
      { 
        validators: this.password.bind(this)
      }
    );
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  Modal(action) {
    var elem = document.getElementById('modal1');
    var instance = M.Modal.init(elem);

    if (action === "open") {
      instance.open()
      return;
    }

    if (action === "close") {
      instance.close();
      return;
    }
  }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    password(formGroup: FormGroup) {
      const { value: password } = formGroup.get('password');
      const { value: confirmPassword } = formGroup.get('password2');
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }

    onSubmit() {
      this.submitted = true;
  
          // stop here if form is invalid
          if (this.registerForm.invalid) {
              return;
          }
  
          this.loading = true
  
         this.customerService.addCustomer(this.f.first_name.value, this.f.last_name.value, this.f.email.value, this.f.telefoon.value, this.f.username.value, this.f.password.value, this.f.street.value, this.f.housenumber.value, this.f.postal.value, this.f.city.value)
         .subscribe(
          res => {
            M.toast({html: 'Registratie voltooid, u kunt nu inloggen', classes: 'rounded bg-main'})
            this.router.navigate(['/login']);
          },
          err => {
            M.toast({html: 'Registratie mislukt, probeer het later opnieuw', classes: 'rounded bg-main'})
            this.loading = false;
          }
        );
  
    }

}
