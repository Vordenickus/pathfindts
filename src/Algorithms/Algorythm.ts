import { CellNode } from '~/Objects/CellNode';
import { Cell } from '../GameArea/Cell';

export abstract class Algorythm {

	protected area: Cell[][];

	public foundNode: CellNode | undefined;

	public constructor(area: Cell[][]) {
		this.area = area;
	}


	public abstract tick(): void;
}
