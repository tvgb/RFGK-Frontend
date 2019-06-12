import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ProfileService {

	apiEndpoint = environment.apiEndpoint;

	constructor(private http: HttpClient) { }

	updatePlayerInfo(values): Observable<any> {
		return this.http.put<any>(`${this.apiEndpoint}/players/updateInfo`, values)
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

}
