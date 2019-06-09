import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RegistrationService {

	apiEndpoint = environment.apiEndpoint;

	constructor(private http: HttpClient) { }

	registerNewPlayer(values): Observable<any> {
		return this.http.post<any>(`${this.apiEndpoint}/players/signup`, values);
	}

}
