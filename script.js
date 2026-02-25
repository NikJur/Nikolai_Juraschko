/**
 * Initialize the 3D Globe with pinpoints.
 * The globe is fixed in the background while content scrolls.
 */
const globe = Globe()
  (document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');

// Data for your locations
const locations = [
  { id: 'switzerland', lat: 47.37, lng: 8.54, label: 'Zurich' },
  { id: 'usa', lat: 42.36, lng: -71.05, label: 'Boston' }
];

globe.pointsData(locations)
  .pointRadius(0.5)
  .pointColor(() => 'orange');

/**
 * Setup ScrollTrigger to rotate globe when sections enter view.
 */
gsap.registerPlugin(ScrollTrigger);

locations.forEach(loc => {
  ScrollTrigger.create({
    trigger: `#${loc.id}`,
    start: "top center",
    onEnter: () => {
      globe.pointOfView({ lat: loc.lat, lng: loc.lng, alt: 2 }, 1000);
    },
    onEnterBack: () => {
      globe.pointOfView({ lat: loc.lat, lng: loc.lng, alt: 2 }, 1000);
    }
  });
});
