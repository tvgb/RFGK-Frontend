import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(public authService: AuthenticationService, private router: Router) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));


		if (currentUser && currentUser.token) {
			request = request.clone({
				setHeaders: {
					'Authorization': `Bearer ${currentUser.token}`,
					'Content-type': 'application/json'
				}
			});
		}

		return next.handle(request).pipe(catchError((error, caught) => {
			//intercept the respons error and displace it to the console
			this.handleAuthError(error);
			return of(error);
		}) as any);
	}

	private handleAuthError(err: HttpErrorResponse): Observable<any> {
		if (err.status === 401) {
			this.authService.logout();
			this.router.navigate([`/login`]);

			return of(err.message);
		}

		throw err;
	  }
}
