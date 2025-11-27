const roadmapData = [
    {
        phase: "1. Fundamentos de TI (A Base)",
        items: [
            { id: "hw_comp", title: "Hardware", desc: "CPU, RAM, SSD, Motherboard, BIOS/UEFI." },
            { id: "os_basics", title: "Sistemas Operacionais", desc: "Diferenças kernel Windows vs Linux vs MacOS. File Systems (NTFS, EXT4)." },
            { id: "net_basics", title: "Redes Básicas", desc: "LAN, WAN, VPN, ISP, Cabos (Fibra, CAT6) e Topologias." },
            { id: "cli_basics", title: "Linha de Comando", desc: "Navegação básica em Bash (Linux) e CMD/PowerShell (Windows)." }
        ]
    },
    {
        phase: "2. Networking Profundo",
        items: [
            { id: "osi_tcp", title: "Modelos OSI & TCP/IP", desc: "Entender o encapsulamento de dados camada por camada." },
            { id: "protocols_core", title: "Protocolos Core", desc: "TCP, UDP, ICMP, ARP, DHCP, DNS (Registros A, MX, TXT)." },
            { id: "ip_routing", title: "Roteamento & Subnetting", desc: "IPv4/IPv6, CIDR, Máscaras, NAT, Tabelas de Roteamento." },
            { id: "ports_services", title: "Portas & Serviços", desc: "FTP(21), SSH(22), Telnet(23), SMTP(25), DNS(53), HTTP(80), HTTPS(443), SMB(445)." },
            { id: "wireless", title: "Wireless Security", desc: "WPA2 vs WPA3, Handshakes, SSID, Canais." }
        ]
    },
    {
        phase: "3. Linux & Shell Scripting",
        items: [
            { id: "linux_admin", title: "Linux SysAdmin", desc: "Gerenciamento de usuários, permissões (chmod/chown), processos (ps/top), logs (/var/log)." },
            { id: "distros", title: "Distros de Segurança", desc: "Kali Linux, Parrot OS (Instalação e customização)." },
            { id: "script_bash", title: "Bash Scripting", desc: "Automação essencial, pipes, grep, awk, sed para análise de logs e rotinas." }
        ]
    },
    {
        phase: "4. Habilidades de Programação (DevSec)",
        items: [
            { id: "prog_python", title: "Python", desc: "A linguagem #1 para Cyber. Bibliotecas: Scapy (Rede), Requests (Web), Socket (Conexões)." },
            { id: "prog_golang", title: "Go (Golang)", desc: "Alta performance e concorrência. Usado para criar ferramentas rápidas de scan e exploits." },
            { id: "prog_js", title: "JavaScript", desc: "Essencial para entender XSS, ataques Client-side e segurança em aplicações Node.js." },
            { id: "prog_cpp", title: "C/C++", desc: "Fundamental para Engenharia Reversa, Análise de Malware e exploração de memória (Buffer Overflow)." },
            { id: "prog_powershell", title: "PowerShell", desc: "Automação avançada no Windows, movimentação lateral e scripts de administração." }
        ]
    },
    {
        phase: "5. Segurança de Aplicações Web",
        items: [
            { id: "web_http", title: "Protocolo HTTP/S", desc: "Métodos (GET, POST), Cabeçalhos, Cookies, Status Codes (200, 404, 500)." },
            { id: "owasp_top10", title: "OWASP Top 10", desc: "SQL Injection, XSS, IDOR, Security Misconfiguration, Broken Auth." },
            { id: "web_tools", title: "Ferramentas Web", desc: "Burp Suite (Interceptação), OWASP ZAP, Dirbuster/Gobuster." },
            { id: "secure_code", title: "DevSecOps", desc: "Conceitos de SAST (Static Analysis), DAST (Dynamic Analysis) e codificação segura." }
        ]
    },
    {
        phase: "6. Segurança Ofensiva (Red Team)",
        items: [
            { id: "recon", title: "Reconhecimento (Recon)", desc: "OSINT, Google Dorks, Shodan, Whois, DNS Enum." },
            { id: "scanning", title: "Scanning & Enumeração", desc: "Nmap (Scripts NSE), Masscan, Enumerar SMB/RPC." },
            { id: "exploitation", title: "Exploração", desc: "Metasploit Framework, Searchsploit, CVEs, Shells Reversos." },
            { id: "priv_esc", title: "Privilege Escalation", desc: "Linux (Kernel exploits, SUID) e Windows (Token impersonation)." },
            { id: "social_eng", title: "Engenharia Social", desc: "Phishing, Spear Phishing, Vishing, Pretexting." }
        ]
    },
    {
        phase: "7. Segurança Defensiva (Blue Team)",
        items: [
            { id: "def_hardening", title: "Hardening de Sistemas", desc: "CIS Benchmarks, GPOs, Desabilitar serviços inúteis, Patching." },
            { id: "def_firewall", title: "Firewalls & WAF", desc: "Iptables, pfSense, Regras de entrada/saída, WAF (ModSecurity)." },
            { id: "def_siem", title: "SIEM & Monitoramento", desc: "Splunk, ELK Stack, Wazuh. Correlação de logs e alertas." },
            { id: "def_ids", title: "IDS / IPS", desc: "Snort, Suricata. Detecção baseada em assinatura vs comportamento." },
            { id: "threat_intel", title: "Threat Intelligence", desc: "Feeds de ameaças, IOCs (Indicadores de Comprometimento), TTPs." }
        ]
    },
    {
        phase: "8. Criptografia",
        items: [
            { id: "crypto_concepts", title: "Conceitos", desc: "Simétrica (AES) vs Assimétrica (RSA). Hashing (MD5, SHA)." },
            { id: "pki", title: "PKI & Certificados", desc: "Public Key Infrastructure, CA, Certificados X.509, Cadeia de Confiança." },
            { id: "crypto_proto", title: "Protocolos Seguros", desc: "SSL/TLS Handshake, SSH, VPN (IPSec/OpenVPN)." }
        ]
    },
    {
        phase: "9. Gestão de Identidade (IAM)",
        items: [
            { id: "iam_ad", title: "Active Directory", desc: "Domínios, Florestas, Kerberos, LDAP, Group Policy." },
            { id: "iam_auth", title: "Autenticação", desc: "MFA/2FA, SAML, OAuth 2.0, OIDC, SSO." },
            { id: "iam_access", title: "Controle de Acesso", desc: "RBAC (Role-Based), ABAC, Princípio do Menor Privilégio." }
        ]
    },
    {
        phase: "10. Cloud Skills & Security",
        items: [
            { id: "cloud_services", title: "Serviços de Nuvem", desc: "Entender SaaS, PaaS, IaaS e suas diferenças de segurança." },
            { id: "cloud_models", title: "Modelos de Nuvem", desc: "Privada, Pública e Híbrida." },
            { id: "cloud_providers", title: "Ambientes Comuns", desc: "AWS (Amazon), GCP (Google), Azure (Microsoft)." },
            { id: "cloud_storage", title: "Storage na Nuvem", desc: "S3 Buckets, Dropbox, OneDrive - Riscos de exposição de dados." },
            { id: "cloud_concepts", title: "Conceitos Chave", desc: "Segurança na Nuvem vs On-Prem, Infraestrutura como Código (IaC), Serverless." }
        ]
    },
    {
        phase: "11. Governança, Risco e Compliance (GRC)",
        items: [
            { id: "grc_standards", title: "Frameworks", desc: "NIST CSF, ISO 27001, CIS Controls, MITRE ATT&CK." },
            { id: "grc_laws", title: "Leis e Regulações", desc: "GDPR (Europa), LGPD (Brasil), PCI-DSS (Cartões), HIPAA." },
            { id: "risk_mgmt", title: "Gestão de Risco", desc: "Análise de risco, Business Continuity Plan (BCP), Disaster Recovery (DRP)." }
        ]
    },
    {
        phase: "12. Carreira & Certificações",
        items: [
            { id: "cert_start", title: "Nível Iniciante", desc: "CompTIA Security+, Network+, eJPT." },
            { id: "cert_mid", title: "Nível Intermediário", desc: "CEH, CySA+, PenTest+, GSEC, PNPT." },
            { id: "cert_expert", title: "Nível Avançado", desc: "OSCP (Offensive), CISSP (Gestão), CISM, CISA." }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderRoadmap();
    updateProgress();
});

function renderRoadmap() {
    const root = document.getElementById('timeline-root');
    const savedProgress = JSON.parse(localStorage.getItem('roadmap_progress')) || [];

    root.innerHTML = "";

    roadmapData.forEach(group => {
        const phaseHeader = document.createElement('div');
        phaseHeader.className = 'phase-header';
        
        // CORREÇÃO AQUI: Fechamento correto da string e interpolação da variável
        phaseHeader.innerHTML = `<span>${group.phase}</span>`;
        
        // Estilos separados corretamente
        phaseHeader.style.color = 'var(--text-secondary)';
        phaseHeader.style.marginTop = '50px';
        phaseHeader.style.marginBottom = '20px';
        phaseHeader.style.fontFamily = "'JetBrains Mono', monospace";
        phaseHeader.style.fontSize = '1.3rem';
        phaseHeader.style.borderBottom = '1px solid var(--border)';
        phaseHeader.style.paddingBottom = '10px';
        phaseHeader.style.textTransform = 'uppercase';
        phaseHeader.style.letterSpacing = '1px';
        
        root.appendChild(phaseHeader);

        group.items.forEach(item => {
            const isDone = savedProgress.includes(item.id);
            
            const node = document.createElement('div');
            node.className = `node ${isDone ? 'done' : ''}`;
            node.onclick = (e) => toggleNode(item.id, node, e);

            node.innerHTML = `
                <div class="node-content">
                    <div class="node-header">
                        <div class="node-title">${item.title}</div>
                        <div class="custom-checkbox">
                            <svg class="check-icon" viewBox="0 0 24 24">
                                <path d="M20.285 2l-11.285 11.561-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="node-desc">${item.desc}</div>
                </div>
            `;
            root.appendChild(node);
        });
    });
}

function toggleNode(id, element, event) {
    let progress = JSON.parse(localStorage.getItem('roadmap_progress')) || [];
    
    // Checkbox visual logic (opcional se quiser usar o elemento interno)
    const checkbox = element.querySelector('.custom-checkbox');

    if (progress.includes(id)) {
        progress = progress.filter(pid => pid !== id);
        element.classList.remove('done');
    } else {
        progress.push(id);
        element.classList.add('done');
    }

    localStorage.setItem('roadmap_progress', JSON.stringify(progress));
    updateProgress();
}

function updateProgress() {
    const progress = JSON.parse(localStorage.getItem('roadmap_progress')) || [];
    let totalItems = 0;
    roadmapData.forEach(g => totalItems += g.items.length);

    if (totalItems === 0) return;

    const percent = Math.round((progress.length / totalItems) * 100);
    
    const percentEl = document.getElementById('progress-percent');
    const fillEl = document.getElementById('progress-fill');
    
    if (percentEl) percentEl.innerText = `${percent}%`;
    if (fillEl) fillEl.style.width = `${percent}%`;
}