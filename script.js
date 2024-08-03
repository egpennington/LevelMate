window.addEventListener('deviceorientation', handleOrientation);
const levelSound = new Audio('level-sound.mp3'); // Ensure the path is correct

let isLevel = false;

function handleOrientation(event) {
    const beta = event.beta;    // Tilt front-back
    const gamma = event.gamma;  // Tilt left-right
    const alpha = event.alpha;  // Rotation around z-axis

    const bubble = document.getElementById('bubble');
    const message = document.getElementById('message');

    let x, y;

    if (Math.abs(window.orientation) === 0 || Math.abs(window.orientation) === 180) {
        // Portrait or Portrait upside down
        if (beta > 45 || beta < -45) {
            // Face down
            x = (-gamma / 45) * 50;
            y = (-beta / 45) * 50;
        } else {
            // Face up
            x = (gamma / 45) * 50;
            y = (beta / 45) * 50;
        }
    } else if (Math.abs(window.orientation) === 90 || Math.abs(window.orientation) === 270) {
        // Landscape or Landscape upside down
        if (Math.abs(gamma) > 45) {
            // Phone on its edge (long side)
            x = (beta / 45) * 50;
            y = (-gamma / 45) * 50;
        } else {
            // Face up or Face down
            if (beta > 45 || beta < -45) {
                // Face down
                x = (-gamma / 45) * 50;
                y = (-beta / 45) * 50;
            } else {
                // Face up
                x = (gamma / 45) * 50;
                y = (beta / 45) * 50;
            }
        }
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
