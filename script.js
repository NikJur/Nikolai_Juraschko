/**
 * Initialise the 3D Globe for the left-hand column.
 * width as half the window width.
 */
document.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globe-container');
    
    const globe = Globe()
      .width(window.innerWidth / 2) // Set to half-width
      .height(window.innerHeight)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundImageUrl('https://raw.githubusercontent.com/NikJur/Nikolai_Juraschko/main/night-sky_amended.png')
      .backgroundColor('rgba(0,0,0,0)') 
      (globeContainer);

    // Ensure the globe center stays centered in its half-width container
    globe.controls().staticMoving = true;
    
    // Resize handler must also account for the 50% width
    window.addEventListener('resize', () => {
      globe.width(window.innerWidth / 2);
      globe.height(window.innerHeight);
    });

    // Set up location data
    const locations = [
      { id: 'switzerland', lat: 47.37, lng: 8.54, label: 'Zurich' },
      { id: 'uk', lat: 51.75, lng: -1.25, label: 'Oxford' }
    ];

    globe.pointsData(locations)
      .pointRadius(0.7)
      .pointColor(() => '#004aa5');

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /**
     * Function: updateGlobeRotation
     * Description: Smoothly rotates the globe to specific coordinates.
     */
    const updateGlobeRotation = (lat, lng) => {
        globe.pointOfView({ lat, lng, alt: 2 }, 1200);
    };

    // Apply scroll logic to each section
    locations.forEach(loc => {
      ScrollTrigger.create({
        trigger: `#${loc.id}`,
        start: "top center",
        onEnter: () => updateGlobeRotation(loc.lat, loc.lng),
        onEnterBack: () => updateGlobeRotation(loc.lat, loc.lng)
      });
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      globe.width(window.innerWidth);
      globe.height(window.innerHeight);
    });
});