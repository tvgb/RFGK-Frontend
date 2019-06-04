import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { RoundService } from '../round.service';
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { IPlayer } from '../../player-model';
import { IRound } from '../../../table/round-model';
import { ICourse } from '../../course-model';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
	  	dateInput: 'LL',
	},
	display: {
		dateInput: 'LL',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'app-round-create',
	templateUrl: './round-create.component.html',
	styleUrls: ['./round-create.component.css'],
	providers: [
		// `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
		// application's root module. We provide it at the component level here, due to limitations of
		// our example generation script.
		{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
	]
})
export class RoundCreateComponent implements OnInit {

	players: IPlayer[] = [];
	courses: ICourse[] = [];

	date: Date = null;
	course: ICourse = null;

	scoreValue = 0;

	constructor(public roundService: RoundService) {}

	ngOnInit() {
		this.getPlayers();
		this.getCourses();
	}

	onAddRound(form: NgForm) {
		if (form.invalid) {
			return;
		}

		this.date = form.value.date;
		this.course = form.value.course;
		const throws = form.value.score + this.course.par;
		const Player: IPlayer = form.value.player;

		const newRound: IRound = {scorecard_id: -1, date: this.date, throws, Course: this.course, Player};
		this.roundService.addRound(newRound);

		form.resetForm({date: this.date, course: this.course, score: 0});
	}

	onChangeCourseOrDate() {
		if (this.date !== null && this.course !== null) {
			this.roundService.removeAllRounds();
		}
	}

	getPlayers() {
		this.roundService.getPlayers()
			.subscribe(data => {
				this.players = data;
			});
	}

	getCourses() {
		this.roundService.getCourses()
			.subscribe(data => {
				this.courses = data;
			});
	}

	formatLabel(value: number | null) {
		if (!value) {
		  return 0;
		} else if (value > 0) {
			return `+${value}`;
		}

		return value;
	}
}
