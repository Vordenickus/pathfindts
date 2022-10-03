import { CellType } from '../enums/CellType';
import { Algorithms } from '../enums/Algorithms';

export class Gui {
	private typeButtons: NodeListOf<HTMLDivElement>;
	private algoButtons: NodeListOf<HTMLDivElement>;
	private clearButton: HTMLDivElement;
	private startButton: HTMLDivElement;
	private stopButton: HTMLDivElement;

	private currAlgorithm = Algorithms.BFS as Algorithms;

	private startActive = false as boolean;


	private static TYPE_CLASS = 'b-type-picker__cell';
	private static ALGO_CLASS = 'b-algorithm-picker__cell';
	private static CLEAR_CLASS = 'b-clear';
	private static START_CLASS = 'b-start';
	private static STOP_CLASS = 'b-stop';
	private static ACTIVE_TYPE_CLASS = 'b-type-picker__cell--active';
	private static ACTIVE_ALGO_CLASS = 'b-algorithm-picker__cell--active';
	private static INACTIVE_START_CLASS = 'b-start--inactive';
	private static INACTIVE_STOP_CLASS = 'b-stop--inactive';

	public constructor() {
		this.typeButtons = document.querySelectorAll('.' + Gui.TYPE_CLASS);
		this.algoButtons = document.querySelectorAll('.' + Gui.ALGO_CLASS);
		this.clearButton = document.querySelector('.' + Gui.CLEAR_CLASS)!;
		this.startButton = document.querySelector('.' + Gui.START_CLASS)!;
		this.stopButton = document.querySelector('.' + Gui.STOP_CLASS)!;
		this.initTypeListeners();
		this.initClearListener();
		this.initAlgoListeners();
		this.initStartButton();
		this.initStopButton();
	}


	private initTypeListeners():void {
		this.typeButtons.forEach((element: HTMLDivElement) => {
			element.addEventListener('click', () => {
				this.clearTypeActive();
				element.classList.add(Gui.ACTIVE_TYPE_CLASS);
				const event = new CustomEvent('typechanged', {
					detail: this.calculateCurrentType(element.id) as CellType,
				})
				window.dispatchEvent(event);
			});
		});
	}


	private initAlgoListeners():void {
		this.algoButtons.forEach((element: HTMLDivElement) => {
			element.addEventListener('click', () => {
				this.clearAlgoActive();
				element.classList.add(Gui.ACTIVE_ALGO_CLASS);
				this.currAlgorithm = this.calculateCurrentAlgo(element.id);
			});
		});
	}


	private initStartButton():void {
		window.addEventListener('areachanged', ((e:CustomEvent) => {
			if (e.detail.isReady) {
				this.startButton.classList.remove(Gui.INACTIVE_START_CLASS);
				this.startActive = true;
			} else {
				this.startActive = false;
				this.startButton.classList.add(Gui.INACTIVE_START_CLASS);
			}
		}) as EventListener);
		this.startButton.addEventListener('click', () => {
			const event = new CustomEvent('startinited', {
				detail: {
					algorithmName: this.currAlgorithm,
				}
			});
			if (this.startActive) {
				window.dispatchEvent(event);
			}
		});
	}


	private initStopButton():void {
		window.addEventListener('startinited', () => {
			this.stopButton.classList.remove(Gui.INACTIVE_STOP_CLASS);
			console.log(this.stopButton);
		});
		this.stopButton.addEventListener('click', ()=>{
			if (!this.stopButton.classList.contains(Gui.INACTIVE_STOP_CLASS)) {
				const event = new CustomEvent('pathclear', {});
				window.dispatchEvent(event);
				this.stopButton.classList.add(Gui.INACTIVE_STOP_CLASS);
			}
		});
	}


	private initClearListener():void {
		this.clearButton.addEventListener('click', () => {
			const event = new CustomEvent('cleararea', {
			});
			window.dispatchEvent(event);
		});
	}


	private clearTypeActive(): void {
		this.typeButtons.forEach((element: HTMLDivElement) => {
			element.classList.remove(Gui.ACTIVE_TYPE_CLASS);
		});
	}


	private clearAlgoActive(): void {
		this.algoButtons.forEach((element: HTMLDivElement) => {
			element.classList.remove(Gui.ACTIVE_ALGO_CLASS);
		});
	}


	private calculateCurrentAlgo(id: string):Algorithms {
		switch(id) {
			case 'ap-astar':
				return Algorithms.ASTAR;
			case 'ap-bfs':
			default:
				return Algorithms.BFS;
		}
	}


	private calculateCurrentType(id: string):CellType {
		switch(id) {
			case 'tp-target':
				return CellType.TARGET;
			case 'tp-wall':
				return CellType.WALL;
			case 'tp-start':
				return CellType.START;
			case 'tp-sand':
				return CellType.SAND;
			case 'tp-water':
				return CellType.WATER;
			case 'tp-stone':
				return CellType.STONE;
			case 'tp-earth':
			default:
				return CellType.EARTH;
		}
	}
}
