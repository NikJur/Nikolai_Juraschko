/**
 * Initialise the 3D Globe with pinpoints.
 * The globe is fixed in the background while content scrolls.
 */
const globeContainer = document.getElementById('globe-container');

const globe = Globe()
  (globeContainer)
  .width(window.innerWidth)
  .height(window.innerHeight)
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundColor('rgba(0,0,0,0)'); // Makes background transparent to show CSS stars/colors
  (globeContainer); // "calls" globe into the div

// Corrected Data for your locations
const locations = [
  { id: 'switzerland', lat: 47.37, lng: 8.54, label: 'Zurich' },
  { id: 'uk', lat: 51.5074, lng: -0.1278, label: 'London' }
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
    // When scrolling down into the section
    onEnter: () => {
      globe.pointOfView({ lat: loc.lat, lng: loc.lng, alt: 2 }, 1000);
    },
    // When scrolling back up into the section
    onEnterBack: () => {
      globe.pointOfView({ lat: loc.lat, lng: loc.lng, alt: 2 }, 1000);
    }
  });
});

/**
 * Ensure globe resizes if the window changes size.
 */
window.addEventListener('resize', () => {
  globe.width(window.innerWidth);
  globe.height(window.innerHeight);
});
