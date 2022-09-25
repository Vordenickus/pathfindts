import { GameView } from './GameView';
import { Gui } from './gui/Gui';
import './scss/main.scss';
import './scss/gui/gui.scss';
import './scss/gui/type-picker.scss';
import './scss/gui/clear.scss';

document.addEventListener("DOMContentLoaded", () => {
	const view = new GameView('canvas');
	const gui = new Gui();
	view.start();
});
