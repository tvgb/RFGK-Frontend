import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', [Validators.required]]
	});

	loading = false;
	submitted = false;
	returnUrl: string;



	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder) { }

	ngOnInit() {
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	onSubmit(formDirective: NgForm) {
		console.log(this.loginForm);
		this.c()['email'].setErrors({'wrongEmailOrPassword': null});
		this.c()['password'].setErrors({'wrongEmailOrPassword': null});
		this.c()['email'].updateValueAndValidity();
		this.c()['password'].updateValueAndValidity();

		this.loginForm.updateValueAndValidity();
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		this.authenticationService.login(this.c()['email'].value, this.c()['password'].value)
			.pipe()
			.subscribe(
				data => {
					if (data.responsecode) {
						this.loading = false;
						this.c()['password'].setErrors({'wrongEmailOrPassword': true});
						this.c()['email'].setErrors({'wrongEmailOrPassword': true});
						return;
					}

					this.router.navigate([this.returnUrl]);
				},
				error => {
					this.loading = false;
				}
			);
	}

	c() {
		return this.loginForm.controls;
	}
}
