import { Algorithms } from "../enums/Algorithms";
import { CellNode } from "../Objects/CellNode";
import { Algorythm } from "../Algorithms/Algorythm";
import { BFS } from "../Algorithms/BFS";
import { AStar } from "../Algorithms/AStar";
import { CellType } from "../enums/CellType";
import { Cell } from "./Cell";

export class GameArea {
	private gameArea: Cell[][];

	private currentType = CellType.WALL as CellType;

	private algorithm = null as Algorythm | null;

	private started = false as boolean;

	private width: number;

	private static WIDTH = 20;

	public constructor(width: number) {
		this.gameArea = this.initGameArea(width);
		this.width = width;
		window.addEventListener('typechanged', ((e: CustomEvent) => {
			this.currentType = e.detail;
		}) as EventListener);
		window.addEventListener('cleararea', (() => {
			this.clearGameArea();
		}) as EventListener);
		window.addEventListener('startinited', ((e: CustomEvent) => {
			this.algorithm = this.pickAlgorythm(e.detail.algorithmName);
			this.started = true;
		}) as EventListener);
		window.addEventListener('pathclear', ((e: CustomEvent) => {
			this.algorithm = null;
			this.started = false;
			this.gameArea = this.clearPathRelated(this.gameArea);
		}) as EventListener);
	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		for (let i = 0, limit = this.gameArea.length; i < limit; i++) {
			for (let x = 0, xLimit = this.gameArea[i].length; x < xLimit; x++) {
				this.gameArea[i][x].draw(cntx, canvas);
			}
		}
	}


	public tick() {
		if (this.algorithm !== undefined) {
			if (this.started) {
				this.algorithm?.tick();
			}
		}
		if (this.algorithm?.foundNode) {
			const node = this.algorithm?.foundNode;
			this.gameArea[node.getY()][node.getX()].path = true;

			let parent = node.getParent() as CellNode | null;

			while (parent !== null) {
				this.gameArea[parent.getY()][parent.getX()].path = true;
				parent = parent.getParent();
			}
			this.clearIntermediate();
		}
	}


	public mouseOver(event: MouseEvent) {
		const x = event.offsetX;
		const y  = event.offsetY;
		const indexX = Math.floor(x / GameArea.WIDTH);
		const indexY = Math.floor(y / GameArea.WIDTH);

		if (event.buttons === 1 || event.type === 'click') {
			this.changeType(indexX, indexY, this.currentType);
		}
	}


	private clearIntermediate() {
		for (let i = 0, iLimit = this.gameArea.length; i < iLimit; i++) {
			for (let x = 0, xLimit = this.gameArea[i].length; x < xLimit; x++) {
				const cell = this.gameArea[i][x];
				cell.curr = false;
				cell.passThrough = false;
				cell.visited = false;
			}
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
		this.algorithm = null;
		const event = new CustomEvent('areachanged', {
			detail: {
				isReady: this.isStartSet() && this.isTargetSet(),
			}
		});
		window.dispatchEvent(event);
	}


	private clearPathRelated(area: Cell[][]): Cell[][] {
		for (let i = 0; i < area.length; i++) {
			for (let x = 0; x < area[i].length; x++) {
				const cell = area[i][x];
				cell.curr = false;
				cell.passThrough = false;
				cell.path = false;
				cell.visited = false;
			}
		}
		return area;
	}


	private changeType(xIndex: number, yIndex: number, type: CellType): void {
		switch(type) {
			case CellType.START:
				if (this.isStartSet()) {
					return;
				}
				break;
			case CellType.TARGET:
				if (this.isTargetSet()) {
					return;
				}
				break;
		}
		this.gameArea[yIndex][xIndex].type = type;
		const event = new CustomEvent('areachanged', {
			detail: {
				isReady: this.isStartSet() && this.isTargetSet(),
			}
		});
		window.dispatchEvent(event);
	}


	private isStartSet():boolean {
		for (let i = 0, iLimit = this.gameArea.length; i < iLimit; i++) {
			for (let x = 0, xLimit = this.gameArea[i].length; x < xLimit; x++) {
				if (this.gameArea[i][x].type === CellType.START) {
					return true;
				}
			}
		}
		return false;
	}


	private isTargetSet():boolean {
		for (let i = 0, iLimit = this.gameArea.length; i < iLimit; i++) {
			for (let x = 0, xLimit = this.gameArea[i].length; x < xLimit; x++) {
				if (this.gameArea[i][x].type === CellType.TARGET) {
					return true;
				}
			}
		}
		return false;
	}


	private pickAlgorythm(name: Algorithms): Algorythm {
		let algo: Algorythm;
		switch(name) {
			case Algorithms.ASTAR:
				algo = new AStar(this.gameArea);
				break;
			case Algorithms.BFS:
			default:
				algo = new BFS(this.gameArea);
				break;
		}
		return algo;
	}


	public getArea(): Cell[][] {
		return this.gameArea;
	}
}
