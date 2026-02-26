/**
 * Initialise the 3D Globe for the left-hand column.
 * width as half the window width.
 */
window.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globe-container');

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const globe = Globe()
      .width(window.innerWidth)
      .height(window.innerHeight)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundImageUrl('https://raw.githubusercontent.com/NikJur/Nikolai_Juraschko/main/night-sky_amended.png')
      .backgroundColor('rgba(0,0,0,0)') 
      (globeContainer);

    // Ensure the globe center stays centered in its half-width container
    globe.controls().staticMoving = true;

    // Set up location data
    const locations = [
      { id: 'oxford-dphil', lat: 51.7520, lng: -1.2577, label: 'Oxford University' },
      { id: 'ucl-msci', lat: 51.5246, lng: -0.1340, label: 'UCL' },
      { id: 'regensburg-abitur', lat: 49.0134, lng: 12.1016, label: 'AMG' }
    ];

    // Ensure your ScrollTrigger loop uses these new locations
    locations.forEach(loc => {
      ScrollTrigger.create({
        trigger: `#${loc.id}`,
        start: "top 60%", // Adjusted from 'center' to account for shorter sections
        onEnter: () => updateGlobeRotation(loc.lat, loc.lng),
        onEnterBack: () => updateGlobeRotation(loc.lat, loc.lng)
      });
    });

    globe.pointsData(locations)
      .pointRadius(0.7)
      .pointColor(() => '#004aa5');

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
        start: "top 60%", // Adjusted from 'center' to account for shorter sections
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