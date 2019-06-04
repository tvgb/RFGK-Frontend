import { ICourse } from '../scorecard/course-model';
import { IPlayer } from '../scorecard/player-model';

export interface IRound {
	scorecard_id: number;
	date: Date;
	throws: number;
	Course: ICourse;
	Player: IPlayer;
}
