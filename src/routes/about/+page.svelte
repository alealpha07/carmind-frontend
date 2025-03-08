<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_("about")}</title>
	<script src="https://cdn.lordicon.com/lordicon.js"></script>
</svelte:head>

<section class="hero-section">
	<h1 style="margin-bottom: 15px;">{$_('about.goal')}</h1>
	<p style="margin-top: 50px;">{@html $_('about.goal.description')}</p>
</section>

<section>
	<h2>{$_('about')}</h2>
	<div class="container">
		<div class="row text-center justify-content-center">
			<div class="col-md-5">
				<h4>Alessandro Prati</h4>
				<p>{$_('about.alessandro')}</p>
			</div>
			<div class="col-md-5">
				<h4>Armando Scuotto</h4>
				<p>{$_('home.armando')}</p>
			</div>
		</div>
	</div>
</section>

<section style="background-color: #e5e7eb;">
	<h2>{$_('home.security_advantages')}</h2>
	<div class="container">
		<div class="row text-center">
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/fibgbafg.json" trigger="loop" delay="2500" class="feature-icon"> </lord-icon>
				<h3>{$_('home.advanced_security')}</h3>
				<p>{$_('home.advanced_security.description')}</p>
			</div>
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/tyntlpjn.json" trigger="loop" delay="1500" class="feature-icon"> </lord-icon>
				<h3>{$_('home.access_everywhere')}</h3>
				<p>{$_('home.access_everywhere.description')}</p>
			</div>
			<div class="col-md-4">
				<lord-icon
					src="https://cdn.lordicon.com/laobovmg.json"
					trigger="loop"
					delay="2000"
					colors="primary:#121331,secondary:#ebe6ef,tertiary:#3a3347,quaternary:#3498db,quinary:#f9c9c0"
					class="feature-icon"
				>
				</lord-icon>
				<h3>{$_('home.warning')}</h3>
				<p>{$_('home.warning.description')}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		color: var(--color-text);
		text-align: center;
		padding: 70px 80px;
		padding-bottom: 60px;
	}

	section {
		padding: 80px 20px;
	}
	h2 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 40px;
		text-align: center;
	}
	h3 {
		margin-top: 100px;
	}
	.feature-icon {
		width: 80px;
		height: 80px;
		margin-bottom: 20px;
		position: absolute;
		left: calc(50% - 40px);
	}
	div.col-md-4 {
		position: relative;
	}
	div.col-md-4 * {
		text-align: center;
	}
	div.col-md-5 {
		position: relative;
	}
	div.col-md-5 * {
		text-align: center;
	}
</style>
