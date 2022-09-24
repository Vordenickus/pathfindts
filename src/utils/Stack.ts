export class Stack<T> {

	private array: T[];

	public constructor() {
		this.array = [];
	}


	public peek(): T {
		return this.array[this.array.length - 1];
	}


	public push(value: T) {
		this.array.push(value);
	}


	public poll(): T {
		const target = this.array.pop() as T;
		this.restructure();
		return target;
	}


	public remove(t: T) {
		this.array = this.array.filter((value) => {
			if (value === t) {
				return false;
			}
			return true;
		});
		this.restructure();
	}


	private restructure():void {
		const arr = [] as T[];
		this.array.forEach((value) => {
			arr.push(value);
		});
		this.array = arr;
	}


	public size(): number {
		return this.array.length;
	}
}
