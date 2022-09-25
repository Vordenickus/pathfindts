import { Cell } from '../GameArea/Cell';

export abstract class Algorythm {

	private area: Cell[][];

	public constructor(area: Cell[][]) {
		this.area = area;
	}


	public abstract tick();
}
