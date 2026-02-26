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
      { id: 'oxford-dphil', lat: 51.7520, lng: -1.2577, label: 'Oxford University', customLabel: "OU", textOffset: -1.5 /** Nudge text west */, alt: 0.5 /** custom zoom in on globe */ },
      { id: 'ucl-msci', lat: 51.5246, lng: -0.1340, label: 'UCL', customLabel: "UCL", textOffset: 1.5 /** Nudge text east */ , alt: 2 /** default */ },
      { id: 'regensburg-abitur', lat: 49.0134, lng: 12.1016, label: 'AMG', customLabel: "AMG", textOffset: 0, alt: 2 }
    ];

    const updateGlobeRotation = (lat, lng, alt = 2) => {
        globe.pointOfView({ lat, lng, alt }, 1200);
    };

       // 360 GLOBE SPIN FOR HEADERS DEACTIVATED BC TOO LAGGY AT FAST SCROLLING!!!!!!!!!!!!!!!!!!
    // /**
    // * Function: updateGlobeRotation
    // * Description: Smoothly rotates the globe to specific coordinates.
    // */
    // /**
    //  * Function: performGlobalSpin
    //  * Description: Uses GSAP to animate a smooth 360-degree longitudinal sweep.
    //  * This prevents the "jump" by forcing a frame-by-frame rotation.
    //  */
    // const performGlobalSpin = () => {
    //     const pov = globe.pointOfView();
        
    //     // Create a dummy object to animate values smoothly
    //     const obj = { lng: pov.lng, alt: pov.alt };
        
    //     gsap.to(obj, {
    //         lng: pov.lng + 360,
    //         alt: 3, // Slight zoom out for the global effect
    //         duration: 2,
    //         ease: "power2.inOut",
    //         onUpdate: () => {
    //             globe.pointOfView({ 
    //                 lat: pov.lat, 
    //                 lng: obj.lng, 
    //                 alt: obj.alt 
    //             });
    //         }
    //     });
    // };

    // Initialise points and labels on the globe
    globe.pointsData(locations)
      .pointRadius(0.2) // size of the point on the globe
      .pointColor(() => '#004aa5');

    /**
     * Add text labels to the globe coordinates.
     * Description: Displays the 'label' property from the locations array
     * at the specified lat/lng coordinates.
     */
    globe.labelsData(locations)
      .labelLat(d => d.lat)
      .labelLng(d => d.lng + (d.textOffset || 0)) // Applies the nudge west/east based on the textOffset property so labels don't overlap with each other      
      .labelText(d => d.customLabel)
      .labelSize(1.0) // size of text label
      .labelDotRadius(0)
      .labelColor(() => '#004aa5')
      .labelAltitude(0.1) // Lifts text slightly off the globe surface
      .labelResolution(3);


    // 360 Spin DEACTIVATED BC TOO LAGGY AT FAST SCROLLING!!!!!!!!!!!!!!!!!!
    // // Trigger the spin ONLY when the Education header comes into view
    // ScrollTrigger.create({
    //     trigger: "#trigger-education",
    //     start: "top center",
    //     onEnter: () => performGlobalSpin()
    // });

    // Apply scroll logic to each section
    locations.forEach(loc => {
      ScrollTrigger.create({
        trigger: `#${loc.id}`,
        start: "top 60%", // Adjusted from 'center' to account for shorter sections
        onEnter: () => updateGlobeRotation(loc.lat, loc.lng, loc.alt),
        onEnterBack: () => updateGlobeRotation(loc.lat, loc.lng, loc.alt)
      });
    });

    // Handle Window Resize 
    window.addEventListener('resize', () => {
      globe.width(window.innerWidth);
      globe.height(window.innerHeight);
    });
});