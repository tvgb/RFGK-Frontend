import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profileForm: FormGroup = this.formBuilder.group({
		newEmail: ['', Validators.email],
		oldPassword: [''],
		newPassword: ['', Validators.minLength(6)]
	});

  	constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  	ngOnInit() {

  	}

	onSubmit(formDirective: NgForm) {

		if (this.profileForm.invalid) {
			return;
		}

		this.profileService.updatePlayerInfo(this.profileForm.value).subscribe(
			() => {
				formDirective.resetForm();
				this.profileForm.reset();

				const snack = this.snackBar.open('Info har blitt oppdatert.', 'OK', {
					duration: 5000,
				});
			},
			error => {
				if (error.error.errorcode === 2) {
					this.c()['oldPassword'].setErrors({'wrongPassword': true});
				} else {
					const snack = this.snackBar.open('Noe gikk galt...', 'OK', {
						duration: 5000,
					});
				}
			}
		)


	}

	readyForSubmit(): boolean {

		if ((this.c()['newEmail'].value !== '' || this.c()['newPassword'].value !== '') && this.c()['oldPassword'].value !== '') {
			return false;
		}

		return true;
	}

	c() {
		return this.profileForm.controls;
	}

	e() {
		if (this.profileForm.invalid && this.c()['newEmail'].errors) {
			if (this.c()['newEmail'].errors.alreadyTaken) {
				return 'alreadyTaken';
			}

			if (this.c()['newEmail'].errors.email) {
				return 'email';
			}
		}
	}
}
