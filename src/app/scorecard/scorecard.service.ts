import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IScorecard } from './scorecard-model';
import { stringify } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScorecardService {
	private http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	getScorecards(): Observable<IScorecard[]> {
		//return this.http.get<IScorecard[]>('https://www.xn--rnvikfrisbeegolf-lxb.no/scorecard');
		return this.http.get<IScorecard[]>('http://localhost:3000/scorecard');
	}
}
