import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRound } from './round-model';
import { stringify } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoundService {
	private http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	getRounds(id: number): Observable<IRound[]> {
		return this.http.get<IRound[]>('https://www.xn--rnvikfrisbeegolf-lxb.no/scorecard/'.concat('/' + id));
	}
}
