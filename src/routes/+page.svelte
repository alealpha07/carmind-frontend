<script lang="ts">
</script>

<svelte:head>
	<title>Gestione Veicoli</title>
	<script src="https://cdn.lordicon.com/lordicon.js"></script>
</svelte:head>

<section class="hero-section">
	<h1 style="margin-bottom: 15px;">Gestisci i tuoi veicoli senza stress!</h1>
	<p style="margin-bottom: 25px;">Tieni sotto controllo assicurazione, bollo e revisione.<br /> Ricevi notifiche prima delle scadenze.</p>
	<div class="hero-buttons">
		<a href="/register"><button>Registrati Gratis</button></a>
		<a href="/login"><button class="button-secondary">Accedi</button></a>
	</div>
</section>

<section>
	<h2>Come funziona</h2>
	<div class="container">
		<div class="row text-center">
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/vypcpgwt.json" trigger="loop" delay="2000" class="feature-icon"> </lord-icon>
				<h3>Aggiungi i tuoi veicoli</h3>
				<p>Carica documenti come libretto, assicurazione e bollo</p>
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
				<h3>Ricevi notifiche</h3>
				<p>Ti avvisiamo in tempo per ogni scadenza</p>
			</div>
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/knitbwfa.json" trigger="loop" delay="1500" class="feature-icon"> </lord-icon>
				<h3>Tieni tutto sotto controllo</h3>
				<p>Visualizza lo stato di ogni veicolo</p>
			</div>
		</div>
	</div>
</section>

<!-- Sicurezza e Vantaggi -->
<section style="background-color: #e5e7eb;">
	<h2>Sicurezza e vantaggi</h2>
	<div class="container">
		<div class="row text-center">
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/fibgbafg.json" trigger="loop" delay="2500" class="feature-icon"> </lord-icon>
				<h3>Protezione avanzata</h3>
				<p>I tuoi dati sono protetti e accessibili solo a te</p>
			</div>
			<div class="col-md-4">
				<lord-icon src="https://cdn.lordicon.com/tyntlpjn.json" trigger="loop" delay="1500" class="feature-icon"> </lord-icon>
				<h3>Accesso ovunque</h3>
				<p>Gestisci tutto da qualsiasi dispositivo</p>
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
				<h3>Promemoria smart</h3>
				<p>Ricevi avvisi personalizzati e puntuali</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		background-image: url('https://source.unsplash.com/1600x900/?car');
		background-size: cover;
		background-position: center;
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
