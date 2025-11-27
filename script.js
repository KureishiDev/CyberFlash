
if (typeof fullData === 'undefined') {
    console.error("ERRO CRÍTICO: O arquivo data.js não foi carregado ou está corrompido.");
    alert("Erro ao carregar dados. Verifique se data.js está na pasta e carregado antes do script.js no HTML.");
}

const data = typeof fullData !== 'undefined' ? fullData : [];

let currentIndex = 0;
let isFlipped = false;

document.addEventListener('DOMContentLoaded', () => {
    
    loadCard();
});

function loadCard() {
    const termElement = document.getElementById('card-term');
    const defElement = document.getElementById('card-def');
    const counterElement = document.getElementById('counter');
    const cardElement = document.getElementById('flashcard');

    if (!termElement || !defElement) return;

    
    if (data.length === 0) {
        termElement.textContent = "Erro de Dados";
        defElement.textContent = "Não foi possível carregar as siglas. Verifique o console (F12).";
        return;
    }

    if (isFlipped) {
        cardElement.classList.remove('flipped');
        isFlipped = false;
        setTimeout(updateText, 300);
    } else {
        updateText();
    }
}

function updateText() {
    const termElement = document.getElementById('card-term');
    const defElement = document.getElementById('card-def');
    const counterElement = document.getElementById('counter');

    termElement.textContent = data[currentIndex].term;
    defElement.textContent = data[currentIndex].def;
    counterElement.textContent = `${currentIndex + 1} / ${data.length}`;
}


function flipCard() {
    const cardElement = document.getElementById('flashcard');
    cardElement.classList.toggle('flipped');
    isFlipped = !isFlipped;
}
function nextCard() {
    if (currentIndex < data.length - 1) currentIndex++;
    else currentIndex = 0;
    loadCard();
}
function prevCard() {
    if (currentIndex > 0) currentIndex--;
    else currentIndex = data.length - 1;
    loadCard();
}
function shuffleCards() {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    currentIndex = 0;
    loadCard();
}
function showSection(sectionId) {
    
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    
    
    document.querySelectorAll('.menu button').forEach(btn => {
        btn.classList.remove('text-green');
        btn.style.color = ''; 
    });
    
 
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.remove('hidden');

    
    const activeBtn = document.getElementById('btn-' + sectionId);
    if (activeBtn) activeBtn.classList.add('text-green');
}
document.addEventListener('DOMContentLoaded', () => {
    
    const hash = window.location.hash.replace('#', '');

    
    if (hash === 'about' || hash === 'feedback') {
        showSection(hash); 
    } else {
        
        showSection('home'); 
    }
});