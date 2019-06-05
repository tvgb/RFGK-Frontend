import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

	apiEndpoint = environment.apiEndpoint;

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
				}

				return player;
			}));
	}

	logout() {
		// remove user from local storage to log user out
		sessionStorage.removeItem('currentUser');
	}

	isAdmin(playerId: number): Observable<boolean> {
		return this.http.get<boolean>(`${this.apiEndpoint}/players/${playerId}`);
	}
}
