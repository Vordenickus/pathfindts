import { Gui } from '~/gui/Gui';
import {GameStateManager} from './GameStateManager';

export abstract class GameState {

	private gsm: GameStateManager;

	public constructor(gsm: GameStateManager) {
		this.gsm = gsm;
	}


	public abstract tick(): void;
	public abstract draw(cntx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
	public abstract keyPressed(event: KeyboardEvent): void;
	public abstract mouseOver(event: MouseEvent): void;
}
