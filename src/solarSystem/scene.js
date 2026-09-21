import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const DEG = Math.PI / 180
const TILT = 3.2
const ORBIT = 2
const SPEED = 0.45
const GALACTIC_RADIUS = 2400
const GALACTIC_SPEED = 0.00008
const ECLIPTIC_TILT = 60 * DEG
const TRAIL_LENGTH = 720
const TRAIL_LONG = TRAIL_LENGTH * 3
const SYSTEM_ZOOM_MAX = 1100
const PLANET_ZOOM_MAX = 680

const ORRERY = {
	sun: { radius: 4.4, orbit: 0, speed: 0, color: 0xffc14d, map: '/assets/8k_sun.jpg' },
	mercury: { radius: 0.58, orbit: 8.2 * ORBIT, speed: 0.018 * SPEED, color: 0xb8b0a8, map: '/assets/8k_mercury.jpg', inclination: 7.0 * DEG * TILT, node: 48 * DEG },
	venus: { radius: 0.92, orbit: 11.4 * ORBIT, speed: 0.013 * SPEED, color: 0xe4c27a, map: '/assets/8k_venus_surface.jpg', atmosphere: '/assets/4k_venus_atmosphere.jpg', inclination: 3.4 * DEG * TILT, node: 77 * DEG },
	earth: { radius: 0.96, orbit: 15.2 * ORBIT, speed: 0.01 * SPEED, color: 0x3d7bd9, map: '/assets/8k_earth_daymap.jpg', inclination: 0, node: 0 },
	mars: { radius: 0.7, orbit: 18.8 * ORBIT, speed: 0.008 * SPEED, color: 0xc1440e, map: '/assets/8k_mars.jpg', inclination: 1.9 * DEG * TILT, node: 50 * DEG },
	jupiter: { radius: 2.35, orbit: 25.4 * ORBIT, speed: 0.0048 * SPEED, color: 0xd7b48a, map: '/assets/8k_jupiter.jpg', inclination: 1.3 * DEG * TILT, node: 100 * DEG },
	saturn: { radius: 2.05, orbit: 32.6 * ORBIT, speed: 0.0036 * SPEED, color: 0xe7d4a8, map: '/assets/8k_saturn.jpg', rings: true, inclination: 2.5 * DEG * TILT, node: 114 * DEG },
	uranus: { radius: 1.35, orbit: 38.8 * ORBIT, speed: 0.0024 * SPEED, color: 0x7fe3e0, map: '/assets/2k_uranus.jpg', inclination: 0.8 * DEG * TILT, node: 74 * DEG },
	neptune: { radius: 1.3, orbit: 44.8 * ORBIT, speed: 0.0019 * SPEED, color: 0x3f66f5, map: '/assets/2k_neptune.jpg', inclination: 1.8 * DEG * TILT, node: 131 * DEG }
}

function setInclinedPosition(target, angle, radius, inclination, node) {
	const x = Math.cos(angle) * radius
	const z = Math.sin(angle) * radius
	const y1 = -z * Math.sin(inclination)
	const z1 = z * Math.cos(inclination)
	const cosN = Math.cos(node)
	const sinN = Math.sin(node)
	target.set(
		x * cosN + z1 * sinN,
		y1,
		-x * sinN + z1 * cosN
	)
}

function applyMap(loader, url, material, { emissive = false } = {}) {
	loader.load(url, (texture) => {
		texture.colorSpace = THREE.SRGBColorSpace
		texture.anisotropy = 8
		material.map = texture
		material.color.set(0xffffff)
		if (emissive) {
			material.emissiveMap = texture
			material.emissive = new THREE.Color(0xffffff)
		}
		material.needsUpdate = true
	})
}

function makeSky(loader) {
	const geometry = new THREE.SphereGeometry(5000, 48, 32)
	const material = new THREE.MeshBasicMaterial({
		side: THREE.BackSide,
		color: 0x111111,
		depthWrite: false
	})
	applyMap(loader, '/assets/8k_stars_milky_way.jpg', material)
	const sky = new THREE.Mesh(geometry, material)
	sky.frustumCulled = false
	return sky
}

function makeTrail() {
	const positions = new Float32Array(TRAIL_LONG * 3)
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
	geometry.setDrawRange(0, 0)
	const material = new THREE.LineBasicMaterial({
		color: 0x8fd4e4,
		transparent: true,
		opacity: 0.4
	})
	const line = new THREE.Line(geometry, material)
	line.frustumCulled = false
	return { line, positions, count: 0, limit: TRAIL_LENGTH }
}

