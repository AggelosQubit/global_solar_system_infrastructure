<template>
	<section class="ogame-bridge">
		<header class="ogame-head">
			<p class="ogame-kicker">Command Center · Sector Sol</p>
			<h1 class="ogame-title">Global Solar System Infrastructure</h1>
		</header>
		<div class="ogame-panel">
			<div class="ogame-panel-title">
				<span>Main Quest</span>
				<span class="ogame-panel-meta">GSSI-01 · ACTIVE</span>
			</div>
			<div class="gssiDef quest-log">
				<div class="quest-title-row">
					<h2 class="quest-name">The Stellar Threshold</h2>
					<p class="quest-giver">Issuer · Type II evangelist · Sector Sol</p>
				</div>
				<ul class="quest-objectives">
					<li>
						<span class="quest-mark">□</span>
						<span>Reach Kardashev Type I — estimated ~2371</span>
					</li>
					<li>
						<span class="quest-mark">□</span>
						<span>Harness the star — Kardashev Type II</span>
					</li>
					<li class="current">
						<span class="quest-mark">▣</span>
						<span>Grind the tech tree: energy, industry, habitats, space resources</span>
					</li>
					<li>
						<span class="quest-mark">□</span>
						<span>Map and deploy SSI across the Solar System</span>
					</li>
				</ul>
				<div class="quest-reward">
					<span class="manifest-k">Reward</span>
					<span>A future easier to imagine — and harder to dismiss</span>
				</div>
				<div class="manifest-orders">
					<div class="manifest-k">Quest log</div>
					<p>Humanity may reach Kardashev Type I around 2371. Type II is far beyond that: a civilization capable of harnessing the energy of its star.</p>
					<p>We are nowhere near it. And that is precisely the point.</p>
					<p>Global Solar System Infrastructure is an invitation to imagine the path from a planetary civilization to a stellar one — and to explore the technologies, industries and infrastructures that could make that future possible.</p>
					<p>We need to grind the tech tree: master energy, expand industry, develop habitats, exploit space resources, and transform the Solar System into an interconnected infrastructure network.</p>
					<p>GSSI exists to make that future easier to imagine — and harder to dismiss.</p>
				</div>
			</div>
		</div>
		<button class="ogame-cta" type="button" @click="openStarmap">
			<span class="ogame-cta-label">STARMAP // SOL</span>
			<span class="ogame-cta-sub">Initialize orbital command</span>
		</button>
	</section>
	<section class="parallax celestial-section" ref="celestialSection">
		<div class="detailHead">
			<h1 class="title">Our Celestial Bodies</h1>
		</div>
		<CelestialEntities msg="Test Body" />
	</section>
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
						<a href="https://www.instagram.com/AggelosQubit/" class="text-white" target="_blank">
							<i class="fab fa-instagram mr-2"></i>Instagram
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import CelestialEntities from './components/CelestialEntities.vue';


