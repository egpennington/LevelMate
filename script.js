window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    const beta = event.beta;  // Tilt front-back
    const gamma = event.gamma; // Tilt left-right

    const bubble = document.getElementById('bubble');
    const message = document.getElementById('message');

    // Map the beta and gamma values to the position of the bubble
    const x = (gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
    const y = (beta / 45) * 50;  // -45 to 45 degrees mapped to -50% to 50%

    // Clamp values to prevent bubble from moving out of bounds
    const clampedX = Math.max(-50, Math.min(50, x));
    const clampedY = Math.max(-50, Math.min(50, y));

    bubble.style.transform = `translate(${clampedX}%, ${clampedY}%)`;

    // Check if the device is level
    if (Math.abs(clampedX) < 5 && Math.abs(clampedY) < 5) {
        message.textContent = "Level!";
    } else {
        message.textContent = "Tilt your device to level.";
    }
}
