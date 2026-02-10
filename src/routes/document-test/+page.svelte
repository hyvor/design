<script>
	import Base from '$lib/components/Base/Base.svelte';
	import { Button } from '$lib/components/index.js';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';
	import Document from '$lib/marketing/Document/Document.svelte';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import IconArrowReturnLeft from '@hyvor/icons/IconArrowReturnLeft';
</script>

<Base>
	<slot />
	<Document title="Document Test" subtitle="This is a test document">
		<p>This is a test document</p>

		<h2 id="heading-2">Heading 2</h2>
		<p>
			<!-- lorem ipsum content generate -->
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
			tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
			diam.
			<a href="#heading-3">Maecenas</a> ligula massa, varius a, semper congue, euismod non, mi.
			Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl
			sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a,
			enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum
			augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui
			ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
			posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas
			adipiscing ante non diam sodales hendrerit. Ut velit maur
		</p>

		<h3 id="heading-3">Heading 3</h3>
		<p>
			<!-- lorem ipsum content generate -->
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
			tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
			diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci
			nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper.
			Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut
			in risus volutpat libero pharetra
			<a href="#heading-2">tempor</a>.
		</p>

		<div class="test-tooltip-at-the-right-end">
			<Tooltip
				text="This is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltipThis is a tooltip"
				position="left"
			>
				<Button color="accent" size="small">Hover me</Button>
			</Tooltip>
		</div></Document
	>
</Base>

<Footer></Footer>

<style lang="scss">
	.test-tooltip-at-the-right-end {
		display: flex;
		justify-content: flex-end;
		padding: 2rem;
		border: 1px solid #ccc;
		width: 100vw;
	}

	// .tooltip-text {
	// 	position: relative;
	// 	display: inline-block;
	// }
</style>
