import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

	url = 'http://localhost:3000';

	constructor(private http: HttpClient) { }

	login(email: string, password: string) {
		return this.http.post<any>(`${this.url}/players/login`, { email, password })
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
		return this.http.get<boolean>(`${this.url}/players/${playerId}`);
	}
}