function pushTrail(trail, point) {
	const { positions, limit } = trail
	if (trail.count < limit) {
		const index = trail.count * 3
		positions[index] = point.x
		positions[index + 1] = point.y
		positions[index + 2] = point.z
		trail.count += 1
	} else {
		positions.copyWithin(0, 3, limit * 3)
		const index = (limit - 1) * 3
		positions[index] = point.x
		positions[index + 1] = point.y
		positions[index + 2] = point.z
	}
	trail.line.geometry.setDrawRange(0, trail.count)
	trail.line.geometry.attributes.position.needsUpdate = true
}

function setTrailLimit(trail, limit) {
	if (trail.count > limit) {
		const start = (trail.count - limit) * 3
		trail.positions.copyWithin(0, start, trail.count * 3)
		trail.count = limit
	}
	trail.limit = limit
	trail.line.geometry.setDrawRange(0, trail.count)
	trail.line.geometry.attributes.position.needsUpdate = true
}

function makeAtmosphere(loader, radius, url) {
	const geometry = new THREE.SphereGeometry(radius * 1.018, 48, 32)
	const material = new THREE.MeshStandardMaterial({
		transparent: true,
		opacity: 0.42,
		roughness: 1,
		metalness: 0,
		depthWrite: false
	})
	applyMap(loader, url, material)
	return new THREE.Mesh(geometry, material)
}

function makeSaturnRings(loader, radius) {
	const inner = radius * 1.28
	const outer = radius * 2.35
	const geometry = new THREE.RingGeometry(inner, outer, 96)
	const pos = geometry.attributes.position
	const vertex = new THREE.Vector3()
	for (let i = 0; i < pos.count; i += 1) {
		vertex.fromBufferAttribute(pos, i)
		const u = (vertex.length() - inner) / (outer - inner)
		geometry.attributes.uv.setXY(i, u, 0.5)
	}
	const material = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		transparent: true,
		depthWrite: false,
		color: 0xffffff
	})
	loader.load('/assets/8k_saturn_ring_alpha.png', (texture) => {
		texture.colorSpace = THREE.SRGBColorSpace
		material.map = texture
		material.alphaMap = texture
		material.needsUpdate = true
	})
	const rings = new THREE.Mesh(geometry, material)
	rings.rotation.x = Math.PI / 2
	return rings
}

function makeOrbitRing(radius, inclination, node) {
	const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
	const points = curve.getPoints(160).map((p) => {
		const point = new THREE.Vector3()
		setInclinedPosition(point, Math.atan2(p.y, p.x), radius, inclination, node)
		return point
	})
	const geometry = new THREE.BufferGeometry().setFromPoints(points)
	const material = new THREE.LineBasicMaterial({
		color: 0x6ec4d4,
		transparent: true,
		opacity: 0.28
	})
	return new THREE.LineLoop(geometry, material)
}

