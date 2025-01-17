export function confetti(options: { particleCount?: number; duration?: number } = {}) {
	const { particleCount = 150, duration = 5000 } = options; // Default values, you can pass these to the function with customized values when using this component

	const canvas = document.createElement('canvas');
	canvas.style.position = 'fixed'; // Covers the entire viewport
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.width = '100vw';
	canvas.style.height = '100vh';
	canvas.style.pointerEvents = 'none';
	document.body.appendChild(canvas); // Append to body for full-screen effect

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
	}

	// const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6'];
	const colors = ['#ffba6b', '#8cdaff', '#b5ffb0', '#ff9090', '#ffbfff', '#d894ff', '#fff79b'];
	const particles: Particle[] = [];

	let animationFrameId: number;
	let timeoutId: number | null = null;
	let running = true;

	const createParticle = () => ({
		x: Math.random() * canvas.width, // Random horizontal position
		y: -20, // Start above the viewport
		size: Math.random() * 10 + 5, // Random size
		color: colors[Math.floor(Math.random() * colors.length)], // Random color
		velocityX: Math.random() * 1 - 0.5, // Slight horizontal drift
		velocityY: Math.random() * 3 + 2, // Falling speed
		rotation: Math.random() * 360,
		rotationSpeed: Math.random() * 5 - 2.5
	});

	const drawParticle = (particle: Particle) => {
		ctx.save();
		ctx.translate(particle.x, particle.y);
		ctx.rotate((particle.rotation * Math.PI) / 180);
		ctx.fillStyle = particle.color;
		ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
		ctx.restore();
	};

	const updateParticles = () => {
		for (const particle of particles) {
			particle.x += particle.velocityX;
			particle.y += particle.velocityY;
			particle.rotation += particle.rotationSpeed;

			// Reset particle if it falls out of view
			if (particle.y > canvas.height + 20) {
				Object.assign(particle, createParticle());
			}
		}
	};

	const render = () => {
		if (!running) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const particle of particles) drawParticle(particle);
		updateParticles();
		animationFrameId = requestAnimationFrame(render);
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

	const stopConfetti = () => {
		running = false;
		cancelAnimationFrame(animationFrameId);
		if (timeoutId !== null) clearTimeout(timeoutId);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		document.body.removeChild(canvas); // Remove the canvas from the DOM
	};

	startConfetti();

	return {
		stop: stopConfetti
	};
}
