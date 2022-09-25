import { GameView } from './GameView';
import './css/main.scss';

document.addEventListener("DOMContentLoaded", () => {
	const view = new GameView('canvas');
	view.start();
});
