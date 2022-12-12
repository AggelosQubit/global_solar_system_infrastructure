<template>
	<div class="parallax">
		<div>
			<h1 class="title">Global Solar System Infrastructure</h1>
		</div>
		
		<div class="gssiDef">
			<p class="pHovering"> Global solar system infrastructure refers to the idea of building a network of structures and systems in the solar system</p>
			<p class="pHovering"> that would allow humanity to more fully explore and utilize the resources of the solar system. </p>
			<p class="pHovering"> This could include things like space habitats for human settlement, </p>
			<p class="pHovering"> mining operations on asteroids and other celestial bodies, and large-scale solar power stations. </p>
			<p class="pHovering"> The goal of global solar system infrastructure would be to create a sustainable and self-sufficient human presence in the solar system, </p>
			<p class="pHovering"> allowing us to expand our civilization beyond the confines of Earth. </p>
			<p class="pHovering"> This is an ambitious and long-term goal that would require significant technological advances and international cooperation, </p>
			<p class="pHovering"> but it has the potential to greatly benefit humanity and unlock the vast resources of the solar system.</p>
		</div>
	</div>

	
	
	<CelestialEntities msg="Test Body" />
</template>

<script>
import CelestialEntities from './components/CelestialEntities.vue';
export default {
  name: 'App',
  components: {
    CelestialEntities
  }
}
</script>

<style>
body,html{
  /*background-image: url('./assets/01-solar-system-pia12114_orig.webp') ;*/
  font-family: 'Agency FB';
  min-height: 100vh;
}
.parallax{
	/*Parallax Effect*/
	min-height: 100vh;
	background-image: url('./assets/aba035ac0ef13a0833ca3d3ecc4e592f.jpg') ;
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.title{
	position: relative;
	text-align: center;
	color: #03859c;
	text-shadow: 2px 2px rgba(255, 255, 255, 0.75);
}

.gssiDef{
	margin-top:19vh ;
	border: 3px solid green;	
}

.pHovering{
	transition: color 2s;
	text-align: center;
	color: #FFF;
	text-shadow: 2px 2px #03859c;
	font-size: 1cm;
}

.pHovering:hover{
	color: rgb(0, 194, 219);
}
</style>
