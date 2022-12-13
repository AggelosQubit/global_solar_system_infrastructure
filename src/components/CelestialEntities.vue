<template>
	<h1>Bods</h1>
	<!--TODO ADD FORING and this planetsData to see the fetchs --> 
</template>

<script>
import { onBeforeMount, onMounted } from 'vue';

let planets=["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"]

export default {
	name: 'CelestialEntities',
	props: {
		msg: String
	},
	setup(){
		onBeforeMount( 
			()=>{
				for(var i=0;i< planets.length;i++){
					fetch("https://api.le-systeme-solaire.net/rest.php/bodies/"+planets[i])
					.then( (res)	=> res.json() )
					.then( (data)	=> console.log(data) )

					
				}
				
			}
		),
		onMounted(()=>{
			console.log("planetData:"+this.planetsData)
		})
	},
	data(){
		return {
			planetsData : []
		}
	},
	methods:{

	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
