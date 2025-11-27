
let targetQuestions = 60;
let quizQuestions = [];
let userAnswers = {}; 
let currentQuestionIndex = 0;
let wordDictionary = {}; 

const BLOCKLIST = ["EUA", "USA", "BRASIL", "EX", "PING", "COM", "PARA", "DOS", "DAS", "UMA", "UM", "QUE", "SAO", "NAO", "ETC", "CHIP", "VIA", "CLI", "APP", "APPS", "WEB", "USB", "LOGS", "LIST"];


document.addEventListener('DOMContentLoaded', () => {
    if (typeof fullData === 'undefined' || fullData.length < 4) {
        alert("Erro fatal: data.js não carregado.");
        return;
    }
    try {
        buildWordDictionary(); 
        fullData.forEach(item => {
            item.cleanExpansion = getCleanExpansion(item.def); 
            item.fullDef = item.def;
        });
    } catch (e) { console.error(e); }
});


window.initQuiz = function(amount) {
    targetQuestions = amount;
    
    
    const lobby = document.getElementById('quiz-lobby');
    const game = document.getElementById('game-ui');
    
    if (lobby && game) {
        lobby.classList.add('hidden');
        game.classList.remove('hidden');
        startQuiz();
    }
}


function getCleanExpansion(def) { return def.split('.')[0].trim() + "."; }
function toTitleCase(word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }

