<script lang="ts">
	interface TextReview {
		type: 'text';
		name: string;
		role: string;
		quote: string;
	}

	interface VideoReview {
		type: 'video';
		name: string;
		role: string;
		videoUrl?: string;
		posterUrl?: string;
		summary?: string;
	}

	type Review = TextReview | VideoReview;

	interface Props {
		label?: string;
		title?: string;
		reviews: Review[];
		handwrittenNames?: boolean;
	}

	let {
		label = 'Testimonials',
		title = 'Loved by our customers.',
		reviews,
		handwrittenNames = true
	}: Props = $props();

	function identicon(seed: string) {
		let hash = 0;
		for (let i = 0; i < seed.length; i++) {
			hash = (hash * 31 + seed.charCodeAt(i)) | 0;
		}
		const hue = Math.abs(hash) % 360;
		const cells: { x: number; y: number }[] = [];
		for (let col = 0; col < 3; col++) {
			for (let row = 0; row < 5; row++) {
				const bit = (hash >> (col * 5 + row)) & 1;
				if (!bit) continue;
				cells.push({ x: col, y: row });
				if (col < 2) cells.push({ x: 4 - col, y: row });
			}
		}
		return {
			bg: `hsl(${hue} 45% 92%)`,
			fg: `hsl(${hue} 50% 40%)`,
			cells
		};
	}

	let scrollEl: HTMLDivElement | undefined = $state();
	let dragging = $state(false);
	let dragStartX = 0;
	let dragStartScroll = 0;

	let started: boolean[] = $state(reviews.map(() => false));
	let playing: boolean[] = $state(reviews.map(() => false));
	let videoEls: (HTMLVideoElement | undefined)[] = $state([]);

	function play(i: number) {
		started[i] = true;
		videoEls[i]?.play().catch(() => {});
	}

	function autoplayVideo(node: HTMLVideoElement) {
		node.play().catch(() => {});
	}

	function onVideoPause(e: Event, i: number) {
		if ((e.currentTarget as HTMLVideoElement).seeking) return;
		playing[i] = false;
	}

	function onPointerDown(e: PointerEvent) {
		if (!scrollEl) return;
		// let clicks and native <video> controls work
		if ((e.target as HTMLElement).closest('button, video, a')) return;
		dragging = true;
		dragStartX = e.clientX;
		dragStartScroll = scrollEl.scrollLeft;
		scrollEl.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging || !scrollEl) return;
		scrollEl.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
	}

	function onPointerUp() {
		dragging = false;
	}
</script>

