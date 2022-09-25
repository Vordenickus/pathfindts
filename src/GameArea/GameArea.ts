import { CellType } from "../enums/CellType";
import { Cell } from "./Cell";

export class GameArea {
	private gameArea: Cell[][];

	private static WIDTH = 10;

	public constructor(width: number) {
		this.gameArea = this.initGameArea(width);
	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		for (let i = 0, limit = this.gameArea.length; i < limit; i++) {
			for (let x = 0, xLimit = this.gameArea[i].length; x < xLimit; x++) {
				this.gameArea[i][x].draw(cntx, canvas);
			}
		}
	}


	private initGameArea(width: number): Cell[][] {
		const area = [] as Cell[][];
		for (let i = 0; i < width / GameArea.WIDTH; i++) {
			area.push([]);
			for (let x = 0; x < width / GameArea.WIDTH; x++) {
				const cell = new Cell(x * GameArea.WIDTH, i * GameArea.WIDTH, CellType.WALL);
				area[i].push(cell);
			}
		}
		return area;
	}
}
