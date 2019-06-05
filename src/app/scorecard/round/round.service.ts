import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IPlayer } from '../player-model';
import { IRound } from '../../table/round-model';
import { ICourse } from '../course-model';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RoundService {

	private http: HttpClient;
	private rounds: IRound[] = [];
	private roundsUpdated = new Subject<IRound[]>();
	private apiEndpoint = environment.apiEndpoint;

	constructor(http: HttpClient) {
		this.http = http;
	}

	// Returns a deep copied version of rounds
	getRounds() {
		return [...this.rounds];
	}

	addRound(round: IRound) {

		for (let i = 0; i < this.rounds.length; i++) {
			const roundInList: IRound = this.rounds[i];
			if (round.Player.id === roundInList.Player.id) {
				this.rounds[i] = round;
				const roundsReversed = [...this.rounds].reverse();
				this.roundsUpdated.next(roundsReversed);
				return;
			}
		}

		this.rounds.push(round);
		const roundsReversed = [...this.rounds].reverse();
		this.roundsUpdated.next(roundsReversed);
	}

	removeRound(round: IRound) {
		for (let i = 0; i < this.rounds.length; i++) {
			const roundInList: IRound = this.rounds[i];
			if (round.Course.id === roundInList.Course.id && round.Player.id === roundInList.Player.id && round.throws === roundInList.throws) {
				this.rounds.splice(i, 1);
			}
		}

		const roundsReversed = [...this.rounds].reverse();
		this.roundsUpdated.next(roundsReversed);
	}

	removeAllRounds() {
		this.rounds = [];
		const roundsReversed = [...this.rounds].reverse();
		this.roundsUpdated.next(roundsReversed);
	}

	getRoundsUpdatedListener() {
		return this.roundsUpdated.asObservable();
	}

	getPlayers(): Observable<IPlayer[]> {
		return this.http.get<IPlayer[]>(`${this.apiEndpoint}/players`);
	}

	getCourses(): Observable<ICourse[]> {
		return this.http.get<ICourse[]>(`${this.apiEndpoint}/courses`);
	}
}
