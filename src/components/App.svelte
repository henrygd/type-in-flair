<script>
	import Footer from './footer.svelte'
	import { onMount } from 'svelte'
	import copy from 'copy-text-to-clipboard'

	// user input
	let userInput = ''

	// store copy clicks to show animation
	let copies = []

	// refs
	let userInputArea

	$: if (userInput.length >= 1500) {
		alert(
			`Character limit is 1500. Please don't spam reddit with this nonsense. Thanks!`
		)
		userInput = userInput.substr(0, 1499)
	}

	$: splitInput = userInput.toLowerCase().split('\n')

	const copyComment = () => {
		let hackyRedditSpacingString = '^^^^^^^^.'
		let redditFormat = splitInput
			.map(sentence =>
				sentence
					.replace(/fuck/g, 'fuck ohio')
					.replace(/\s+/g, ` -- ${hackyRedditSpacingString} `)
					.replace(/[a-z]/g, char => `[${char}](#f/${char})`)
			)
			.join(`${hackyRedditSpacingString}\n\n`)
		let copied = copy(`${redditFormat}${hackyRedditSpacingString}`)
		if (!copied) {
			return alert(`Copy unsuccessful. Please try a different browser.`)
		}
		copies = copies.concat([true])
	}

	onMount(() => userInputArea.focus())
</script>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		color: #333;
	}
	textarea,
	.comment-result {
		width: 100%;
		padding: 75px calc(50% - 600px);
		flex: 1;
		background: transparent;
		font-size: 18px;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	textarea {
		resize: none;
		border: 0;
		outline: 0;
		font-family: inherit;
	}
	.comment-result {
		background: #f6f7f9;
	}
	#anchor {
		overflow-anchor: auto;
		height: 1px;
	}
	.copy-button {
		position: absolute;
		top: calc(50% + 65px);
		left: calc(50% - 710px);
		width: 60px;
		height: 60px;
		border: 0;
		outline: 0;
		border-radius: 99%;
		background-color: #1abc9c;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s ease-out;
		&:hover,
		&:focus {
			background-color: #48c9b0;
		}
		&:active {
			background-color: #16a085;
		}
		svg {
			width: 40px;
			height: 40px;
			fill: #fff;
		}
		span {
			position: absolute;
			top: -12px;
			pointer-events: none;
			animation: fadeoutup 0.5s ease-out forwards;
		}
	}
	@media (min-width: 2200px) {
		textarea,
		.comment-result {
			font-size: 20px;
		}
	}
	@media (max-width: 1500px) {
		textarea,
		.comment-result {
			padding: 3.5rem 11%;
		}
		.copy-button {
			left: calc(11% - 89px);
			top: calc(50% + 46px);
		}
	}
	@media (max-width: 999px) {
		textarea,
		.comment-result {
			font-size: 17px;
		}
		.copy-button {
			top: auto;
			left: auto;
			bottom: 70px;
			right: 31px;
		}
	}
	@media (max-width: 600px) {
		textarea,
		.comment-result {
			padding: 2rem 9%;
		}
		.copy-button {
			bottom: 64px;
			right: 21px;
		}
	}
</style>

<div class="app">

	<!-- comment -->
	<label for="user_input" class="sr-only">Enter comment</label>
	<textarea
		placeholder="Type your amazing comment here..."
		id="user_input"
		bind:this={userInputArea}
		bind:value={userInput} />

	<!-- result -->
	<div class="comment-result">
		{#if userInput}
			{#each splitInput as item}
				<p>
					{@html item
						.replace(/fuck/g, 'fuck ohio')
						.replace(/\s+/g, ' -- ')
						.replace(/[a-z]/g, char => `<a href="#f/${char}" tabindex="-1">${char}</a>`)}
				</p>
			{/each}
		{:else}
			<p>
				See your amazing result here. Click button to copy. Only for old reddit.
			</p>
		{/if}

		<!-- scroll anchor -->
		<div id="anchor" />
	</div>

	<button
		on:click={copyComment}
		tabindex="0"
		title="Copy as text"
		class="copy-button">
		{#each copies as copy}
			<span>Copied!</span>
		{/each}
		<svg viewBox="0 0 24 24" class="icon">
			<title>Copy as text</title>
			<path
				d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2
				2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z" />
		</svg>
	</button>

	<Footer />
</div>
