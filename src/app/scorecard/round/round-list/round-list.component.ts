import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRound } from 'src/app/table/round-model';
import { RoundService } from '../round.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-round-list',
	templateUrl: './round-list.component.html',
	styleUrls: ['./round-list.component.css']
})
export class RoundListComponent implements OnInit, OnDestroy {

	rounds: IRound[] = [];
	private roundsSubscription: Subscription;

  	constructor(public roundService: RoundService) {
	}

  	ngOnInit() {
		this.rounds = this.roundService.getRounds();
		this.roundsSubscription = this.roundService.getRoundsUpdatedListener()
		.subscribe((rounds: IRound[]) => {
			this.rounds = rounds;
		});
	}

	ngOnDestroy() {
		this.roundsSubscription.unsubscribe();
	}

	removeRound(round: IRound) {
		console.log(`Removing round`);
		this.roundService.removeRound(round);
	}

}
