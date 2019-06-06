import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  	constructor(private injector: Injector) { }

	handleError(error: Error | HttpErrorResponse)  {

		if (error instanceof HttpErrorResponse) {
			console.log(error.statusText);
		}

		console.log('NOT HTTP ERROR RESPONSE');

		// const router = this.injector.get(Router);
		// console.log(error.name);
		// if (error.name  === 401 || error.rejection.status === 403) {
		// 	router.navigate(['/login']);
		// }

		throw error;
	}
}
