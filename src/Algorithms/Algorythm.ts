import { CellNode } from '../Objects/CellNode';
import { CellType } from '../enums/CellType';
import { Cell } from '../GameArea/Cell';
import { VirtualCell } from '../types/types';

export abstract class Algorythm {

	protected area: Cell[][];

	public foundNode: CellNode | undefined;
	protected start: Cell | undefined;
	protected target: Cell | undefined;
	protected path: CellNode[];
	protected virtualArea: VirtualCell[][];

	public constructor(area: Cell[][]) {
		this.area = area;
		this.init();
		this.path = [] as CellNode[];
		this.virtualArea = this.initVirtualArea();
	}


	public abstract tick(): void;


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

	private init():void {
		const coordinates = this.findStartAndTarget() as StartAndTarget;
		this.start = this.area[coordinates.start.y][coordinates.start.x];
		this.target = this.area[coordinates.target.y][coordinates.target.x];
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
