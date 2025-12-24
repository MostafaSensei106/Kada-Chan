// --- Code Rain Effect ---
const codeRainContainer = document.getElementById('codeRain');
const symbols = ['{', '}', '<', '>', '/', '(', ')', '[', ']', ';', ':', '=', '+', '-', '*',
    'class', 'void', 'int', 'if', 'for', 'while', '==', '!=', '&&', '||',
    '0', '1', 'null', 'true', 'false', 'var', 'let', 'const'];

function createCodeSymbol() {
    const symbol = document.createElement('div');
    symbol.className = 'code-symbol';
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + '%';
    symbol.style.animationDuration = (Math.random() * 15 + 10) + 's';
    symbol.style.fontSize = (Math.random() * 10 + 10) + 'px';

    const colors = ['var(--accent-teal)', 'var(--accent-coral)', 'var(--accent-gold)', 'var(--accent-lavender)'];
    symbol.style.color = colors[Math.floor(Math.random() * colors.length)];

    codeRainContainer.appendChild(symbol);

    setTimeout(() => {
        symbol.remove();
    }, 15000);
}

setInterval(createCodeSymbol, 300);
for (let i = 0; i < 20; i++) {
    setTimeout(createCodeSymbol, i * 100);
}

// --- Gallery Logic ---
const imagesFolder = "images/";
const imageFiles = [
    'mrandmsx.jpg',
    'mrandmsx2.jpg',
    'rawda.jpg',
    'watchFilm.jpg'
];
let currentIndex = 0;
const imgElement = document.getElementById('gallery-img');
const fileElement = document.getElementById('file-name');

function initGallery() {
    if (imageFiles.length > 0) {
        imgElement.src = imagesFolder + imageFiles[0];
        fileElement.textContent = imageFiles[0];
        typeCommand(`cd ${imageFiles[currentIndex]}`, () => { });
    } else {
        fileElement.textContent = 'No images found';
        imgElement.alt = 'Please add images to the images/ folder';
    }
}

function updateGallery() {
    imgElement.style.opacity = 0;
    imgElement.style.transform = 'scale(0.98)';

    setTimeout(() => {
        imgElement.src = imagesFolder + imageFiles[currentIndex];
        fileElement.textContent = imageFiles[currentIndex];
        imgElement.style.opacity = 1;
        imgElement.style.transform = 'scale(1)';
    }, 300);
}

function nextPhoto() {
    if (imageFiles.length === 0) return;
    currentIndex = (currentIndex + 1) % imageFiles.length;
    typeCommand(`cd ${imageFiles[currentIndex]}`, updateGallery);
}

function prevPhoto() {
    if (imageFiles.length === 0) return;
    currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
    typeCommand(`cd ${imageFiles[currentIndex]}`, updateGallery);
}

function typeCommand(text, callback) {
    const cmdText = document.querySelector('.cmd-text');
    cmdText.innerHTML = ""; // Use innerHTML to parse span
    let i = 0;

    const interval = setInterval(() => {
        if (i < text.length) {
            cmdText.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) {
                callback();
            }
        }
    }, 30);
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', initGallery);
