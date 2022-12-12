<template>
	<table   class="table" >

	</table>
	<button @click="fetchCelestialBody()" >Fetch Data</button>
</template>

<script>
let planets=["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"]

export default {
	name: 'CelestialEntities',
	props: {
		msg: String
	},
	data(){
		return {
			planetsData : []
		}
	},
	methods:{
		fetchCelestialBody(){
			fetch("https://api.le-systeme-solaire.net/rest.php/bodies/"+planets[0])
			.then( (res)	=> res.json() )
			.then( (data)	=> console.log(data) )
		
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
