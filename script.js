window.addEventListener('deviceorientation', handleOrientation);
const levelSound = new Audio('level-sound.mp3'); // Ensure the path is correct

let isLevel = false;

function handleOrientation(event) {
    const beta = event.beta;    // Tilt front-back
    const gamma = event.gamma;  // Tilt left-right

    const bubble = document.getElementById('bubble');
    const message = document.getElementById('message');

    let x, y;
    const orientation = window.orientation;

    if (orientation === 0) {
        // Portrait
        x = (gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
        y = (beta / 90) * 50;  // -90 to 90 degrees mapped to -50% to 50%
    } else if (orientation === 180) {
        // Portrait upside down
        x = (-gamma / 45) * 50; // -45 to 45 degrees mapped to -50% to 50%
        y = (-beta / 90) * 50;  // -90 to 90 degrees mapped to -50% to 50%
    } else if (orientation === 90) {
        // Landscape (home button on the right)
        x = (beta / 45) * 50;  // -45 to 45 degrees mapped to -50% to 50%
        y = (-gamma / 90) * 50; // -90 to 90 degrees mapped to -50% to 50%
    } else if (orientation === -90 || orientation === 270) {
        // Landscape (home button on the left)
        x = (-beta / 45) * 50;  // -45 to 45 degrees mapped to -50% to 50%
        y = (gamma / 90) * 50;  // -90 to 90 degrees mapped to -50% to 50%
    }

    // Clamp values to prevent bubble from moving out of bounds
    const clampedX = Math.max(-50, Math.min(50, x));
    const clampedY = Math.max(-50, Math.min(50, y));

    bubble.style.transform = `translate(${clampedX + 7}%, ${clampedY + 7}%)`; // Adjusting for the 43% center

    // Check if the device is level
    if (Math.abs(clampedX) < 5 && Math.abs(clampedY) < 5) {
        if (!isLevel) {
            message.textContent = "Level!";
            levelSound.play().catch(error => {
                console.log('Sound playback failed:', error);
            });
            isLevel = true;
        }
    } else {
        message.textContent = "Tilt your device to level.";
        isLevel = false;
    }
}
