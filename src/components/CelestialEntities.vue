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
	
	<div class="row">
		<!-- Use the v-for loop to display a card for each element in the planetsData array -->
		<div  class=" col-md-3 planetCards" v-for="planet in planetsData" :key="planet.id">
			<!-- Display the planet's image, if it exists--> 
			<img style="height: 200px;width: 200px;" v-if="planet.image" :src="planet.image" class=" img-thumbnail" alt="Planet image">
			
			<div class="">
				<!-- Display the planet's name -->
				<p class="title"><a  href="" >{{ planet.englishName }}</a></p>
				<!-- Display the planet's average temperature -->
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
			fetch("https://api.le-systeme-solaire.net/rest.php/bodies/"+planets[i])
			.then( (res)	=> res.json() )
			.then( (data)	=>{
				data.image=`../assets/${(data.englishName).toLowerCase()+'.jpg'}`
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
	methods:{

	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	position: relative;
	text-align: center;
	color: #03859c;
	text-shadow: 2px 2px rgba(255, 255, 255, 0.75);
}
.planetCards {
  /* Ajoutez une bordure autour de la table */
  border: 1px solid #ddd;

  /* Ajustez la taille et la police de caractères de la table */
  font-size: 26px;

  /* Ajustez la couleur de fond et la couleur de texte des cellules */
  
  color: #333;

  /* Ajustez la couleur de fond et la couleur de texte des en-têtes de colonnes */
  
}
</style>
