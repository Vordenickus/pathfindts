import { Algorythm } from "./Algorythm";
import { Algorithms } from "../enums/Algorithms";
import { Cell } from "../GameArea/Cell";
import { CellNode } from "../Objects/CellNode";
import { PriorityQueue } from "../utils/PriorityQueue";

export class AStar extends Algorythm {

	public static ALGORITHM_NAME = Algorithms.ASTAR as Algorithms;

	private found = false as boolean;
	private aStarPath: PriorityQueue<CellNode>;

	private index = 0 as number;

	public constructor(area: Cell[][]) {
		super(area);
		this.aStarPath = new PriorityQueue((a, b) => a.getValueAStar() < b.getValueAStar());
	}


	public tick(): void {
		if (!this.found) {
			if (this.aStarPath.size() === 0) {
				this.aStarPath.push(new CellNode(this.start!.getX(), this.start!.getY(), null, 0, 0));
			}

			const temp = this.aStarPath.pop();
			const workingCell = this.area[temp.getY()][temp.getX()];

			workingCell.curr = true;
			workingCell.passThrough = true;
			workingCell.visited = true;

			this.virtualArea[temp.getY()][temp.getX()].visited = true;

			if (temp.getX() === this.target?.getX() && temp.getY() === this.target.getY()) {
				workingCell.passThrough = false;
				workingCell.curr = false;
				workingCell.visited = false;
				this.found = true;
				this.foundNode = temp;
			}

			if (!this.found) {
				const children = temp.getChildrenAstar(this.area, this.target!.getX(), this.target!.getY()) as CellNode[];

				children.forEach((el) => {
					if (!this.virtualArea[el.getY()][el.getX()].visited) {
						this.aStarPath.push(el);
						this.area[el.getY()][el.getX()].passThrough = true;
						this.virtualArea[el.getY()][el.getX()].visited = true;
					}
				});
			}
		}
	}


	public isFound():boolean {
		return this.found;
	}
}
