import { GameState } from "../GameState";

export class TestState extends GameState {
	public tick(): void {

	}
	public draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		cntx!.fillStyle = 'red';
		cntx?.fillRect(0, 0, canvas.width, canvas.height);
	}
	public keyPressed(event: KeyboardEvent): void {

	}
}
