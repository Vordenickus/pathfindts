import { CellType } from '../enums/CellType';

export class Gui {
	private buttons: NodeListOf<HTMLDivElement>;
	private clearButton: HTMLDivElement;


	private static TYPE_CLASS = 'b-type-picker__cell';
	private static CLEAR_CLASS = 'b-clear';
	private static ACTIVE_TYPE_CLASS = 'b-type-picker__cell--active';

	public constructor() {
		this.buttons = document.querySelectorAll('.' + Gui.TYPE_CLASS);
		this.clearButton = document.querySelector('.' + Gui.CLEAR_CLASS)!;
		this.initTypeListeners();
		this.initClearListener();
	}


	private initTypeListeners(): void {
		this.buttons.forEach((element: HTMLDivElement) => {
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


	private initClearListener():void {
		this.clearButton.addEventListener('click', () => {
			const event = new CustomEvent('cleararea', {

			});
			window.dispatchEvent(event);
		});
	}


	private clearTypeActive(): void {
		this.buttons.forEach((element: HTMLDivElement) => {
			element.classList.remove(Gui.ACTIVE_TYPE_CLASS);
		});
	}


	private calculateCurrentType(id: string):CellType {
		switch(id) {
			case 'tp-target':
				return CellType.TARGET;
			case 'tp-wall':
				return CellType.WALL;
			case 'tp-start':
				return CellType.START;
			case 'tp-earth':
			default:
				return CellType.EARTH;
		}
	}
}
