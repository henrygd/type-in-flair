<script>
	import githubLogo from '../assets/github.svg'
</script>

<style>
	footer {
		position: relative;
		background-color: #35373a;
		color: #f1f1f1;
		text-align: center;
		padding: 10px 6%;
		font-size: 13px;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
		transition: background-color 0.2s;
	}
	footer:hover {
		background-color: #3e444c;
	}
	footer:focus-within {
		background-color: #3e444c;
	}
	a {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	img {
		width: 62px;
		vertical-align: middle;
	}
	@media (min-width: 1000px) {
		footer {
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 0 0 0 5px;
			padding: 10px 20px;
		}
	}
</style>

<footer>
	<img src={githubLogo} alt="" />
	<a
		href="https://github.com/henrygd/bigpicture"
		target="blank"
		rel="nooopener">
		<span class="sr-only">View on Github</span>
	</a>
</footer>
