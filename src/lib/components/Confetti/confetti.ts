export function confetti(
	options: { particleCount?: number; duration?: number; zIndex?: number } = {}
) {
	const { particleCount = 220, duration = 12000, zIndex = 20000000 } = options;

	const gravity = 0.18;
	const drag = 0.96;

	const canvas = document.createElement('canvas');
	canvas.style.position = 'fixed';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.width = '100vw';
	canvas.style.height = '100vh';
	canvas.style.pointerEvents = 'none';
	canvas.style.zIndex = String(zIndex);
	document.body.appendChild(canvas);

	const ctx = canvas.getContext('2d')!;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	interface Particle {
		x: number;
		y: number;
		size: number;
		color: string;
		velocityX: number;
		velocityY: number;
		rotation: number;
		rotationSpeed: number;
		wobble: number;
		wobbleSpeed: number;
	}

	const colors = ['#ffba6b', '#8cdaff', '#b5ffb0', '#ff9090', '#ffbfff', '#d894ff', '#fff79b'];
	const particles: Particle[] = [];

	let animationFrameId: number;
	let timeoutId: number | null = null;
	let running = true;

	const originX = canvas.width / 2;
	const originY = canvas.height / 2;

	const createParticle = (): Particle => {
		const angle = Math.random() * Math.PI * 2;
		const speed = Math.random() * 16 + 10;
		return {
			x: originX + (Math.random() - 0.5) * 40,
			y: originY + (Math.random() - 0.5) * 40,
			size: Math.random() * 9 + 5,
			color: colors[Math.floor(Math.random() * colors.length)],
			velocityX: Math.cos(angle) * speed,
			velocityY: Math.sin(angle) * speed,
			rotation: Math.random() * 360,
			rotationSpeed: Math.random() * 12 - 6,
			wobble: Math.random() * Math.PI * 2,
			wobbleSpeed: Math.random() * 0.1 + 0.05
		};
	};

	const drawParticle = (particle: Particle) => {
		ctx.save();
		ctx.translate(particle.x, particle.y);
		ctx.rotate((particle.rotation * Math.PI) / 180);
		ctx.fillStyle = particle.color;
		ctx.beginPath();
		ctx.roundRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size, 1);
		ctx.fill();
		ctx.restore();
	};

	const updateParticles = () => {
		for (const particle of particles) {
			particle.velocityX *= drag;
			particle.velocityY = particle.velocityY * drag + gravity;
			particle.wobble += particle.wobbleSpeed;

			particle.x += particle.velocityX + Math.sin(particle.wobble) * 0.8;
			particle.y += particle.velocityY;
			particle.rotation += particle.rotationSpeed;
		}
		const remaining = particles.filter((particle) => particle.y - particle.size <= canvas.height);
		particles.length = 0;
		particles.push(...remaining);
	};

	const render = () => {
		if (!running) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const particle of particles) drawParticle(particle);
		updateParticles();

		if (particles.length === 0) {
			stopConfetti();
			return;
		}

		animationFrameId = requestAnimationFrame(render);
	};

	let stopped = false;
	const stopConfetti = () => {
		if (stopped) return;
		stopped = true;
		running = false;
		cancelAnimationFrame(animationFrameId);
		if (timeoutId !== null) clearTimeout(timeoutId);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.remove();
	};

	const startConfetti = () => {
		particles.length = 0;
		for (let i = 0; i < particleCount; i++) particles.push(createParticle());
		running = true;
		render();
		if (duration > 0) {
			timeoutId = window.setTimeout(stopConfetti, duration);
		}
	};

	startConfetti();

	return {
		stop: stopConfetti
	};
}
