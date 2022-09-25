import {CellType} from '../enums/CellType'

export class Cell {
	private x: number;
	private y: number;
	private static WIDTH = 20 as number;
	private static HEIGHT = 20 as number;

	public type: CellType;

	public path = false as boolean;
	public passThrough = false as boolean;
	public visited = false as boolean;
	public curr = false as boolean;


	constructor(x: number, y: number, type: CellType) {
		this.x = x;
		this.y = y;
		this.type = type;
	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		const save = cntx.fillStyle!;
		cntx.fillStyle! = this.calculateColor(this.type);
		cntx.rect(this.x, this.y, Cell.WIDTH, Cell.HEIGHT);
		cntx.fillRect(this.x, this.y, Cell.WIDTH, Cell.HEIGHT);

		cntx.fillStyle! = save;
	}


	private calculateColor(type: CellType): string {
		let color: string;
		switch(type) {
			case CellType.START:
				color = '#ff00ff';
				break;
			case CellType.TARGET:
				color = '#ffff00';
				break;
			case CellType.WALL:
				color = '#fff';
				break;
			case CellType.EARTH:
			default:
				color = '#000';
				break;
		}

		if (this.curr && (this.type !== CellType.START && this.type !== CellType.TARGET)) {
			color = 'orange';
		}

		if (this.passThrough && (this.type !== CellType.START && this.type !== CellType.TARGET)) {
			color = 'aqua';
		}

		if  (this.visited && (this.type !== CellType.START && this.type !== CellType.TARGET)) {
			color = 'red';
		}

		if (this.path && (this.type !== CellType.START && this.type !== CellType.TARGET)) {
			color = 'green';
		}

		return color;
	}


	public getX():number {
		return this.x / Cell.WIDTH;
	}


	public getY():number {
		return this.y / Cell.HEIGHT;
	}
}
