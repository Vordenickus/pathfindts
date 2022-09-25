import { CellType } from "../enums/CellType";
import { Cell } from "./Cell";
import { Gui } from "../gui/Gui";
import { TypeEvent } from "../types/types";

export class GameArea {
	private gameArea: Cell[][];

	private currentType = CellType.WALL as CellType;

	private width: number;

	private static WIDTH = 10;

	public constructor(width: number) {
		this.gameArea = this.initGameArea(width);
		this.width = width;
		window.addEventListener('typechanged', ((e: CustomEvent) => {
			this.currentType = e.detail;
		}) as EventListener);
		window.addEventListener('cleararea', (() => {
			this.clearGameArea();
			console.log('ff');
		}) as EventListener);
	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		for (let i = 0, limit = this.gameArea.length; i < limit; i++) {
			for (let x = 0, xLimit = this.gameArea[i].length; x < xLimit; x++) {
				this.gameArea[i][x].draw(cntx, canvas);
			}
		}
	}


	public mouseOver(event: MouseEvent) {
		const x = event.offsetX;
		const y  = event.offsetY;
		const indexX = Math.floor(x / 10);
		const indexY = Math.floor(y / 10);

		if (event.type === 'click') {
			this.gameArea[indexY][indexX].type = this.currentType;
		}

		if (event.buttons === 1) {
			this.gameArea[indexY][indexX].type = this.currentType;
		}
	}


	private initGameArea(width: number): Cell[][] {
		const area = [] as Cell[][];
		for (let i = 0; i < width / GameArea.WIDTH; i++) {
			area.push([]);
			for (let x = 0; x < width / GameArea.WIDTH; x++) {
				const cell = new Cell(x * GameArea.WIDTH, i * GameArea.WIDTH, CellType.EARTH);
				area[i].push(cell);
			}
		}
		return area;
	}


	private clearGameArea():void {
		this.gameArea = this.initGameArea(this.width);
	}
}
