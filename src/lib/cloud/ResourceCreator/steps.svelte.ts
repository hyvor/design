export interface Step {
	text: string;
	auto: boolean; // whether to go to the next step automatically (1s/auto steps)
}

export type StepStatus = 'pending' | 'current' | 'done';

export class Steps {
	private currentIndex = $state(0);
	private finished = $state(false);

	private autoTimeoutMs: number;
	private onfinish: null | (() => void) = null;

	constructor(public steps: Step[]) {
		// divide 1.5s into auto steps
		// we might need to make 1.5s configurable later
		this.autoTimeoutMs = 1500 / this.steps.filter((s) => s.auto === true).length;
	}

	private currentStep() {
		return this.steps[this.currentIndex];
	}

	private setTimeoutIfNeeded() {
		if (this.currentStep().auto) {
			setTimeout(
				() => {
					if (this.onfinish === null || this.currentIndex !== this.steps.length - 1) {
						this.toNext();
					}
				},
				this.autoTimeoutMs + Math.random() * 300 // adds a bit of randomness
			);
		}
	}

	public init() {
		this.setTimeoutIfNeeded();
	}

	public toNext() {
		this.currentIndex = Math.min(this.currentIndex + 1, this.steps.length - 1);

		if (this.onfinish !== null && this.currentIndex === this.steps.length - 1) {
			setTimeout(() => {
				this.finished = true;
				this.onfinish?.();
			}, 500);
			return;
		}

		this.setTimeoutIfNeeded();
	}

	public finish(onfinish: () => void) {
		this.onfinish = onfinish;
		this.toNext();
	}

	public statusOf(i: number): StepStatus {
		if (this.finished) {
			return 'done';
		}

		if (i < this.currentIndex) return 'done';
		if (i === this.currentIndex) return 'current';
		return 'pending';
	}
}
