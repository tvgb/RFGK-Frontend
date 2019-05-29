import { ICourse } from '../scorecard/course-model';
import { IPlayer } from '../scorecard/player-model';


export interface IRound {
	date: Date;
	par: number;
	throws: number;
	Course: ICourse;
	Player: IPlayer;
}
