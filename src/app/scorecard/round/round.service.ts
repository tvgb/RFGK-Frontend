import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoundService {
	private http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}
}
