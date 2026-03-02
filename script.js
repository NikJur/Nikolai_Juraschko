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
      // --- Education ---
      { id: 'oxford-dphil', lat: 51.7520, lng: -1.2577, label: 'Oxford University', customLabel: "Oxford", textOffset: -3.8 /** Nudge text west */, latOffset: 1.1, alt: 0.5 /** custom zoom in on globe */ },
      { id: 'ucl-msci', lat: 51.5246, lng: -0.1340, label: 'UCL', customLabel: "UCL", textOffset: 1.5 /** Nudge text east */, latOffset: 0 , alt: 2 /** default */ },
      { id: 'regensburg-abitur', lat: 49.0134, lng: 12.1016, label: 'AMG', customLabel: "AMG", textOffset: 0.2, latOffset: 0, alt: 2 },

      // --- Relevant Experience ---
      { id: 'RSE-AI4Science', lat: 51.7520, lng: -1.2577, label:"", customLabel: "", textOffset: 0, latOffset: 0, zoomAlt: 0.6 }, // Oxford
      { id: 'rosalind-franklin', lat: 51.5732, lng: -1.3149, label:"", customLabel: "RFI", textOffset: -1.2, latOffset: 0, zoomAlt: 0.7 }, // Harwell Campus
      { id: 'turing-enrichment', lat: 51.5299, lng: -0.1277, label:"", customLabel: "Turing", textOffset: 3.6, latOffset: 1.1, zoomAlt: 0.8 }, // London
      { id: 'turing-dsg', lat: 51.5299, lng: -0.1277, label:"", customLabel: "", textOffset: 0, latOffset: 0, zoomAlt: 1.2 }, // London (Wider Zoom)
      { id: 'cambridge-rep', lat: 52.2053, lng: 0.1218, label:"", customLabel: "Cambridge", textOffset: 1.5, latOffset: 1.8, zoomAlt: 0.8 }, // Cambridge
      { id: 'zerog-internship', lat: 50.1109, lng: 8.6821, label:"", customLabel: "zeroG", textOffset: -0.1, latOffset: 0, zoomAlt: 1.5 }, // Frankfurt

      // --- Other ---
      { id: 'oxford-tutor', lat: 51.7520, lng: -1.2577, customLabel: "", textOffset: 0, latOffset: 0, zoomAlt: 0.5 }, // Oxford
      { id: 'oxford-coach', lat: 51.7520, lng: -1.2577, customLabel: "", textOffset: 0, latOffset: 0, zoomAlt: 0.6 }, // Oxford
      { id: 'oxford-editor', lat: 51.7520, lng: -1.2577, customLabel: "", textOffset: 0, latOffset: 0, zoomAlt: 0.5 }, // Oxford
      { id: 'ucl-rep', lat: 51.5246, lng: -0.1340, customLabel: "", textOffset: 0, latOffset: 0, zoomAlt: 1.5 }, // London
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
      .labelLat(d => d.lat + (d.latOffset || 0))// Applies the nudge North-South based on the latOffset property so labels don't overlap with each other    
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