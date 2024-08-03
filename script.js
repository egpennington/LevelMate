window.addEventListener('deviceorientation', handleOrientation);
const levelSound = new Audio('level-sound.mp3'); // Add a sound file named 'level-sound.mp3'

function handleOrientation(event) {
    const beta = event.beta;    // Tilt front-back
    const gamma = event.gamma;  // Tilt left-right
    const alpha = event.alpha;  // Rotation around the z-axis

    const bubble = document.getElementById('bubble');
    const message = document.getElementById('message');

    let x, y;
    const orientation = window.orientation;

    if (orientation === 0) {
        // Portrait
        x = (gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
        y = (beta / 45) * 50;  // -45 to 45 degrees mapped to -50% to 50%
    } else if (orientation === 90) {
        // Landscape (home button on the right)
        x = (beta / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
        y = (-gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
    } else if (orientation === -90) {
        // Landscape (home button on the left)
        x = (-beta / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
        y = (gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
    } else if (orientation === 180) {
        // Portrait upside down
        x = (-gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
        y = (-beta / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
    }

    // Clamp values to prevent bubble from moving out of bounds
    const clampedX = Math.max(-50, Math.min(50, x));
    const clampedY = Math.max(-50, Math.min(50, y));

    bubble.style.transform = `translate(${clampedX + 7}%, ${clampedY + 7}%)`; // Adjusting for the 43% center

    // Check if the device is level
    if (Math.abs(clampedX) < 5 && Math.abs(clampedY) < 5) {
        message.textContent = "Level!";
        levelSound.play(); // Play sound when level
    } else {
        message.textContent = "Tilt your device to level.";
    }
}
