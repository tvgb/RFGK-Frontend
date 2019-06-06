import { Component, OnInit } from '@angular/core';
import { RoundService } from '../round/round.service';
import { ScorecardService } from '../scorecard.service';
import { IRound } from '../../table/round-model';
import { IScorecard } from '../scorecard-model';
import { Subscription } from 'rxjs';
import { Response } from 'selenium-webdriver/http';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { IPlayer } from '../player-model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
	selector: 'app-scorecard-create',
	templateUrl: './scorecard-create.component.html',
	styleUrls: ['./scorecard-create.component.css']
})

export class ScorecardCreateComponent implements OnInit {

	rounds: IRound[] = [];
	private roundsSubscription: Subscription;

// tslint:disable-next-line: max-line-length
	constructor(private snackBar: MatSnackBar, private router: Router, private roundService: RoundService, private scorecardService: ScorecardService) {}

	ngOnInit() {
		this.roundService.removeAllRounds();
		this.roundsSubscription = this.roundService.getRoundsUpdatedListener()
		.subscribe((rounds: IRound[]) => {
			this.rounds = rounds;
		});
	}

	createScorecard() {
		const storedValue = JSON.parse(sessionStorage.getItem('currentUser'));

		if (!(storedValue && storedValue.player)) {
			this.router.navigate(['/login']);
			return;
		}

		const player = storedValue.player;

		const newScorecard: IScorecard = {
			id: -1,
			date_time: this.rounds[0].date,
			Player: player,
			Rounds: this.rounds
		};

		this.scorecardService.addScorecard(newScorecard).subscribe( res => {
		}, error => {
			console.log(`Error: ${error}`);
			return;
		});

		this.roundService.removeAllRounds();

		this.snackBar.open('Runden ble lagret i systemet.', 'OK', {
			duration: 5000,
		});

	}
}
