<template >
	<div @wheel="parallaxScrolling">
		<div class="parallax" ref="1">
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

		<div class="parallax" ref="2">
			<div>
				<h1 class="title">Our Celestial Bodies</h1>
			</div>
			<CelestialEntities msg="Test Body" />
		</div>
	</div>
	<!------------------------->
	<footer>
		<div class="container-fluid py-3 bg-dark text-white">
			<div class="container">
				<div class="row">
					<div class="col-md-4 offset-md-1 text-center text-md-left">
						<!-- Add your copyright notice here -->
						<p class="mb-0">Copyright &copy; AggelosQubit {{ new Date().getFullYear() }}</p>
					</div>
					<div class="col-md-2 text-center text-md-right">
						<!-- Add a link to your GitHub profile -->
						<a href="https://github.com/AggelosQubit" class="text-white" target="_blank">
							<i class="fab fa-github mr-2"></i>GitHub
						</a>
					</div>
					<div class="col-md-2 text-center text-md-right">
						<!-- Add a link to your GitHub profile -->
						<a href="https://drum.io/aggelosqubit" class="text-white" target="_blank">
							<i class="fab fa-github mr-2"></i>Drum Page
						</a>
					</div>
					<div class="col-md-2 text-center text-md-right">
						<!-- Add a link to your GitHub profile -->
						<a href="https://www.instagram.com/theintrovertedprogrammer/" class="text-white" target="_blank">
							<i class="fab fa-github mr-2"></i>Instagram
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import CelestialEntities from './components/CelestialEntities.vue';

let currentDivSection=0;

export default {
	name: 'App',
	components: {
		CelestialEntities	
	},
	methods:{
		parallaxScrolling(event){
			//KO AS OF NOW
			if( !event.ctrlkey && (event==undefined || event.deltaY == undefined) ){
				return 0;
			}
			if(event.deltaY==100){
				currentDivSection++;
				console.log();
				this.$refs[currentDivSection+""].scrollIntoView({behavior:'smooth',block:'center'});
			}else{
				if(currentDivSection<=1){
					currentDivSection=1;
					this.$refs[currentDivSection+""].scrollIntoView({behavior:'smooth',block:'center'});
				}else{
					currentDivSection--;
					this.$refs[currentDivSection+""].scrollIntoView({behavior:'smooth',block:'center'});
				}	
			}
			console.log(event.deltaY +" "+currentDivSection)
		}
	}
}
</script>

<style>

/*****************************
 All rights reserved.
 AllFont.net (c) 2011-2015
 *****************************/
 @font-face {
    font-family: 'Agency FB';
    font-style: normal;
    font-weight: 400;
    src: url(../public/assets/AgencyFB-Bold.ttf);
}

body,html{
	font-family: 'Agency FB';
	min-height: 100vh;
}
.parallax{
	/*Parallax Effect*/
	min-height: 100vh;
	background-image: url('./assets/01-solar-system-pia12114_orig.webp') ;
	/*background-image: url('./assets/aba035ac0ef13a0833ca3d3ecc4e592f.jpg') ;*/
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
}

.pHovering{
	text-align: center;
	color: rgb(255, 255, 255);
	text-shadow: 2px 2px #03859c;
	font-size: 1cm;
	transition: color 2s, font-size 5s;
}

.pHovering:hover{
	color: rgb(0, 109, 160);
	font-size: 1.2cm;
}
</style>
