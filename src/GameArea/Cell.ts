import {CellType} from '../enums/CellType'

export class Cell {
	private x: number;
	private y: number;
	private path = false as boolean;
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
		cntx.fillRect(this.x + Cell.BORDER, this.y + Cell.BORDER, Cell.WIDTH - (Cell.BORDER * 2), Cell.HEIGHT - (Cell.BORDER * 2));

		cntx.fillStyle! = save;
	}


	private calculateColor(type: CellType): string {
		switch(type) {
			case CellType.START:
				return 'purple';
			case CellType.TARGET:
				return 'yellow';
			case CellType.WALL:
				return '#fff';
			case CellType.EARTH:
			default:
				return '#000';
		}
	}
}
