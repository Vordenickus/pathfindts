import { GameView } from './GameView';
import { Gui } from './gui/Gui';
import './scss/main.scss';
import './scss/gui/gui.scss';
import './scss/gui/type-picker.scss';
import './scss/gui/clear.scss';
import './scss/gui/start.scss';
import './scss/gui/algo-picker.scss';
import './scss/gui/stop.scss';

document.addEventListener("DOMContentLoaded", () => {
	const view = new GameView('canvas');
	const gui = new Gui();
	view.start();
});
