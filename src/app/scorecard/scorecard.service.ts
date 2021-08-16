import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IScorecard } from './scorecard-model';
import { Observable, from, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ScorecardService {
	private http: HttpClient;
	private apiEndpoint = environment.apiEndpoint;
	private scorecardDeletedId = new Subject<number>();

	constructor(http: HttpClient) {
		this.http = http;
	}

	getScorecards(): Observable<IScorecard[]> {
		return this.http.get<IScorecard[]>(`${this.apiEndpoint}/scorecard`);
	}

	getScorecardDeletedIdListener() {
		return this.scorecardDeletedId.asObservable();
	}

	addScorecard(scorecard: IScorecard): Observable<IScorecard> {
		return this.http.post<IScorecard>(`${this.apiEndpoint}/scorecard`, scorecard)
		.pipe(
			catchError(this.handleError)
		);
	}

	deleteScorecard(scorecardId: number): Observable<any> {
		const obs = this.http.delete<any>(`${this.apiEndpoint}/scorecard/${scorecardId}`)
		.pipe(
			catchError(this.handleError)
		);

		this.scorecardDeletedId.next(scorecardId);
		return obs;
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
		  // A client-side or network error occurred. Handle it accordingly.
		  console.error('An error occurred:', error.error.message);
		} else {
		  // The backend returned an unsuccessful response code.
		  // The response body may contain clues as to what went wrong,
		  console.error(
			`Backend returned code ${error.status}, ` +
			`body was: ${error.error}`);
		}

		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	}
}
