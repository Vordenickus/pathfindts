import { GameState } from "../GameState";
import { GameStateManager } from "../GameStateManager";
import { GameArea } from "../../GameArea/GameArea";

export class TestState extends GameState {

	private gameArea: GameArea;

	public constructor(gsm: GameStateManager) {
		super(gsm);
		this.gameArea = new GameArea(1000);
	}


	public tick(): void {

	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		this.gameArea.draw(cntx, canvas);
	}


	public keyPressed(event: KeyboardEvent): void {

	}
}
