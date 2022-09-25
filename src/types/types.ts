import { CellType } from "../enums/CellType";

export interface TypeEvent extends Event {
	detail: TypeEventDetail;
}

export interface TypeEventDetail {
	type: CellType;
}

export interface VirtualCell {
	x: number,
	y: number,
	visited: boolean
}