function buildWordDictionary() {
    fullData.forEach(item => {
        const expansion = item.def.split('.')[0]; 
        const words = expansion.split(/[\s\-\/]+/);
        words.forEach(word => {
            let cleanWord = word.replace(/[().,;:"']/g, '');
            if (cleanWord.length > 2 && !BLOCKLIST.includes(cleanWord.toUpperCase())) {
                const firstLetter = cleanWord.charAt(0).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                if (!wordDictionary[firstLetter]) wordDictionary[firstLetter] = new Set(); 
                wordDictionary[firstLetter].add(toTitleCase(cleanWord));
            }
        });
    });
}

function generateFakeAcronym(acronym) {
    let fakeExpansion = "";
    const cleanAcronym = acronym.replace(/[^a-zA-Z0-9]/g, ''); 
    for (let i = 0; i < cleanAcronym.length; i++) {
        const char = cleanAcronym[i].toUpperCase();
        if (!isNaN(char)) { fakeExpansion += char + " "; continue; }
        if (wordDictionary[char] && wordDictionary[char].size > 0) {
            const wordsArray = Array.from(wordDictionary[char]);
            const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
            fakeExpansion += randomWord + " ";
        } else {
            if (char === 'X') fakeExpansion += "Extended ";
            else if (char === 'Z') fakeExpansion += "Zone ";
            else fakeExpansion += "Secure "; 
        }
    }
    return fakeExpansion.trim() + ".";
}


function startQuiz() {
    const shuffledData = [...fullData].sort(() => 0.5 - Math.random());
    quizQuestions = shuffledData.slice(0, targetQuestions);
    
    quizQuestions.forEach(item => {
        item.options = generateAlternatives(item);
    });

    currentQuestionIndex = 0;
    renderQuestion(); 
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const item = quizQuestions[currentQuestionIndex];
    
    const progressPercent = ((currentQuestionIndex) / targetQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    
    const correctAns = item.cleanExpansion;

    container.innerHTML = `
        <div class="quiz-card">
            <div class="question-header">
                <span class="question-number">QUESTÃO ${currentQuestionIndex + 1} / ${targetQuestions}</span>
                <h1 class="term-title">${item.term}</h1>
                <p style="margin-top:10px; font-size:0.9rem; color:#888;">Qual o significado correto?</p>
            </div>
            <div class="options-grid">
                ${item.options.map((opt, i) => {
                    
                    const isCorrect = opt === correctAns;
                    const debugStyle = isCorrect ? 'style="border: 2px solid #00ff41; color: #00ff41; font-weight:bold;"' : '';
                    const debugText = isCorrect ? ' [CORRETA]' : '';
                    
                    return `<button class="option-btn" ${debugStyle} onclick="handleOptionClick(${i}, this)">${opt}${debugText}</button>`;
                }).join('')}
            </div>
        </div>
    `;
}

function handleOptionClick(optionIndex, btnElement) {
    btnElement.classList.add('clicked');
    userAnswers[currentQuestionIndex] = optionIndex;
    
    setTimeout(() => {
        if (currentQuestionIndex < targetQuestions - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    }, 100); 
}

function generateAlternatives(correctItem) {
    const correctExpansion = correctItem.cleanExpansion;
    let fake1 = generateFakeAcronym(correctItem.term);
    let fake2 = generateFakeAcronym(correctItem.term);
    let fake3 = generateFakeAcronym(correctItem.term);
    
    let safety = 0;
    while ((fake1 === fake2 || fake1 === fake3 || fake2 === fake3) && safety < 10) {
        fake2 = generateFakeAcronym(correctItem.term);
        fake3 = generateFakeAcronym(correctItem.term);
        safety++;
    }
    return [fake1, fake2, fake3, correctExpansion].sort(() => 0.5 - Math.random());
}

function finishQuiz() {
    document.getElementById('progress-bar').style.width = '100%';
    let score = 0;
    const detailsContainer = document.getElementById('detailed-results');
    detailsContainer.innerHTML = '<h3>Relatório de Erros:</h3>';

    let hasErrors = false;
    quizQuestions.forEach((item, index) => {
        const userSelectedOptIndex = userAnswers[index];
        const userSelectedText = item.options[userSelectedOptIndex];
        const correctExpansion = item.cleanExpansion;

        if (userSelectedText === correctExpansion) {
            score++;
        } else {
            hasErrors = true;
            const userAnswerLabel = userSelectedText ? userSelectedText : "Não respondida";
            detailsContainer.innerHTML += `
                <div class="result-item">
                    <strong>${item.term}</strong><br>
                    <span class="wrong-txt">❌ Sua: ${userAnswerLabel}</span>
                    <span class="correct-txt">✅ Correta: ${item.fullDef}</span>
                </div>
            `;
        }
    });

    if(!hasErrors) detailsContainer.innerHTML += "<p style='color:var(--accent); margin-top:10px;'>Nenhum erro! Perfeito.</p>";

    document.getElementById('score-number').innerText = score;
    document.getElementById('score-total-display').innerText = `/ ${targetQuestions}`;
    
    const percentage = (score / targetQuestions) * 100;
    

    const certArea = document.getElementById('certificate-area');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (targetQuestions === 90 && percentage >= 70) {
        certArea.classList.remove('hidden');
        feedbackMsg.innerHTML = "Parabéns!<br>Você atingiu o índice para certificação.";
        feedbackMsg.style.color = "#ffd700"; 
    } else {
        certArea.classList.add('hidden');
        feedbackMsg.style.color = "#8b949e";
        
        if (percentage >= 80) feedbackMsg.innerText = "Excelente desempenho!";
        else if (percentage >= 60) feedbackMsg.innerText = "Bom, mas estude mais.";
        else feedbackMsg.innerText = "Resultado insuficiente.";
    }
    
    document.getElementById('result-modal').classList.remove('hidden');
}


window.generateCertificate = function() {
    const nameInput = document.getElementById('student-name').value;
    
    if (!nameInput || nameInput.trim() === "") {
        alert("Por favor, digite seu nome.");
        return;
    }

  
    const payload = {
        n: nameInput.trim().toUpperCase(), 
        d: new Date().toLocaleDateString('pt-BR'), 
        s: "ELITE" 
    };

    
    const jsonString = JSON.stringify(payload);

    
    const smartID = btoa(encodeURIComponent(jsonString));

   
    localStorage.setItem('cert_name', payload.n);
    localStorage.setItem('cert_date', payload.d);
    localStorage.setItem('cert_id', "CF-" + smartID); 

    window.location.href = 'certificate.html';
}