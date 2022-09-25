import { Algorythm } from "./Algorythm";
import { Algorithms } from "../enums/Algorithms";
import { Cell } from "../GameArea/Cell";
import { CellType } from "../enums/CellType";
import { CellNode } from "../Objects/CellNode";

export class BFS extends Algorythm {

	public static ALGORITHM_NAME = Algorithms.BFS as Algorithms;

	private found = false as boolean;

	private start: Cell | undefined;
	private target: Cell | undefined;

	private path: CellNode[];
	private virtualArea: VirtualCell[][];

	public constructor(area: Cell[][]) {
		super(area);
		this.init();
		this.path = [] as CellNode[];
		this.virtualArea = this.initVirtualArea();
	}


	private init():void {
		const coordinates = this.findStartAndTarget() as StartAndTarget;
		this.start = this.area[coordinates.start.y][coordinates.start.x];
		this.target = this.area[coordinates.target.y][coordinates.target.x];
	}


	private initVirtualArea(): VirtualCell[][] {
		const virtArea = [] as  VirtualCell[][];
		for (let i = 0, iLimit = this.area.length; i < iLimit; i++) {
			virtArea.push([] as VirtualCell[]);
			for (let x = 0, xLimit = this.area[i].length; x < xLimit; x++) {
				virtArea[i].push(({
					x: x,
					y: i,
					visited: false
				}) as VirtualCell);
			}
		}
		return virtArea;
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


	private findStartAndTarget(): StartAndTarget {
		const target = ({
			start: ({
				x: 0,
				y: 0,
			}) as Coordinates,
			target: ({
				x: 0,
				y: 0
			}) as Coordinates,
		}) as StartAndTarget;

		let startFound = false as boolean;
		let targetFound = false as boolean;

		for (let i = 0, iLimit = this.area.length; i < iLimit; i++) {
			for (let x = 0, xLimit = this.area[i].length; x < xLimit; x++) {
				if (this.area[i][x].type === CellType.START) {
					target.start.x = x;
					target.start.y = i;
					startFound = true;
				}
				if (this.area[i][x].type === CellType.TARGET) {
					target.target.x = x;
					target.target.y = i;
					targetFound = true;
				}
				if (startFound && targetFound) {
					return target;
				}
			}
		}
		return target;
	}
}

interface StartAndTarget {
	start: Coordinates,
	target: Coordinates
}

interface Coordinates {
	x: number,
	y: number
}

interface VirtualCell {
	x: number,
	y: number,
	visited: boolean
}
