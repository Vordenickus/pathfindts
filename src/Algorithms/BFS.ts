import { Algorythm } from "./Algorythm";
import { Algorithms } from "../enums/Algorithms";
import { Cell } from "../GameArea/Cell";
import { CellNode } from "../Objects/CellNode";
import { VirtualCell } from "~/types/types";

export class BFS extends Algorythm {

	public static ALGORITHM_NAME = Algorithms.BFS as Algorithms;

	private found = false as boolean;


	public constructor(area: Cell[][]) {
		super(area);
	}


	tick(): void {
		if (!this.found) {
			if (this.path.length === 0) {
				this.path.push(new CellNode(this.start!.getX(), this.start!.getY(), null));
			}
			const temp = this.path.shift() as CellNode;
			const workingCell = this.area[temp.getY()][temp.getX()];

			workingCell.curr = true;
			workingCell.passThrough = true;

			this.virtualArea[temp.getY()][temp.getX()].visited = true;

			if (temp.getX() === this.target!.getX() && temp.getY() === this.target!.getY()) {
				workingCell.passThrough = false;
				this.found = true;
				this.foundNode = temp;
			}

			if (!this.found) {
				const children = temp.getChildren(this.area) as CellNode[];

				children.forEach((el: CellNode) => {
					if (!this.virtualArea[el.getY()][el.getX()].visited) {
						this.path.push(el);
						this.virtualArea[el.getY()][el.getX()].visited = true;
						this.area[el.getY()][el.getX()].passThrough = true;
					}
				});
			}
			if (this.path.length === 0) {
				this.found = false;
				console.log('done');
			}
		}
	}


	public isFound():boolean {
		return this.found;
	}
}


