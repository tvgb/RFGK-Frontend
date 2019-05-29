import { Component, OnInit, Input } from '@angular/core';

import { IRound } from './round-model';
import { IScorecard } from '../scorecard/scorecard-model';
import { RoundService } from './round.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

	roundService: RoundService;
	displayedColumns: string[] = ['position', 'first_name', 'last_name', 'course', 'par', 'number_of_throws', 'score'];
	displayedColumnsMobile: string[] = ['position', 'last_name', 'course', 'score'];
	dataSource: IRound[] = [];
	date: string;
	@Input() rounds: IRound[];

  	constructor(roundService: RoundService, private breakpointObserver: BreakpointObserver) {
		this.roundService = roundService;
	}

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches)
		);


  	ngOnInit() {
		console.log(this.rounds);
		this.dataSource = this.rounds;
	}

	getSum(round: IRound): string {
		const score: number = round.throws - round.Course.par;

		if (score > 0) {
			return `+${score}`;
		} else if (score < 0) {
			return `-${score}`;
		} else {
			return '≈';
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
			if (lightness < 70) {lightness = 70; }
			else if (lightness > 90) {lightness = 90; }

			return `hsla(120, 70%, ${lightness}%, ${alpha})`;

		} else if (score <= okScore) {
			//
			const step = 20 / (okScore - goodScoore);
			let lightness = 90 - score + step;
			if (lightness < 70) {lightness = 70; }
			else if (lightness > 90) {lightness = 90; }

			return `hsla(60, 100%, ${lightness}%, ${alpha})`;

		} else {
			// lightness red range 90 - 70
			const step = 20 / (redMax - goodScoore);
			let lightness = 90 - score * step;
			if (lightness < 70) {lightness = 70; }
			else if (lightness > 90) {lightness = 90; }

			return `hsla(0, 100%, ${lightness}%, ${alpha})`;
		}


	}
}
