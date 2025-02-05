<script lang="ts">
	import VehicleCard from '$lib/components/VehicleCard.svelte';

	let data = {
		type: "Autovettura",
		brand: "Fiat",
		model: "Panda",
		registrationYear: 2009,
		plateNumber: "EN132UB",
		isInsured: true,
		startDateInsurance: new Date(2025, 0, 1),
		endDateInsurance: new Date(2025, 11, 31),
		hasBill: true,
		endDateBill:  new Date(2026, 0, 31),
		endDateRevision:  new Date(2025, 7, 31),
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<VehicleCard {data}></VehicleCard>

