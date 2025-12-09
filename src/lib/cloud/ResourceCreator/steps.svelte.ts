export interface Step {
	text: string;
	auto: boolean; // whether to go to the next step automatically (1s/auto steps)
}

export type StepStatus = 'pending' | 'current' | 'done';

export class Steps {
	private currentIndex = $state(0);
	private autoTimeoutMs: number;

	constructor(public steps: Step[]) {
		// divide 2s into auto steps
		// we might need to make 2s configurable later
		this.autoTimeoutMs = 2000 / this.steps.filter((s) => s.auto === true).length;
	}

	private currentStep() {
		return this.steps[this.currentIndex];
	}

	private setTimeoutIfNeeded() {
		if (this.currentStep().auto) {
			setTimeout(() => {
				this.toNext();
			}, this.autoTimeoutMs);
		}
	}

	public init() {
		this.setTimeoutIfNeeded();
	}

	public toNext() {
		this.currentIndex = Math.min(this.currentIndex + 1, this.steps.length - 1);
		this.setTimeoutIfNeeded();
	}

	public statusOf(i: number): StepStatus {
		if (i < this.currentIndex) return 'done';
		if (i === this.currentIndex) return 'current';
		return 'pending';
	}
}
