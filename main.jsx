import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------
// 1. Lenis Smooth Scrolling
// -----------------------------------------------------------------
const lenis = new Lenis({
  wrapper: document.getElementById('smooth-wrapper'),
  content: document.getElementById('smooth-content'),
  lerp: 0.08,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// -----------------------------------------------------------------
// 2. Three.js Cinematic Landscape
// -----------------------------------------------------------------
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// We want a deep foggy atmosphere
scene.fog = new THREE.FogExp2(0x030507, 0.003);

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 50);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Abstract 3D Terrain Grid (Wireframe) Map
const geometry = new THREE.PlaneGeometry(300, 300, 100, 100);

// Displace vertices to create mountains/valleys
const pos = geometry.attributes.position;
const v = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
  v.fromBufferAttribute(pos, i);
  // Simple math based noise to make procedural looking terrain
  const z = Math.sin(v.x * 0.1) * Math.cos(v.y * 0.1) * 10 + Math.sin(v.x * 0.02) * 20;
  pos.setZ(i, z);
}
geometry.computeVertexNormals();

const material = new THREE.MeshBasicMaterial({
  color: 0x10B981, // Emerald Green abstract glow
  wireframe: true,
  transparent: true,
  opacity: 0.15,
});

const terrain = new THREE.Mesh(geometry, material);
terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

// Add some drifting particles (like digital snow/spores)
const particlesGeom = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 150;
}
particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
  size: 0.1,
  color: 0x0EA5E9,
  transparent: true,
  opacity: 0.6
});
const particles = new THREE.Points(particlesGeom, particlesMat);
scene.add(particles);

// -----------------------------------------------------------------
// 3. Animation Loop & Resize
// -----------------------------------------------------------------
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // Subtle automatic ambient movement
  terrain.position.z = elapsedTime * 2; // Endless moving forward
  // Loop terrain back so it never runs out
  if (terrain.position.z > 50) {
    terrain.position.z = 0;
  }

  particles.rotation.y = elapsedTime * 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// -----------------------------------------------------------------
// 4. GSAP ScrollTriggers
// -----------------------------------------------------------------

// Camera flight linked to scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#smooth-content",
    start: "top top",
    end: "bottom bottom",
    scrub: 1 // smooth scrubbing
  }
});

// Fly camera down and tilt up through the grid
tl.to(camera.position, {
  y: 1, // go lower to the grid
  z: -20, // fly forward
  ease: "none"
}, 0);

tl.to(camera.rotation, {
  x: 0.1, // tilt head slightly up
  ease: "none"
}, 0);

// Turn material intense blue near the bottom
tl.to(material.color, {
  r: 0.05,
  g: 0.64,
  b: 0.91, // 0EA5E9
  ease: "none"
}, 0);

// HTML Elements Revelations
gsap.utils.toArray('[data-gsap="fade-up"]').forEach(elem => {
  const delay = elem.dataset.delay || 0;
  gsap.fromTo(elem,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: parseFloat(delay),
      scrollTrigger: {
        trigger: elem,
        start: "top 85%", // when top of elem hits 85% of screen
        toggleActions: "play none none reverse"
      }
    }
  );
});

gsap.utils.toArray('[data-gsap="scale-x"]').forEach(elem => {
  gsap.fromTo(elem,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});
