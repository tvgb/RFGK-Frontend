import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-register',
  	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

	registerForm: FormGroup = this.formBuilder.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		birthday: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(6)]],
		secret_code: ['', Validators.required]
	});

// tslint:disable-next-line: max-line-length
	constructor(private router: Router, private formBuilder: FormBuilder, private regService: RegistrationService, private snackBar: MatSnackBar) { }

	ngOnInit() {
	}

	onSubmit(formDirective: NgForm) {
		if (this.registerForm.invalid) { return; }

		this.regService.registerNewPlayer(this.registerForm.value).subscribe(
		() => {
			formDirective.resetForm();
			this.registerForm.reset();

			const snack = this.snackBar.open('Din nye bruker har blitt opprettet. Gå til Login for å ta den i bruk.', 'Gå til Login', {
				duration: 10000,
			});

			snack.onAction().subscribe(() => {
				this.router.navigate(['/login']);
			});
		},
		error => {

			if (error.error.errorcode === 1) {
				this.registerForm.controls['secret_code'].setErrors({'wrongcode': true});
				console.log('wrong secret code');
			} else if (error.error.errorcode === 2) {
				console.log('Mail already exists');
				this.registerForm.controls['email'].setErrors({'alreadyTaken': true});
			}
		});

	}

	c() {
		return this.registerForm.controls;
	}

	e() {
		if (this.registerForm.invalid && this.c()['email'].errors) {
			if (this.c()['email'].errors.alreadyTaken) {
				return 'alreadyTaken';
			}

			if (this.c()['email'].errors.email) {
				return 'email';
			}

			if (this.c()['email'].errors.required) {
				return 'required';
			}
		}
	}
}
