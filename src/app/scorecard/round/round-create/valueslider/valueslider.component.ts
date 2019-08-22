import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-valueslider',
	templateUrl: './valueslider.component.html',
	styleUrls: ['./valueslider.component.css']
})
export class ValuesliderComponent implements OnInit {

	public values: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

	constructor() { }

	ngOnInit() {
	}

}