export function createSolarSystem(canvas, { onSelect } = {}) {
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false
	})
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
	renderer.setClearColor(0x02050a, 1)
	renderer.outputColorSpace = THREE.SRGBColorSpace
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1.45

	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 12000)
	camera.position.set(48, 64, 120)

	const controls = new OrbitControls(camera, canvas)
	controls.enableDamping = true
	controls.dampingFactor = 0.06
	controls.minDistance = 10
	controls.maxDistance = SYSTEM_ZOOM_MAX
	controls.target.set(0, 0, 0)

	scene.add(new THREE.AmbientLight(0x9aa8c4, 0.55))
	scene.add(new THREE.HemisphereLight(0x8eb4ff, 0x1a1208, 0.45))
	const sunLight = new THREE.PointLight(0xfff4d6, 900, 700, 1.15)

	const clickables = []
	const bodies = []
	const orbitRings = []
	const loader = new THREE.TextureLoader()
	const disposables = []
	const sky = makeSky(loader)
	scene.add(sky)

	const solarGroup = new THREE.Group()
	solarGroup.rotation.x = ECLIPTIC_TILT
	scene.add(solarGroup)
	solarGroup.add(sunLight)

	let galacticAngle = 0.6
	let sunMesh = null

	function placeSolarGroup() {
		solarGroup.position.set(
			Math.cos(galacticAngle) * GALACTIC_RADIUS,
			0,
			Math.sin(galacticAngle) * GALACTIC_RADIUS
		)
	}

	Object.entries(ORRERY).forEach(([id, def]) => {
		if (def.orbit > 0) {
			const ring = makeOrbitRing(def.orbit, def.inclination, def.node)
			solarGroup.add(ring)
			orbitRings.push(ring)
			disposables.push(ring.geometry, ring.material)
		}

		const isSun = id === 'sun'
		const geometry = new THREE.SphereGeometry(def.radius, 64, 48)
		const material = new THREE.MeshStandardMaterial({
			color: def.color,
			roughness: isSun ? 0.35 : 0.62,
			metalness: 0,
			emissive: isSun ? new THREE.Color(0xffb347) : new THREE.Color(0x000000),
			emissiveIntensity: isSun ? 2.4 : 0
		})
		const mesh = new THREE.Mesh(geometry, material)
		mesh.userData = {
			id,
			name: id.charAt(0).toUpperCase() + id.slice(1),
			angle: Math.random() * Math.PI * 2,
			speed: def.speed,
			orbit: def.orbit,
			radius: def.radius,
			inclination: def.inclination || 0,
			node: def.node || 0,
			data: null
		}

		if (!isSun) {
			setInclinedPosition(mesh.position, mesh.userData.angle, def.orbit, mesh.userData.inclination, mesh.userData.node)
		}
		applyMap(loader, def.map, material, { emissive: isSun })

		if (def.atmosphere) {
			const atmosphere = makeAtmosphere(loader, def.radius, def.atmosphere)
			mesh.add(atmosphere)
			disposables.push(atmosphere.geometry, atmosphere.material)
		}

		if (def.rings) {
			const rings = makeSaturnRings(loader, def.radius)
			mesh.add(rings)
			disposables.push(rings.geometry, rings.material)
		}

		solarGroup.add(mesh)
		clickables.push(mesh)
		bodies.push(mesh)
		if (isSun) {
			sunMesh = mesh
		}
		const trail = makeTrail()
		mesh.userData.trail = trail
		scene.add(trail.line)
		disposables.push(trail.line.geometry, trail.line.material)
		disposables.push(geometry, material)
	})

	const raycaster = new THREE.Raycaster()
	const pointer = new THREE.Vector2()
	const followOffset = new THREE.Vector3()
	const desiredOffset = new THREE.Vector3()
	const lastFocusPos = new THREE.Vector3()
	const focusDelta = new THREE.Vector3()
	let focused = null
	let framing = false
	let pointerDown = null
	let frame = 0
	let running = true

	const worldNow = new THREE.Vector3()

	function focusBody(mesh) {
		focused = mesh
		framing = true
		mesh.getWorldPosition(worldNow)
		lastFocusPos.copy(worldNow)
		const radius = mesh.userData.radius || 1
		const distance = Math.max(radius * 5.2, 3.4)
		controls.minDistance = radius * 2.1
		controls.maxDistance = mesh.userData.id === 'sun' ? SYSTEM_ZOOM_MAX : PLANET_ZOOM_MAX
		followOffset.copy(camera.position).sub(controls.target)
		if (followOffset.lengthSq() < 0.01) {
			followOffset.set(8, 5, 10)
		}
		desiredOffset.copy(followOffset).setLength(distance)
		controls.target.copy(worldNow)
		camera.position.copy(worldNow).add(followOffset)
	}

	function clearFocus() {
		focused = null
		framing = false
		controls.minDistance = 10
		controls.maxDistance = SYSTEM_ZOOM_MAX
		if (sunMesh) {
			sunMesh.getWorldPosition(worldNow)
			controls.target.copy(worldNow)
			camera.position.copy(worldNow).add(new THREE.Vector3(48, 64, 120))
			lastFocusPos.copy(worldNow)
		}
		controls.update()
	}

	function sizeToCanvas() {
		const width = canvas.clientWidth || canvas.parentElement.clientWidth
		const height = canvas.clientHeight || canvas.parentElement.clientHeight
		if (!width || !height) {
			return
		}
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		renderer.setSize(width, height, false)
	}

	function screenPointer(event) {
		const rect = canvas.getBoundingClientRect()
		pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
		pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
	}

	function hitTest() {
		raycaster.setFromCamera(pointer, camera)
		const hits = raycaster.intersectObjects(clickables, true)
		let mesh = hits[0] && hits[0].object
		while (mesh && !mesh.userData.id) {
			mesh = mesh.parent
		}
		return mesh || null
	}

	function onPointerDown(event) {
		pointerDown = { x: event.clientX, y: event.clientY }
	}

	function onPointerMove(event) {
		screenPointer(event)
		canvas.style.cursor = hitTest() ? 'pointer' : 'grab'
	}

	function onPointerUp(event) {
		if (!pointerDown) {
			return
		}
		const dx = event.clientX - pointerDown.x
		const dy = event.clientY - pointerDown.y
		pointerDown = null
		if (Math.hypot(dx, dy) > 6) {
			return
		}
		screenPointer(event)
		const mesh = hitTest()
		if (mesh) {
			focusBody(mesh)
			if (onSelect) {
				onSelect(mesh.userData)
			}
		}
	}

	function tick() {
		if (!running) {
			return
		}
		bodies.forEach((mesh) => {
			const { orbit, speed, inclination, node } = mesh.userData
			mesh.rotation.y += 0.0016
			if (orbit > 0) {
				mesh.userData.angle += speed
				setInclinedPosition(mesh.position, mesh.userData.angle, orbit, inclination, node)
			}
		})
		galacticAngle += GALACTIC_SPEED
		placeSolarGroup()
		bodies.forEach((mesh) => {
			mesh.getWorldPosition(worldNow)
			pushTrail(mesh.userData.trail, worldNow)
		})
		const anchor = focused || sunMesh
		if (anchor) {
			anchor.getWorldPosition(worldNow)
			focusDelta.copy(worldNow).sub(lastFocusPos)
			camera.position.add(focusDelta)
			controls.target.add(focusDelta)
			lastFocusPos.copy(worldNow)
			if (focused && framing) {
				followOffset.copy(camera.position).sub(controls.target)
				followOffset.lerp(desiredOffset, 0.12)
				controls.target.copy(worldNow)
				camera.position.copy(worldNow).add(followOffset)
				lastFocusPos.copy(worldNow)
				if (followOffset.distanceTo(desiredOffset) < 0.06) {
					framing = false
				}
			}
		}
		sky.position.copy(camera.position)
		controls.update()
		renderer.render(scene, camera)
		frame = requestAnimationFrame(tick)
	}

	canvas.addEventListener('pointerdown', onPointerDown)
	canvas.addEventListener('pointermove', onPointerMove)
	canvas.addEventListener('pointerup', onPointerUp)
	window.addEventListener('resize', sizeToCanvas)
	const resizeObserver = new ResizeObserver(sizeToCanvas)
	if (canvas.parentElement) {
		resizeObserver.observe(canvas.parentElement)
	}

	sizeToCanvas()
	placeSolarGroup()
	if (sunMesh) {
		sunMesh.getWorldPosition(worldNow)
		controls.target.copy(worldNow)
		camera.position.copy(worldNow).add(new THREE.Vector3(48, 64, 120))
		lastFocusPos.copy(worldNow)
	}
	tick()

	return {
		setPlanetData(list) {
			const byName = new Map(
				(list || []).map((item) => [String(item.englishName || item.name || '').toLowerCase(), item])
			)
			bodies.forEach((mesh) => {
				const data = byName.get(mesh.userData.id)
				if (data) {
					mesh.userData.data = data
					mesh.userData.name = data.englishName || mesh.userData.name
				}
			})
		},
		resize: sizeToCanvas,
		clearFocus,
		setOrbitRingsVisible(visible) {
			orbitRings.forEach((ring) => {
				ring.visible = visible
			})
			const limit = visible ? TRAIL_LENGTH : TRAIL_LONG
			bodies.forEach((mesh) => {
				setTrailLimit(mesh.userData.trail, limit)
			})
		},
		dispose() {
			running = false
			cancelAnimationFrame(frame)
			canvas.removeEventListener('pointerdown', onPointerDown)
			canvas.removeEventListener('pointermove', onPointerMove)
			canvas.removeEventListener('pointerup', onPointerUp)
			window.removeEventListener('resize', sizeToCanvas)
			resizeObserver.disconnect()
			controls.dispose()
			disposables.forEach((item) => item.dispose && item.dispose())
			renderer.dispose()
		}
	}
}
