import { Component, OnInit } from '@angular/core';
import { IScorecard } from '../scorecard-model';
import { ScorecardService } from '../scorecard.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-scorecard',
	templateUrl: './scorecard-list.component.html',
	styleUrls: ['./scorecard-list.component.css']
})
export class ScorecardListComponent implements OnInit {

	scorecards: IScorecard[] = [];

	constructor(private scorecardService: ScorecardService, private datePipe: DatePipe) { }

	ngOnInit() {
		this.getScorecards();
	}

	getScorecards() {
		this.scorecardService.getScorecards()
			.subscribe(data => {
				this.scorecards = data;
				console.log(this.scorecards);
			});
	}
}
