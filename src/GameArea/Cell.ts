import {CellType} from '../enums/CellType'

export class Cell {
	private x: number;
	private y: number;
	private path = false as boolean;
	private passThrough = false as boolean;
	private visited = false as boolean;
	private static WIDTH = 10 as number;
	private static HEIGHT = 10 as number;
	private static BORDER = 1 as number;

	public type: CellType;


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

		if (this.passThrough) {
			color = 'aqua';
		}

		if  (this.visited) {
			color = 'red';
		}

		if (this.path) {
			color = 'green';
		}

		return color;
	}
}
