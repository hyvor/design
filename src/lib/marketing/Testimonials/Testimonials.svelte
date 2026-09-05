<script lang="ts">
	interface TextReview {
		type: 'text';
		name: string;
		role: string;
		company?: string;
		companyUrl?: string;
		imageUrl?: string;
		summary?: string;
		quote: string;
	}

	interface VideoReview {
		type: 'video';
		name: string;
		role: string;
		company: string;
		companyUrl?: string;
		imageUrl?: string;
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

	let started: boolean[] = $state(reviews.map(() => false));
	let playing: boolean[] = $state(reviews.map(() => false));
	let videoEls: (HTMLVideoElement | undefined)[] = $state([]);
	let currentTime: number[] = $state(reviews.map(() => 0));
	let duration: number[] = $state(reviews.map(() => 0));

	let rowEl: HTMLDivElement | undefined = $state();
	let activeIndex = $state(0);

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

	function onCardClick(e: MouseEvent, i: number) {
		if ((e.target as HTMLElement).closest('a')) return;
		if (!started[i]) {
			play(i);
			return;
		}
		const video = videoEls[i];
		if (!video) return;
		if (playing[i]) {
			video.pause();
		} else {
			video.play().catch(() => {});
		}
	}

	function onCardKeydown(e: KeyboardEvent, i: number) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		onCardClick(e as unknown as MouseEvent, i);
	}

	function seekFromEvent(e: MouseEvent, i: number) {
		const video = videoEls[i];
		if (!video || !duration[i]) return;
		const track = e.currentTarget as HTMLElement;
		const rect = track.getBoundingClientRect();
		const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		video.currentTime = ratio * duration[i];
	}

	function onSeekClick(e: MouseEvent, i: number) {
		e.stopPropagation();
		seekFromEvent(e, i);
	}

	function onSeekKeydown(e: KeyboardEvent, i: number) {
		const video = videoEls[i];
		if (!video) return;
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			video.currentTime = Math.min(duration[i], video.currentTime + 5);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			video.currentTime = Math.max(0, video.currentTime - 5);
		}
	}

	function goTo(i: number) {
		if (!rowEl) return;
		const card = rowEl.children[i] as HTMLElement | undefined;
		card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
		activeIndex = i;
	}

	function onRowScroll() {
		if (!rowEl) return;
		const rowCenter = rowEl.getBoundingClientRect().left + rowEl.clientWidth / 2;
		let closest = 0;
		let closestDist = Infinity;
		Array.from(rowEl.children).forEach((child, i) => {
			const rect = (child as HTMLElement).getBoundingClientRect();
			const dist = Math.abs(rect.left + rect.width / 2 - rowCenter);
			if (dist < closestDist) {
				closestDist = dist;
				closest = i;
			}
		});
		activeIndex = closest;
	}
</script>

