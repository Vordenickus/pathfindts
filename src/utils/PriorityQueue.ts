const topQ = 0 as number;
const parentQ = (i: number):number => ((i + 1) >>> 1) - 1;
const leftQ = (i: number):number => ((i << 1) + 1);
const rightQ = (i:number):number => ((i + 1) << 1);


export class PriorityQueue<T> {

	private heap: T[];
	private comparator: (a:T, b:T) => boolean;


	public constructor(comparator = (a:T, b: T) => a > b) {
		this.heap = [] as T[];
		this.comparator = comparator;
	}


	public size(): number {
		return this.heap.length;
	}


	public isEmpty(): boolean {
		return this.heap.length === 0;
	}


	public peek() {
		return this.heap[topQ];
	}


	public push(...values:T[]):number {
		values.forEach((value: T) => {
			this.heap.push(value);
			this.shiftUp();
		});
		return this.size();
	}

	public pop():T {
		const poppedValue:T = this.peek();
		const bottom:number = this.size() - 1;
		if (bottom > topQ) {
			this.swap(topQ, bottom);
		}
		this.heap.pop();
		this.shiftDown();
		return poppedValue;
	}

	public replace(value:T) {
		const replacedValue = this.peek();
		this.heap[topQ] = value;
		this.shiftDown();
		return replacedValue;
	}

	private isGreater(i:number, j:number) {
		return this.comparator(this.heap[i], this.heap[j]);
	}

	private swap(i:number, j:number) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	private shiftUp() {
		let node:number = this.size() - 1;
		while(node > topQ && this.isGreater(node, parentQ(node))) {
			this.swap(node, parentQ(node));
			node = parentQ(node);
		}
	}

	private shiftDown() {
		let node:number = topQ;
		while(
			(leftQ(node) < this.size() && this.isGreater(leftQ(node), node)) ||
			(rightQ(node) < this.size() && this.isGreater(rightQ(node), node))
		) {
			const maxChild:number = (rightQ(node) < this.size() && this.isGreater(rightQ(node), leftQ(node))) ? rightQ(node) : leftQ(node);
			this.swap(node, maxChild);
			node = maxChild;
		}
	}
}
