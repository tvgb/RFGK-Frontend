import { Component, OnInit } from '@angular/core';
import { RoundService } from '../round/round.service';
import { ScorecardService } from '../scorecard.service';
import { IRound } from '../../table/round-model';
import { IScorecard } from '../scorecard-model';
import { Subscription } from 'rxjs';
import { Response } from 'selenium-webdriver/http';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { IPlayer } from '../player-model';


@Component({
	selector: 'app-scorecard-create',
	templateUrl: './scorecard-create.component.html',
	styleUrls: ['./scorecard-create.component.css']
})

export class ScorecardCreateComponent implements OnInit {

	rounds: IRound[] = [];
	private roundsSubscription: Subscription;

	constructor(public roundService: RoundService, public scorecardService: ScorecardService) {}

	ngOnInit() {
		this.roundService.removeAllRounds();
		this.roundsSubscription = this.roundService.getRoundsUpdatedListener()
		.subscribe((rounds: IRound[]) => {
			this.rounds = rounds;
		});
	}

	createScorecard() {
		const player = JSON.parse(sessionStorage.getItem('currentUser')).player;

		const newScorecard: IScorecard = {
			id: -1,
			date_time: this.rounds[0].date,
			Player: player,
			Rounds: this.rounds
		};

		this.scorecardService.addScorecard(newScorecard).subscribe( res => {
		}, error => {
			console.log(`Error: ${error}`);
		});

		this.roundService.removeAllRounds();
	}
}
