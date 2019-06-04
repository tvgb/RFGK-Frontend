import { IPlayer } from './player-model';
import { IRound } from '../table/round-model';

export interface IScorecard {
	id: number;
	date_time: Date;
	Player: IPlayer;
	Rounds: IRound[];
}
