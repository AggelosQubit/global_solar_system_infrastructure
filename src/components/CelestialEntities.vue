<template>
    <h1>{{ msg }}</h1>
	<button @click="fetchCelestialBody()" >Fecth Body</button>
</template>

<script>
export default {
	name: 'CelestialEntities',
	props: {
		msg: String
	},
	methods:{
		fetchCelestialBody(){
			fetch("https://api.le-systeme-solaire.net/rest.php/bodies/mercury")
			.then( (res)	=> res.json() )
			.then( (data)	=> console.log(data) )
		
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
