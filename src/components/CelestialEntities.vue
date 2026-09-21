<template>
	<div class="solar-viewport">
		<canvas ref="viewport" class="solar-canvas"></canvas>
		<button
			class="orbit-toggle"
			:class="{ off: !showOrbits }"
			type="button"
			@click="toggleOrbits"
		>
			{{ showOrbits ? 'Orbits on' : 'Orbits off' }}
		</button>
		<p class="solar-hint">Drag to orbit · scroll to zoom · click a planet<br>Textures: Solar System Scope (CC BY 4.0)</p>
		<aside v-if="selected" class="solar-panel">
			<button class="solar-close" type="button" @click="closePanel">×</button>
			<h2 class="title">{{ selected.name }}</h2>
			<p><strong>Average temperature:</strong> {{ formatTemp(selected.data && selected.data.avgTemp) }}</p>
			<p><strong>Gravity:</strong> {{ selected.data && selected.data.gravity != null ? selected.data.gravity + ' m/s²' : '—' }}</p>
			<p><strong>Mass:</strong> {{ formatMass(selected.data && selected.data.mass) }}</p>
		</aside>
	</div>
</template>
<script>
import { createSolarSystem } from '@/solarSystem/scene'

const bodies = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Sun"]
const localImages = new Set(["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"])

export default {
	name: 'CelestialEntities',
	props: {
		msg: String,
	},
	data(){
		return {
			planetsData : [],
			selected: null,
			showOrbits: true
		}
	},
	async created(){
		const results = await Promise.all(bodies.map(async (name) => {
			try {
				const res = await fetch(`/rest/bodies/${name}`, {
					headers: process.env.VUE_APP_API_KEY_SYS_SOL
						? { Authorization: `Bearer ${process.env.VUE_APP_API_KEY_SYS_SOL}` }
						: {}
				})
				if (!res.ok) {
					throw new Error(`${name}: ${res.status}`)
				}
				const data = await res.json()
				const slug = String(data.englishName || name).toLowerCase()
				return {
					...data,
					image: localImages.has(slug) ? `/assets/${slug}.png` : null
				}
			} catch (error) {
				console.error(error)
				return null
			}
		}))
		this.planetsData = results.filter(Boolean)
		if (this.system) {
			this.system.setPlanetData(this.planetsData)
		}
	},
	mounted() {
		this.system = createSolarSystem(this.$refs.viewport, {
			onSelect: (payload) => {
				this.selected = payload
			}
		})
		this.system.setPlanetData(this.planetsData)
		this.$nextTick(() => this.system.resize())
	},
	beforeUnmount() {
		if (this.system) {
			this.system.dispose()
			this.system = null
		}
	},
	methods : {
		toggleOrbits() {
			this.showOrbits = !this.showOrbits
			if (this.system) {
				this.system.setOrbitRingsVisible(this.showOrbits)
			}
		},
		closePanel() {
			this.selected = null
			if (this.system) {
				this.system.clearFocus()
			}
		},
		formatTemp(avgTemp) {
			if (avgTemp === null || avgTemp === undefined) {
				return '—'
			}
			return `${Math.round(avgTemp - 273.15)}°C`
		},
		formatMass(mass) {
			if (!mass || mass.massValue === undefined || mass.massExponent === undefined) {
				return '—'
			}
			return `${mass.massValue} x 10^${mass.massExponent} kg`
		}
	}
}

</script>

<style scoped>
.solar-viewport {
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 0;
	overflow: hidden;
	background: #02050a;
}
.solar-canvas {
	display: block;
	width: 100%;
	height: 100%;
	cursor: grab;
}
.orbit-toggle {
	position: absolute;
	top: 16px;
	left: 16px;
	padding: 8px 14px;
	background: rgba(8, 22, 32, 0.82);
	border: 1px solid #00d4ff;
	color: #d6fbff;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	font-size: 12px;
	cursor: pointer;
	box-shadow: 0 0 12px rgba(0, 212, 255, 0.25);
}
.orbit-toggle.off {
	color: #7a98a3;
	border-color: #3d6470;
	box-shadow: none;
}
.solar-hint {
	position: absolute;
	left: 16px;
	bottom: 16px;
	margin: 0;
	color: #9fd7e0;
	text-shadow: 0 0 8px #000;
	font-size: 14px;
	pointer-events: none;
}
.solar-panel {
	position: absolute;
	top: 16px;
	right: 16px;
	width: min(320px, calc(100% - 32px));
	padding: 16px 20px;
	background: rgba(8, 16, 24, 0.82);
	border: 1px solid #03859c;
	color: #d7f4f8;
}
.solar-panel p {
	margin: 8px 0;
}
.solar-close {
	position: absolute;
	top: 8px;
	right: 10px;
	border: 0;
	background: transparent;
	color: #9fd7e0;
	font-size: 22px;
	line-height: 1;
	cursor: pointer;
}
.title {
	text-align: center;
	color: #03859c;
	margin: 0 18px 12px 0;
}
</style>