export default {
	name: 'App',
	components: {
		CelestialEntities	
	},
	methods:{
		openStarmap() {
			const section = this.$refs.celestialSection
			if (section) {
				section.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		}
	}
}
</script>

<style>

/*****************************
 All rights reserved.
 AllFont.net (c) 2011-2015
 *****************************/

body,html{
	font-family: 'Orbitron';
	
	background-image: url('../public/assets/01-solar-system-pia12114_orig.webp');
		background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.parallax{
	/*Parallax Effect*/
	min-height:  fit-content;
}
.celestial-section {
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.celestial-section .detailHead {
	flex: 0 0 auto;
}
.celestial-section .solar-viewport {
	flex: 1 1 auto;
	min-height: 0;
	height: auto;
}
.detailHead{
	padding-top: 20px;
	padding-bottom: 20px;
	background-color: rgba(255, 255, 255, 0.75);
}
.title{
	position: relative;
	text-align: center;
	color: #03859c;
	text-shadow: 1px 1px rgba(255, 255, 255, 0.75);
}

.ogame-bridge {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 18px 24px 28px;
	box-sizing: border-box;
	background:
		linear-gradient(180deg, rgba(8, 10, 16, 0.55) 0%, rgba(8, 10, 16, 0.28) 40%, rgba(8, 10, 16, 0.62) 100%);
}
.ogame-head {
	width: min(1080px, 100%);
	padding: 12px 18px;
	background: linear-gradient(180deg, #0d2230 0%, #071018 100%);
	border: 1px solid #00d4ff;
	box-shadow: inset 0 1px 0 rgba(160, 240, 255, 0.35), 0 0 0 1px #041018, 0 0 18px rgba(0, 212, 255, 0.28);
	text-align: center;
}
.ogame-kicker {
	margin: 0 0 4px;
	color: #7ef9ff;
	font-size: 12px;
	letter-spacing: 0.28em;
	text-transform: uppercase;
}
.ogame-title {
	margin: 0;
	color: #b9f6ff;
	font-size: clamp(22px, 3vw, 34px);
	text-shadow: 0 0 12px rgba(0, 212, 255, 0.55);
}
.ogame-panel {
	width: min(1080px, 100%);
	flex: 1 1 auto;
	min-height: 0;
	display: flex;
	flex-direction: column;
	margin: 16px 0;
	background: linear-gradient(180deg, rgba(8, 22, 32, 0.9), rgba(4, 10, 16, 0.92));
	border: 1px solid #03859c;
	box-shadow: inset 0 0 0 1px #041018, inset 0 0 40px rgba(0, 180, 220, 0.08), 0 0 22px rgba(0, 212, 255, 0.18);
	overflow: hidden;
}
.ogame-panel-title {
	flex: 0 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	padding: 8px 14px;
	background: linear-gradient(180deg, #12384a, #081820);
	border-bottom: 1px solid #00d4ff;
	color: #9ef6ff;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	font-size: 12px;
}
.ogame-panel-meta {
	letter-spacing: 0.14em;
	color: #7ef9ff;
	opacity: 0.85;
	font-size: 11px;
}
.ogame-bridge .gssiDef {
	flex: 1 1 auto;
	min-height: 0;
	padding: 0;
	overflow: auto;
}
.quest-title-row {
	padding: 12px 16px 8px;
	border-bottom: 1px solid rgba(0, 212, 255, 0.25);
}
.quest-name {
	margin: 0;
	color: #d6fbff;
	font-size: 20px;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
}
.quest-giver {
	margin: 4px 0 0;
	color: #7ef9ff;
	font-size: 11px;
	letter-spacing: 0.14em;
	text-transform: uppercase;
}
.quest-objectives {
	list-style: none;
	margin: 0;
	padding: 8px 0;
}
.quest-objectives li {
	display: flex;
	gap: 10px;
	align-items: flex-start;
	padding: 8px 16px;
	color: #c5d5dc;
	font-size: 13px;
	letter-spacing: 0.04em;
	border-bottom: 1px solid rgba(0, 212, 255, 0.12);
}
.quest-objectives li.current {
	color: #eaf8ff;
	background: rgba(0, 180, 220, 0.08);
}
.quest-mark {
	color: #7ef9ff;
	min-width: 1.2em;
}
.quest-reward {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px 14px;
	padding: 10px 16px;
	border-bottom: 1px solid rgba(0, 212, 255, 0.25);
	background: rgba(0, 40, 55, 0.35);
	color: #d6fbff;
	font-size: 12px;
	letter-spacing: 0.06em;
}
.manifest-k {
	color: #7ef9ff;
	letter-spacing: 0.16em;
	margin-right: 6px;
}
.manifest-orders {
	padding: 14px 16px 18px;
	color: #eaf8ff;
	text-align: left;
}
.manifest-orders .manifest-k {
	display: block;
	margin-bottom: 10px;
	font-size: 11px;
	text-transform: uppercase;
}
.manifest-orders p {
	margin: 0 0 10px;
	font-size: 14px;
	line-height: 1.55;
	text-shadow: 0 0 8px rgba(0, 133, 156, 0.35);
}
.ogame-cta {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding: 12px 42px 14px;
	background: linear-gradient(180deg, #156a86 0%, #071820 48%, #0d4a60 100%);
	border: 1px solid #00e5ff;
	box-shadow: inset 0 1px 0 rgba(180, 250, 255, 0.45), 0 0 18px rgba(0, 212, 255, 0.35);
	color: #d6fbff;
	cursor: pointer;
}
.ogame-cta:hover {
	filter: brightness(1.12);
	box-shadow: inset 0 1px 0 rgba(180, 250, 255, 0.55), 0 0 28px rgba(0, 229, 255, 0.55);
}
.ogame-cta-label {
	font-size: 20px;
	letter-spacing: 0.22em;
}
.ogame-cta-sub {
	font-size: 11px;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	color: #7ef9ff;
}

.pHovering{
	text-align: center;
	color: rgb(255, 255, 255);
	text-shadow: 1px 1px #03859c;
	font-size: 25px;
	transition: color 2s, font-size 5s;
}

.pHovering:hover{
	color: rgb(0, 109, 160);
	font-size: 1.2cm;
}
</style>