<svelte:head>
	{#if handwrittenNames}
		<link href="https://fonts.bunny.net/css?family=caveat:600,700" rel="stylesheet" />
	{/if}
</svelte:head>

{#snippet meta(review: Review)}
	<div class="role">
		{review.role}, <br />
		{#if review.companyUrl}
			<a
				class="company"
				href={review.companyUrl}
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				{review.company}
			</a>
		{:else}
			{review.company}
		{/if}
	</div>
{/snippet}

<section class="hds-testimonials" class:handwritten={handwrittenNames}>
	<div class="hds-container head">
		<p class="label">{label}</p>
		<h2>{@html title}</h2>
	</div>

	<div class="hds-container-max cards-wrap">
		<div
			class="cards-row"
			bind:this={rowEl}
			onscroll={onRowScroll}
			role="region"
			aria-label={label}
		>
			{#each reviews as review, i}
				{#if review.type === 'text'}
					<figure class="card text-card hds-box">
						{#if review.imageUrl}
							<img class="avatar photo card-avatar" src={review.imageUrl} alt={review.name} />
						{/if}
						<svg class="quote-mark" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M10 7c-3.3 0-6 2.7-6 6v4h6v-6H7c0-1.7 1.3-3 3-3V7zm10 0c-3.3 0-6 2.7-6 6v4h6v-6h-3c0-1.7 1.3-3 3-3V7z"
							/>
						</svg>
						{#if review.summary}
							<p class="text-summary">{review.summary}</p>
						{/if}
						<blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
						<figcaption>
							<span class="caption-text">
								<span class="name">{review.name}</span>
								{@render meta(review)}
							</span>
						</figcaption>
					</figure>
				{:else}
					<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
					<figure
						class="card video-card hds-box"
						class:playing={playing[i]}
						role="button"
						tabindex="0"
						aria-label={playing[i]
							? 'Pause video testimonial'
							: started[i]
								? 'Resume video testimonial'
								: 'Play video testimonial'}
						onclick={(e) => onCardClick(e, i)}
						onkeydown={(e) => onCardKeydown(e, i)}
					>
						{#if started[i]}
							<!-- svelte-ignore a11y_media_has_caption -->
							<video
								class="video"
								src={review.videoUrl}
								poster={review.posterUrl}
								playsinline
								bind:this={videoEls[i]}
								bind:currentTime={currentTime[i]}
								bind:duration={duration[i]}
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

						{#if started[i]}
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<div
								class="progress-track"
								role="slider"
								aria-label="Seek video"
								aria-valuemin={0}
								aria-valuemax={100}
								aria-valuenow={duration[i] ? Math.round((currentTime[i] / duration[i]) * 100) : 0}
								tabindex="0"
								onclick={(e) => onSeekClick(e, i)}
								onkeydown={(e) => onSeekKeydown(e, i)}
							>
								<div
									class="progress-fill"
									style="width: {duration[i] ? (currentTime[i] / duration[i]) * 100 : 0}%"
								></div>
							</div>
						{/if}

						{#if !playing[i]}
							<div class="poster-scrim"></div>

							{#if review.summary}
								<p class="video-summary">“{review.summary}”</p>
							{/if}

							<div class="play-btn" aria-hidden="true">
								<svg
									width="20"
									height="20"
									viewBox="0 0 16 16"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M5 3.5v9l8-4.5-8-4.5z" />
								</svg>
							</div>

							<figcaption>
								{#if review.imageUrl}
									<img class="avatar photo" src={review.imageUrl} alt={review.name} />
								{/if}
								<span class="caption-text">
									<span class="name">{review.name}</span>
									{@render meta(review)}
								</span>
							</figcaption>
						{/if}
					</figure>
				{/if}
			{/each}
		</div>

		{#if reviews.length > 1}
			<div class="dots" role="tablist" aria-label="Testimonials navigation">
				{#each reviews as _, i}
					<button
						class="dot"
						class:active={i === activeIndex}
						role="tab"
						aria-selected={i === activeIndex}
						aria-label={`Go to testimonial ${i + 1}`}
						onclick={() => goTo(i)}
					></button>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.hds-testimonials {
		background: var(--accent-lightest);
		padding: 100px 0 96px;
		overflow: hidden;
		scroll-margin-top: calc(var(--header-height, 55px) + 20px);
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

	.cards-wrap {
		padding: 32px 15px 4px;
		box-sizing: border-box;
	}

	.cards-row {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: center;
		gap: 20px;
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
		height: auto;
		min-height: 440px;
		padding: 28px;
		display: flex;
		flex-direction: column;
	}

	.quote-mark {
		width: 40px;
		height: 40px;
		margin-bottom: 20px;
		fill: var(--accent);
		opacity: 0.14;
		flex-shrink: 0;
	}

	.card-avatar {
		position: absolute;
		top: 28px;
		right: 28px;
		z-index: 1;
	}

	.avatar {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		flex-shrink: 0;
		display: block;
		shape-rendering: crispEdges;
	}

	.avatar.photo {
		object-fit: cover;
	}

	.text-summary {
		margin: 0 0 14px;
		font-family: var(--font-serif);
		font-size: 18px;
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: var(--text);
	}

	blockquote {
		font-size: 16px;
		line-height: 1.7;
		color: var(--text);
		margin: 0 0 20px;
		flex: 1;
		font-family: var(--font-serif);
	}

	.text-card figcaption {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.caption-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2px;
		min-width: 0;
	}

	.name {
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		line-height: 1.3;
	}

	.handwritten .name {
		font-family: 'Caveat', cursive;
		font-size: 28px;
		font-weight: 600;
		line-height: 1.15;
	}

	.role {
		font-size: 14px;
		line-height: 1.35;
		color: var(--text-light);
		margin-top: 4px;
		font-family: var(--font-serif);
	}

	.company {
		align-self: flex-start;
		font-size: 13px;
		line-height: 1.35;
		font-weight: 500;
		color: var(--text);
		text-decoration: none;
	}

	a.company:hover {
		text-decoration: underline;
	}

	.handwritten .company {
		font-weight: 600;
	}

	.video-card {
		overflow: hidden;
		padding: 0;
		cursor: pointer;
		transition:
			width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.video-card:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.video-card.playing {
		z-index: 5;
		transform: scale(1.08);
		box-shadow:
			0 30px 60px -15px rgba(20, 14, 12, 0.4),
			0 12px 24px -12px rgba(20, 14, 12, 0.3);
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
		font-size: 16px;
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: #fff;
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
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

	.progress-track {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 4;
		height: 4px;
		background: rgba(255, 255, 255, 0.25);
		cursor: pointer;
		transition: height 0.15s;
	}

	.progress-track:hover,
	.progress-track:focus-visible {
		height: 7px;
	}

	.progress-track:focus-visible {
		outline: none;
	}

	.progress-fill {
		height: 100%;
		background: #fff;
	}

	.video-card figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 40px 20px 20px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.video-card .avatar.photo {
		border: 2px solid rgba(255, 255, 255, 0.7);
	}

	.video-card .name {
		color: #fff;
	}

	.video-card .role {
		color: rgba(255, 255, 255, 0.75);
	}

	.video-card .company {
		color: rgba(255, 255, 255, 0.9);
	}

	.dots {
		display: none;
	}

	.dot {
		width: 8px;
		height: 8px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: var(--border);
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.2s;
	}

	.dot.active {
		background: var(--accent);
		transform: scale(1.3);
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

		.text-card {
			height: auto;
			min-height: 400px;
		}
	}

	@media (max-width: 640px) {
		.cards-wrap {
			padding: 24px 0 4px;
		}

		.cards-row {
			flex-wrap: nowrap;
			justify-content: flex-start;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			padding: 0 24px;
		}

		.cards-row::-webkit-scrollbar {
			display: none;
		}

		.card {
			flex: 0 0 calc(100% - 32px);
			width: calc(100% - 32px);
			max-width: 360px;
			scroll-snap-align: center;
		}

		.dots {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 8px;
			margin-top: 20px;
		}
	}
</style>
