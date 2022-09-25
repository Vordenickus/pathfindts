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