<svelte:head>
	{#if handwrittenNames}
		<link href="https://fonts.bunny.net/css?family=caveat:600,700" rel="stylesheet" />
	{/if}
</svelte:head>

<section class="hds-testimonials" class:handwritten={handwrittenNames}>
	<div class="hds-container head">
		<p class="label">{label}</p>
		<h2>{@html title}</h2>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="scroll-row"
		class:dragging
		bind:this={scrollEl}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointerleave={onPointerUp}
		role="region"
		aria-label={label}
	>
		{#each reviews as review, i}
			{#if review.type === 'text'}
				{@const av = identicon(review.name)}
				<figure class="card text-card hds-box">
					<svg
						class="avatar"
						viewBox="0 0 5 5"
						style="background: {av.bg}"
						aria-hidden="true"
					>
						{#each av.cells as cell}
							<rect x={cell.x} y={cell.y} width="1" height="1" fill={av.fg} />
						{/each}
					</svg>
					<blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
					<figcaption>
						<span class="name">{review.name}</span>
						<span class="role">{review.role}</span>
					</figcaption>
				</figure>
			{:else}
				<figure class="card video-card hds-box" class:playing={playing[i]}>
					{#if started[i]}
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							class="video"
							src={review.videoUrl}
							poster={review.posterUrl}
							controls={playing[i]}
							playsinline
							bind:this={videoEls[i]}
							use:autoplayVideo
							onplay={() => (playing[i] = true)}
							onpause={(e) => onVideoPause(e, i)}
							onended={() => (playing[i] = false)}
						></video>
					{:else}
						<div class="poster">
							<img src={review.posterUrl} alt="" />
						</div>
					{/if}

					{#if !playing[i]}
						<div class="poster-scrim"></div>

						{#if !started[i] && review.summary}
							<p class="video-summary">"{review.summary}"</p>
						{/if}

						<button
							class="play-btn"
							aria-label={started[i]
								? 'Resume video testimonial'
								: 'Play video testimonial'}
							onclick={() => play(i)}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M5 3.5v9l8-4.5-8-4.5z" />
							</svg>
						</button>

						<figcaption>
							<span class="name">{review.name}</span>
							<span class="role">{review.role}</span>
						</figcaption>
					{/if}
				</figure>
			{/if}
		{/each}
	</div>
</section>

<style>
	.hds-testimonials {
		background: var(--accent-lightest);
		padding: 100px 0 96px;
		overflow: hidden;
	}

	.head {
		margin-bottom: 44px;
	}

	.label {
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 0 0 16px;
	}

	h2 {
		font-size: clamp(30px, 4vw, 44px);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: var(--text);
		margin: 0;
		font-family: var(--font-serif);
	}

	.scroll-row {
		--side-padding: max(15px, calc((100vw - 1000px) / 2));

		display: flex;
		align-items: stretch;
		gap: 20px;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth;
		cursor: grab;
		padding: 32px var(--side-padding) 36px;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		touch-action: pan-y;
		user-select: none;
		-webkit-user-select: none;
	}

	.scroll-row.dragging {
		cursor: grabbing;
		scroll-behavior: auto;
	}

	.scroll-row::-webkit-scrollbar {
		display: none;
	}

	.card {
		position: relative;
		flex: 0 0 auto;
		width: 320px;
		height: 440px;
		margin: 0;
		box-sizing: border-box;
		transition:
			width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.text-card {
		padding: 28px;
		display: flex;
		flex-direction: column;
	}

	.avatar {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		flex-shrink: 0;
		display: block;
		shape-rendering: crispEdges;
	}

	blockquote {
		font-size: 16px;
		line-height: 1.7;
		color: var(--text);
		margin: 20px 0 0;
		flex: 1;
	}

	.text-card figcaption {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.name {
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		line-height: 1.2;
	}

	.handwritten .name {
		font-family: 'Caveat', cursive;
		font-size: 28px;
		font-weight: 600;
	}

	.role {
		font-size: 13px;
		color: var(--text-light);
	}

	.video-card {
		width: 280px;
		overflow: hidden;
		padding: 0;
	}

	.video-card.playing {
		width: 340px;
		height: 520px;
		z-index: 1;
	}

	.poster {
		position: absolute;
		inset: 0;
	}

	.poster img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.poster-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(160deg, rgba(20, 14, 12, 0.45), rgba(20, 14, 12, 0.65));
	}

	.video-summary {
		position: absolute;
		top: 24px;
		left: 20px;
		right: 20px;
		margin: 0;
		font-family: var(--font-serif);
		font-size: 18px;
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: #fff;
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
		font-style: italic;
	}

	.play-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.18);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 1px solid rgba(255, 255, 255, 0.4);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			transform 0.2s,
			background 0.2s;
	}

	.play-btn:hover {
		transform: translate(-50%, -50%) scale(1.08);
		background: rgba(255, 255, 255, 0.28);
	}

	.play-btn svg {
		margin-left: 3px;
	}

	.video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: #000;
	}

	.video-card figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 40px 20px 20px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
		display: flex;
		flex-direction: column;
	}

	.video-card .name {
		color: #fff;
	}

	.video-card .role {
		color: rgba(255, 255, 255, 0.75);
	}

	@media (max-width: 600px) {
		.scroll-row {
			--side-padding: max(20px, calc((100vw - 1000px) / 2));
			padding: 32px var(--side-padding) 36px;
		}
	}

	@media (max-width: 768px) {
		.head {
			text-align: center;
			margin-bottom: 32px;
		}

		.card {
			width: 280px;
			height: 400px;
		}

		.video-card {
			width: 240px;
		}

		.video-card.playing {
			width: 280px;
			height: 460px;
		}
	}
</style>
