let targetQuestions = 60;
let quizQuestions = [];
let userAnswers = {}; 
let currentQuestionIndex = 0;

// --- BANCO DE PALAVRAS TECH EM INGLÊS (Hardcoded) ---

const TECH_VOCABULARY = {
    A: ["Access", "Advanced", "Application", "Authentication", "Algorithm", "Active", "Architecture", "Audit", "Automation", "Address"],
    B: ["Base", "Bit", "Block", "Bridge", "Binary", "Boot", "Backup", "Border", "Bus", "Buffer"],
    C: ["Control", "Computer", "Cyber", "Cloud", "Code", "Cipher", "Cache", "Client", "Connection", "Core", "Common"],
    D: ["Data", "Digital", "Domain", "Disk", "Dynamic", "Device", "Database", "Distributed", "Defense", "Detection"],
    E: ["Electronic", "Encryption", "Enterprise", "Error", "Ethernet", "Exchange", "Extended", "Engine", "External", "Event"],
    F: ["File", "Firewall", "Frame", "Function", "Format", "Firmware", "Frequency", "Filter", "Flow", "Factor"],
    G: ["Gateway", "Global", "Group", "Graphic", "Grid", "Generation", "Generic", "Gigabit", "Guard", "Guide"],
    H: ["Hypertext", "Host", "Hardware", "Hybrid", "Hash", "Header", "High", "Home", "Hub", "Handler"],
    I: ["Internet", "Interface", "Information", "Infrastructure", "Input", "Internal", "Identity", "Image", "Integrity", "Instruction"],
    J: ["Java", "Job", "Join", "Journal", "Junction", "Jump", "Json", "Just", "Kernel", "Key"], // J e K misturados
    K: ["Key", "Kernel", "Keyboard", "Kilo", "Knowledge", "Keep", "Kit"],
    L: ["Layer", "Local", "Link", "Logic", "Language", "Load", "Loop", "List", "Latency", "Log"],
    M: ["Media", "Management", "Memory", "Mode", "Model", "Message", "Module", "Machine", "Mail", "Master"],
    N: ["Network", "Name", "Node", "Native", "Number", "Null", "Next", "Neural", "Noise", "Notification"],
    O: ["Open", "Object", "Output", "Operating", "Option", "Online", "Offset", "Optical", "Order", "Organization"],
    P: ["Protocol", "Public", "Private", "Packet", "Port", "Program", "Process", "Platform", "Power", "Path"],
    Q: ["Query", "Queue", "Quality", "Quick", "Quantum", "Quota", "Quad"],
    R: ["Routing", "Remote", "Resource", "Request", "Root", "Radio", "Read", "Real", "Registry", "Recovery"],
    S: ["System", "Secure", "Service", "Standard", "Server", "Software", "Security", "Shell", "Session", "Switch", "Simple"],
    T: ["Transfer", "Transmission", "Technology", "Terminal", "Time", "Traffic", "Transport", "Token", "Type", "Thread"],
    U: ["User", "Universal", "Unified", "Unit", "Upload", "Update", "Url", "Utility", "Unix"],
    V: ["Virtual", "Video", "Value", "Vector", "Voice", "Variable", "View", "Volume", "Verification", "Version"],
    W: ["Web", "Wireless", "Wide", "Windows", "Work", "Write", "Word", "Wait", "Wave"],
    X: ["Extended", "Extensible", "Exchange", "Xerox", "Xml"],
    Y: ["Yield", "Yaml", "Year"],
    Z: ["Zone", "Zero", "Zip", "Zoom"]
};


document.addEventListener('DOMContentLoaded', () => {
    // Verifica se data.js carregou
    if (typeof fullData === 'undefined' || fullData.length < 4) {
        alert("Erro fatal: data.js não carregado.");
        return;
    }
    
    
    try {
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


function getCleanExpansion(def) { 
    
    return def.split('.')[0].trim() + "."; 
}

function generateFakeAcronym(acronym) {
    let fakeExpansion = "";
  
    const cleanAcronym = acronym.replace(/[^a-zA-Z0-9]/g, ''); 
    
    for (let i = 0; i < cleanAcronym.length; i++) {
        const char = cleanAcronym[i].toUpperCase();
        
      
        if (!isNaN(char)) { 
            fakeExpansion += char + " "; 
            continue; 
        }

      
        const vocabList = TECH_VOCABULARY[char];
        
        if (vocabList && vocabList.length > 0) {
            const randomWord = vocabList[Math.floor(Math.random() * vocabList.length)];
            fakeExpansion += randomWord + " ";
        } else {
            
            fakeExpansion += "System "; 
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

    container.innerHTML = `
        <div class="quiz-card">
            <div class="question-header">
                <span class="question-number">QUESTÃO ${currentQuestionIndex + 1} / ${targetQuestions}</span>
                <h1 class="term-title">${item.term}</h1>
                <p style="margin-top:10px; font-size:0.9rem; color:#888;">Qual o significado correto?</p>
            </div>
            <div class="options-grid">
                ${item.options.map((opt, i) => {
                    // SEM CHEAT: Botão limpo, apenas chama a função de clique
                    return `<button class="option-btn" onclick="handleOptionClick(${i}, this)">${opt}</button>`;
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
    }, 150); 
}

function generateAlternatives(correctItem) {
    const correctExpansion = correctItem.cleanExpansion;
    
  
    let fake1 = generateFakeAcronym(correctItem.term);
    let fake2 = generateFakeAcronym(correctItem.term);
    let fake3 = generateFakeAcronym(correctItem.term);
    
    let safety = 0;
    while ((fake1 === fake2 || fake1 === fake3 || fake2 === fake3 || fake1 === correctExpansion) && safety < 10) {
        fake1 = generateFakeAcronym(correctItem.term);
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
            
            // Mostra o erro detalhado
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

    // Atualiza pontuação na UI
    document.getElementById('score-number').innerText = score;
    document.getElementById('score-total-display').innerText = `/ ${targetQuestions}`;
    
    const percentage = (score / targetQuestions) * 100;
    const certArea = document.getElementById('certificate-area');
    const feedbackMsg = document.getElementById('feedback-msg');

    // Lógica do Certificado (Apenas modo 90 e >= 70%)
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

// --- GERAÇÃO DE CERTIFICADO ---
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
