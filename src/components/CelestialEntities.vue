<template>
	<!--TODO ADD FORING and this planetsData to see the fetchs --> 
	<!--
		<table  class="table tableShow">
			<thead>
			<tr>
				<th>Nom</th>
				<th>Température moyenne</th>
				<th>Inclinaison axiale</th>
				<th>Gravité</th>
				<th>Est-ce une planète ?</th>
				<th>Masse</th>
				<th>Rayon polaire</th>
				<th>Aphelion</th>
				<th>Périhélie</th>
				<th>Orbite sidérale</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="planet in planetsData" :key="planet.id">
				<td>{{ planet.name}}</td>
				<td>{{ Math.round(planet.avgTemp - 273.15) }}°C</td>
				<td>{{ planet.axialTilt }}</td>
				<td>{{ planet.gravity }}</td>
				<td>{{ planet.isPlanet ? 'Oui' : 'Non' }}</td>
				<td>{{ (planet.mass.massValue).toFixed(2) }} x 10^{{ planet.mass.massExponent }} kg</td>
				<td>{{ planet.polarRadius }}</td>
				<td>{{ planet.aphelion }}</td>
				<td>{{ planet.perihelion }}</td>
				<td>{{ planet.sideralOrbit }}</td>
			</tr>
			</tbody>
		</table>
	-->
	
	<div class="planetCardView">
		<!-- Use the v-for loop to display a card for each element in the planetsData array -->
		<div  class="planetCards" v-for="planet in planetsData" :key="planet.id">
			<img v-if="planet.image" :src="planet.image" class="imagePlanet" alt="Planet image">
			<p class="title"><a  href="" >{{ planet.englishName }}</a></p>

			<div v-on:click="showClick()" class="toTransform">
				<p class="title"><strong>Average temperature:</strong> {{ Math.round(planet.avgTemp -273.15)+'°C' }}</p>
				<!-- Display the planet's gravity -->
				<p class="title"><strong>Gravity:</strong> {{ planet.gravity }} m/s²</p>
				<!-- Display the planet's mass -->
				<p class="title"><strong>Mass:</strong> {{ planet.mass.massValue }} x 10^{{ planet.mass.massExponent }} kg</p>
			</div>
		</div>
	</div>
</template>
<script>
let planets=["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"]
export default {
	name: 'CelestialEntities',
	props: {
		msg: String,
	},
	created(){

		for(var i=0;i< planets.length;i++){

			fetch("https://api.le-systeme-solaire.net/rest/bodies/"+planets[i],{
				headers:{
					"Authorization": `Bearer ${process.env.VUE_APP_API_KEY_SYS_SOL}`
				}
			}

			)
			.then( (res)	=> res.json() )
			.then( (data)	=>{
				data.image=`/assets/${(data.englishName).toLowerCase()+'.png'}`
				this.planetsData.push(data); 
			
			})
		}
		console.log(this.planetsData) 
	},
	data(){
		return {
			planetsData : []
		}
	},
	methods : {
		showClick : function (){
			console.log("IN showClick")
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.planetCardView{
	display: flex;
	flex-grow: 8;
	flex-wrap: wrap;
	justify-content: space-around;
}
.planetCards {
	opacity: 0.8;
	width: 25%;
	height: 700px;
	background-color: #161616;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 18px;
	color: #333;
	justify-content: center;
	align-items: center;

}
.planetCards .toTransform{
	opacity: 0;
}
.planetCards .toTransform:hover{
	transform: translateY(10px);
	transition: 0.5s;
	opacity: 1;
}
.imagePlanet{
	backdrop-filter: blur(20px);
	
	width: 100%;
}

.title{
	text-align: center;
	color: #03859c;
	/*text-shadow: 2px 2px rgba(255, 255, 255, 0.75);*/
}

</style>

