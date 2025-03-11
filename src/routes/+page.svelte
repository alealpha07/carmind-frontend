<script lang="ts">
    import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Carmind</title>
	<script src="https://cdn.lordicon.com/lordicon.js"></script>
</svelte:head>

<section class="hero-section">
	<h1 style="margin-bottom: 15px;">{$_('home.hero.title')}</h1>
	<p style="margin-bottom: 25px;">{$_('home.hero.description')}<br />{$_('home.hero.description.second')}</p>
	<div class="hero-buttons">
		<a href="/register"><button>{$_('register.free')}</button></a>
		<a href="/login"><button class="button-secondary">{$_('login')}</button></a>
	</div>
</section>

<section>
	<h2>{$_('home.how')}</h2>
	<div class="container">
		<div class="row text-center">
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/vypcpgwt.json" trigger="loop" delay="2000" class="feature-icon"> </lord-icon>
				<h3>{$_('home.add')}</h3>
				<p>{$_('home.add.description')}</p>
			</div>
			<div class="col-md-4">
				<lord-icon
					src="https://cdn.lordicon.com/zjuyeglr.json"
					trigger="loop"
					delay="2500"
					colors="primary:#121331,secondary:#ffc738,tertiary:#ebe6ef,quaternary:#3498db"
					class="feature-icon"
				>
				</lord-icon>
				<h3>{$_('home.notifications')}</h3>
				<p>{$_('home.notifications.description')}</p>
			</div>
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/knitbwfa.json" trigger="loop" delay="1500" class="feature-icon"> </lord-icon>
				<h3>{$_('home.track')}</h3>
				<p>{$_('home.track.description')}</p>
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
		padding: 120px 20px;
	}
	.hero-buttons {
		width: fit-content;
		padding: none;
		margin: auto;
	}
	.hero-buttons a {
		text-decoration: none;
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
</style>
