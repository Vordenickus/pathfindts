import { GameView } from './GameView';
import { Gui } from './gui/Gui';
import './css/main.scss';
import './css/gui/gui.scss';
import './css/gui/type-picker.scss';
import './css/gui/clear.scss';

document.addEventListener("DOMContentLoaded", () => {
	const view = new GameView('canvas');
	const gui = new Gui();
	view.start();
});
