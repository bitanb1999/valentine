const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const container = document.querySelector('.container');

// Text to verify why running
const texts = [
    "Why are you running?",
    "Why are you running from me?",
    "Why are you gay!?",
    "Come back here!",
    "Play hard to get huh?",
    "Bruh...",
    "Seriously?",
    "I'm crying rn"
];

yesBtn.addEventListener('click', () => {
    window.location.href = 'success.html';
});

const moveButton = () => {
    // Ensure button stays in the container (pink box) and uses absolute positioning relative to it
    if (noBtn.parentElement !== container) {
        container.appendChild(noBtn);
    }

    // We want the button to be absolute restricted to the container
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }

    // Get container dimensions
    // Use getBoundingClientRect for more accurate available space
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // We need to calculate valid X and Y relative to the container
    // Max X is container width - button width
    // Max Y is container height - button height

    // Safety padding so it doesn't hit the very edge
    const padding = 20;

    const maxX = containerRect.width - btnRect.width - padding;
    const maxY = containerRect.height - btnRect.height - padding;

    const newX = Math.random() * (maxX - padding) + padding;
    const newY = Math.random() * (maxY - padding) + padding;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // Create floating text
    // Pass the center of the button's NEW position for text placement
    // Since text is appended to body (fixed), we need global coordinates
    const globalX = containerRect.left + newX + (btnRect.width / 2);
    const globalY = containerRect.top + newY - 20; // Above button

    createFloatingText(globalX, globalY);

    // Add silly dance animation class temporarily
    noBtn.classList.add('shake');
    setTimeout(() => {
        noBtn.classList.remove('shake');
    }, 500);
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

function createFloatingText(x, y) {
    const text = document.createElement('div');
    text.classList.add('running-text');
    text.style.position = 'fixed';
    text.innerText = texts[Math.floor(Math.random() * texts.length)];

    text.style.left = `${x}px`;
    text.style.top = `${y}px`;

    // Center the text
    text.style.transform = "translateX(-50%)";

    // Ensure high z-index
    text.style.zIndex = "9999";

    document.body.appendChild(text);

    // Remove after animation
    setTimeout(() => {
        text.remove();
    }, 1500);
}
