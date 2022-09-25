import {GameStateManager} from './GameState/GameStateManager';
import {TestState} from './GameState/states/TestState';
import { Gui } from './gui/Gui';

export class GameView {

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D | null;
	private width: number;
	private height: number;
	private gsm: GameStateManager;


	public constructor(canvas: string) {
		this.canvas = document.querySelector('#' + canvas) as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.gsm = new GameStateManager();
		window.addEventListener('keypress', (event) => {
			this.keyPressed(event);
		});
		this.canvas.addEventListener('mousemove', (ev: MouseEvent) => {
			ev.preventDefault();
			this.mouseOver(ev);
		});
		this.canvas.addEventListener('click', (ev) => {
			ev.preventDefault();
			this.mouseOver(ev);
		});
		this.canvas.addEventListener('contextmenu', (ev) => {
			ev.preventDefault();
		});
	}


	public start() {
		this.clear;
		this.gsm.pushState(new TestState(this.gsm));
		this.loop();
	}


	private render(): void {
		this.context!.fillStyle = '#000';
		this.context?.fillRect(0, 0, this.width, this.height);
		this.gsm.draw(this.context!, this.canvas);
	}


	private tick(): void {
		this.gsm.tick();
	}


	private keyPressed(event: KeyboardEvent): void {
		this.gsm.keyPressed(event);
	}


	private mouseOver(event: MouseEvent): void {
		this.gsm.mouseOver(event);
	}


	private loop(): void {
		this.tick();
		this.render();
		window.requestAnimationFrame(() => this.loop());
	}


	public clear(): void {
		this.context?.clearRect(0, 0, this.width, this.height);
	}
}
