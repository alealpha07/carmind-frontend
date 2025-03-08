<script lang="ts">
	import { _ } from 'svelte-i18n';
	import github from '$lib/images/github-mark.png';
</script>

<svelte:head>
	<title>{$_("about")}</title>
	<script src="https://cdn.lordicon.com/lordicon.js"></script>
</svelte:head>

<section class="hero-section">
	<h1 style="margin-bottom: 15px;">{$_('about.goal')}</h1>
	<p style="margin-top: 50px;">{$_('about.goal.description')}<br>{$_('about.goal.description2')}<br>{$_('about.goal.description3')}</p>
</section>

<section>
	<h2>{$_('about')}</h2>
	<div class="container">
		<div class="row text-center justify-content-center">
			<div class="col-md-5">
				<h3>Alessandro Prati</h3>
				<p>{$_('about.alessandro')}</p>
			</div>
			<div class="col-md-5">
				<h3>Armando Scuotto</h3>
				<p>{$_('about.armando')}</p>
			</div>
		</div>
	</div>
</section>

<section style="background-color: #e5e7eb; margin-top: 100px">
	<h2>{$_('about.contribute')}</h2>
	<p style="text-align:center; margin-bottom:40px">{$_('about.contribute.description')}<br>{$_('about.contribute.description2')}<br>{$_('about.contribute.description3')}</p>
	<div style="text-align:center">
		<a href="https://github.com/alealpha07/carmind-frontend" style="">
			<img width="40px" src={github} alt="GitHub" /> <br>Frontend
		</a>
		<a href="https://github.com/alealpha07/carmind-backend" style="width:fit-content; display:inline-block; margin-left:5px;">
			<img width="40px" src={github} alt="GitHub" />  <br>Backend
		</a>
	</div>
</section>

<style>
	.hero-section {
		color: var(--color-text);
		text-align: center;
		padding: 70px 80px;
		padding-bottom: 60px;
	}
	div a {
		width:fit-content; 
		display:inline-block; 
		margin-right:5px; 
		text-decoration:none; 
		color: var(--color-text);
	}
	div a:hover{
		color: var(--color-theme-1);
	}
	section {
		padding: 80px 20px;
	}
	h2 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 0px;
		text-align: center;
	}
	h3 {
		margin-top: 60px;
	}
	div.col-md-5 {
		position: relative;
	}
	div.col-md-5 * {
		text-align: center;
	}
</style>
