import { Component, OnInit, OnDestroy } from '@angular/core';
import { IScorecard } from '../scorecard-model';
import { ScorecardService } from '../scorecard.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-scorecard',
	templateUrl: './scorecard-list.component.html',
	styleUrls: ['./scorecard-list.component.css']
})

export class ScorecardListComponent implements OnInit, OnDestroy {

	scorecards: IScorecard[] = [];
	private scorecardSubscription: Subscription;

	constructor(private scorecardService: ScorecardService) { }

	ngOnInit() {
		this.scorecardService.getScorecards()
			.subscribe((scorecards: IScorecard[]) => {
				this.scorecards = scorecards;
			});


		this.scorecardSubscription = this.scorecardService.getScorecardDeletedIdListener()
			.subscribe((scorecardId: number) => {
				let scorecardIndex = -1;
				for (let i = 0; i < this.scorecards.length; i++) {
					if (this.scorecards[i].id === scorecardId) {
						scorecardIndex = i;
						break;
					}
				}

				if (scorecardIndex >= 0) {
					this.scorecards.splice(scorecardIndex, 1);
				}
			});
	}

	ngOnDestroy() {
		this.scorecardSubscription.unsubscribe();
	}
}
