import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

	apiEndpoint = environment.apiEndpoint;
	private SESSION_STORAGE_VARIABLE = 'currentUser';
	private jwtHelper = new JwtHelperService();
	private isLoggedIn = false;
	private isLoggedInUpdated = new Subject<boolean>();


	constructor(private http: HttpClient) { }

	login(email: string, password: string) {
		return this.http.post<any>(`${this.apiEndpoint}/players/login`, { email, password })
			.pipe(map(player => {
				// login successful if there's a jwt token in the response
				if (player && player.token) {

					// store user details and jwt token in local storage to keep user logged in between page refreshes
					sessionStorage.setItem('currentUser', JSON.stringify({
						token: player.token,
						player: player.player}
					));

					this.isLoggedIn = true;
					this.isLoggedInUpdated.next(this.isLoggedIn);
				}

				return player;
			}));
	}

	logout() {
		// remove user from local storage to log user out
		sessionStorage.removeItem('currentUser');
		this.isLoggedIn = false;
		this.isLoggedInUpdated.next(this.isLoggedIn);
	}

	getToken(): string {
		return JSON.parse(sessionStorage.getItem(this.SESSION_STORAGE_VARIABLE)).token || null;
	}

	isTokenExpired(): boolean {
		const storedValue = JSON.parse(sessionStorage.getItem(this.SESSION_STORAGE_VARIABLE));

		if (!storedValue) { return true; }
		if (!storedValue.token) { return true; }

		return this.jwtHelper.isTokenExpired(storedValue.token);
	}

	isAdmin(playerId: number): Observable<boolean> {
		return this.http.get<boolean>(`${this.apiEndpoint}/players/${playerId}`);
	}

	isLoggedInStatusUpdater() {
		return this.isLoggedInUpdated.asObservable();
	}
}
