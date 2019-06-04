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

	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required]);
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService) { }

	ngOnInit() {
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	onSubmit(loginForm: NgForm) {
		console.log('Trying to log in ...');
		this.submitted = true;

		// stop here if form is invalid
		if (loginForm.invalid) {
			console.log('Ivalid form');
			return;
		}

		this.loading = true;
		this.authenticationService.login(loginForm.value.email, loginForm.value.password)
			.pipe()
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
					console.log('You are logged in');
				},
				error => {
					console.log(error(error));
					this.loading = false;
				}
			);
	}
}
