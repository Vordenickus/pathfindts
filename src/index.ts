import { GameView } from './GameView';
import './main.scss';

document.addEventListener("DOMContentLoaded", () => {
	const view = new GameView('canvas');
	view.start();
});
