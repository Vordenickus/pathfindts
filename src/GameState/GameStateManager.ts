import { Stack } from "../utils/Stack";
import { GameState } from "./GameState";

export class GameStateManager {
	private states: Stack<GameState>;

	public constructor() {
		this.states = new Stack();
	}

	public pushState(state: GameState) {
		this.states.push(state);
	}


	public tick() {
		this.states.peek().tick();
	}


	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		this.states.peek().draw(cntx, canvas);
	}


	public keyPressed(event: KeyboardEvent) {
		this.states.peek().keyPressed(event);
	}


	public mouseOver(event: MouseEvent) {
		this.states.peek().mouseOver(event);
	}
}
