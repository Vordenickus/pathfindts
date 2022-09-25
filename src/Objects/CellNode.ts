import { Cell } from '../GameArea/Cell';
import { CellType } from '../enums/CellType';

export class CellNode {
	private readonly x:number;
	private readonly y:number;

	private value:number;

	private valueAStar:number;

	private readonly parent:CellNode | null;

	public constructor(x:number, y:number, parent:CellNode|null);
	public constructor(x:number, y:number, parent:CellNode|null, value:number);
	public constructor(x:number, y:number, parent:CellNode|null, value:number, valueAStart:number);
	public constructor(x:number, y:number, parent:CellNode|null, value?:number, valueAStar?:number) {
		this.x = x;
		this.y = y;
		this.parent = parent;
		this.value = value ?? Number.MAX_SAFE_INTEGER;
		this.valueAStar = valueAStar ?? Number.MAX_SAFE_INTEGER;
	}

	public getChildren(area: Cell[][]): CellNode[] {
		const children: CellNode[] = [];

		const maxPos = area.length - 1;

		if (this.x > 0) {
			if (area[this.y][this.x - 1].type !== CellType.WALL) {
				children.push(new CellNode(this.x - 1, this.y, this));
			}
		}

		if (this.x < maxPos) {
			if (area[this.y][this.x + 1].type !== CellType.WALL) {
				children.push(new CellNode(this.x + 1, this.y, this));
			}
		}

		if (this.y > 0) {
			if (area[this.y - 1][this.x].type !== CellType.WALL) {
				children.push(new CellNode(this.x, this.y - 1, this));
			}
		}

		if (this.y < maxPos) {
			if (area[this.y + 1][this.x].type !== CellType.WALL) {
				children.push(new CellNode(this.x, this.y + 1, this));
			}
		}

		return children;
	}


	public getChildrenAstar(area: Cell[][], targetX: number, targetY: number): CellNode[] {
		const children = [] as CellNode[];

		const maxPos = area.length - 1;

		if (this.x > 0) {
			if (area[this.y][this.x - 1].type !== CellType.WALL) {
				children.push(new CellNode(
					this.x - 1,
					this.y,
					this,
					this.getDistance(this.x - 1,  this.y, area),
					this.computeValueAStar(area, targetX, targetY, this.x - 1, this.y),
				));
			}
		}

		if (this.x < maxPos) {
			if (area[this.y][this.x + 1].type !== CellType.WALL) {
				children.push(new CellNode(
					this.x + 1,
					this.y,
					this,
					this.getDistance(this.x + 1,  this.y, area),
					this.computeValueAStar(area, targetX, targetY, this.x + 1, this.y),
				));
			}
		}

		if (this.y > 0) {
			if (area[this.y - 1][this.x].type !== CellType.WALL) {
				children.push(new CellNode(
					this.x,
					this.y - 1,
					this,
					this.getDistance(this.x,  this.y - 1, area),
					this.computeValueAStar(area, targetX, targetY, this.x, this.y - 1),
				));
			}
		}

		if (this.y < maxPos) {
			if (area[this.y + 1][this.x].type !== CellType.WALL) {
				children.push(new CellNode(
					this.x,
					this.y + 1,
					this,
					this.getDistance(this.x,  this.y + 1, area),
					this.computeValueAStar(area, targetX, targetY, this.x, this.y + 1),
				));
			}
		}

		return children;
	}


	private getDistance(x: number, y: number, area: Cell[][]): number {
		const temp = area[y][x] as Cell;
		let addDistance = 10 as number;
		switch (temp.type) {
			case CellType.EARTH:
				addDistance = 10;
				break;
			case CellType.STONE:
				addDistance = 1;
				break;
			case CellType.SAND:
				addDistance = 30;
				break;
			case CellType.WATER:
				addDistance = 200;
				break;
			default:
				break;
		}
		return this.value + addDistance;
	}


	private computeValueAStar(area: Cell[][], targetX: number, targetY: number, x: number, y: number): number {
		return this.getDistance(x, y, area) + this.getHeiuristic(targetX, targetY, x, y);
	}

	private getHeiuristic(targetX: number, targetY: number, x: number, y: number) {
		return Math.sqrt(((targetX - x) * (targetX - x)) + ((targetY - y) * (targetY - y))) * 20;
	}


	public getX(): number {
		return this.x;
	}

	public getY():number {
		return this.y;
	}

	public getParent(): CellNode | null {
		return this.parent;
	}
}
