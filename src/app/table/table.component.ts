import { Component, OnInit, Input } from '@angular/core';

import { IRound } from './round-model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ScorecardService } from '../scorecard/scorecard.service';
import { AuthenticationService } from '../login/authentication.service';


@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

	deleteProgress = 0;
	displayedColumns: string[] = ['position', 'first_name', 'last_name', 'course', 'par', 'number_of_throws', 'score'];
	displayedColumnsMobile: string[] = ['position', 'last_name', 'score'];
	dataSource: IRound[] = [];
	date: string;
	isAdmin: boolean;

	@Input() rounds: IRound[];

	constructor( private scorecardService: ScorecardService,
				private authenticationService: AuthenticationService,
				private breakpointObserver: BreakpointObserver) {}

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches)
		);

  	ngOnInit() {
		this.dataSource = this.rounds;
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		if (currentUser && currentUser.player) {
			this.authenticationService.isAdmin(currentUser.player.id)
			.subscribe(data => {
				this.isAdmin = data;
			});
		} else {
			this.isAdmin = false;
		}
	}

	deleteScorecard(event) {
		this.deleteProgress = event / 10;
		if (this.deleteProgress === 100 && this.isAdmin) {
			this.scorecardService.deleteScorecard(this.rounds[0].scorecard_id)
				.subscribe(res => {
					console.log(res);
				});
		}
	}

	getSum(round: IRound): string {
		const score: number = round.throws - round.Course.par;

		if (score > 0) {
			return `+${score}`;
		} else if (score < 0) {
			return `${score}`;
		} else {
			return `${score}`;
		}
	}

	getColor(round: IRound): string {
		const score: number = round.throws - round.Course.par;
		const goodScoore = 5;
		const okScore = 10;
		const redMax = 30;
		const greenMax = 0;
		const alpha = 0.85;

		if (score <= goodScoore) {
			// lightness green range 90 - 70
			const step = 20 / Math.abs(greenMax - goodScoore);
			let lightness = 70 + score * step;
			if (lightness < 70) {lightness = 70; } else if (lightness > 90) {lightness = 90; }

			return `hsla(120, 70%, ${lightness}%, ${alpha})`;

		} else if (score <= okScore) {
			//
			const step = 20 / (okScore - goodScoore);
			let lightness = 90 - score + step;
			if (lightness < 70) {lightness = 70; } else if (lightness > 90) {lightness = 90; }

			return `hsla(60, 100%, ${lightness}%, ${alpha})`;

		} else {
			// lightness red range 90 - 70
			const step = 20 / (redMax - goodScoore);
			let lightness = 90 - score * step;
			if (lightness < 70) {lightness = 70; } else if (lightness > 90) {lightness = 90; }

			return `hsla(0, 100%, ${lightness}%, ${alpha})`;
		}


	}
}
