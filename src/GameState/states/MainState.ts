import { GameState } from "../GameState";
import { GameStateManager } from "../GameStateManager";
import { GameArea } from "../../GameArea/GameArea";

export class MainState extends GameState {

	private gameArea: GameArea;

	public constructor(gsm: GameStateManager) {
		super(gsm);
		this.gameArea = new GameArea(1000);
	}


	public tick(): void {
		this.gameArea.tick();
	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		this.gameArea.draw(cntx, canvas);
	}


	public keyPressed(event: KeyboardEvent): void {

	}


	public mouseOver(event: MouseEvent): void {
		this.gameArea.mouseOver(event);
	}
}
