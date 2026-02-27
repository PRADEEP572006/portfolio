// ── NAVIGATION ──────────────────────────────────────────
function navigateTo(page) {
    const target = document.getElementById('page-' + page);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }

    // collapse mobile menu
    const bsCollapse = document.getElementById('mainNav');
    if (bsCollapse.classList.contains('show')) {
        new bootstrap.Collapse(bsCollapse).hide();
    }
}

// Active link highlighting on scroll
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll(".page-section");
    const navLinks = document.querySelectorAll(".nav-link");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id").replace("page-", "");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// ── CONTACT FORM ─────────────────────────────────────────
function sendMessage(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById('sentMsg').style.display = 'flex';
        e.target.reset();
        btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
        btn.disabled = false;
        setTimeout(() => { document.getElementById('sentMsg').style.display = 'none'; }, 5000);
    }, 1200);
}

// ── CHAT WIDGET ──────────────────────────────────────────
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
let chatOpen = false;
let greetedOnce = false;

const botReplies = {
    "who are you": "Hi! I'm <strong>Pradeep P</strong>, a passionate <strong>Java Full Stack Developer</strong> and IT student at K S Rangasamy College of Technology (2023–2027). I love building tech solutions! 🚀",
    "skill": "My key skills include:<br>• <strong>Languages:</strong> Java, Python, C<br>• <strong>Web:</strong> HTML, CSS, Bootstrap<br>• <strong>DB:</strong> SQL<br>• <strong>Tools:</strong> Flask, OpenCV<br>• <strong>Soft Skills:</strong> Teamwork, Communication",
    "contact": "You can reach me at:<br>📧 <strong>pradeepponnusamy2006@gmail.com</strong><br>📞 <strong>+91 63833 38515</strong><br>Or use the <strong>Contact</strong> page to send a message directly!",
    "project": "My featured projects:<br>🔹 <strong>Smart Attendance System</strong> – AI + Face Recognition + GPS (Python, OpenCV, Flask)<br>🔹 <strong>Portfolio Website</strong> – This very site! (HTML, Bootstrap, JS)",
    "certificate": "I've earned:<br>🏅 NPTEL – Privacy & Security in Online Social Media<br>🏅 Microsoft – Power BI Certification<br>🏅 MSME Patent Applied",
    "hire": "I'm actively looking for internships and opportunities! 🎯<br>Feel free to reach out via the <strong>Contact</strong> page or email me directly.",
    "hello": "Hey there! 👋 I'm Pradeep's portfolio bot. Ask me about his skills, projects, certifications, or how to contact him!",
    "hi": "Hey there! 👋 I'm Pradeep's portfolio bot. Ask me about his skills, projects, certifications, or how to contact him!",
    "education": "📚 Education:<br>• <strong>B.Tech IT</strong> – KSRCT (2023–2027) · CGPA: 7.2%<br>• <strong>HSC</strong> – Sri Vidhya Bharathi · 71%<br>• <strong>SSLC</strong> – Sri Vidhya Bharathi · 100%",
};

function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMsg(text, from) {
    const div = document.createElement('div');
    div.className = 'msg ' + from;
    div.innerHTML = `
      <div class="msg-bubble">${text}</div>
      <div class="msg-time">${getTime()}</div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping(cb) {
    const t = document.createElement('div');
    t.className = 'msg bot';
    t.id = 'typing';
    t.innerHTML = `<div class="msg-bubble typing-indicator"><span></span><span></span><span></span></div>`;
    chatMessages.appendChild(t);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
        const existing = document.getElementById('typing');
        if (existing) existing.remove();
        cb();
    }, 900);
}

function getBotReply(text) {
    const lower = text.toLowerCase();
    for (const [key, val] of Object.entries(botReplies)) {
        if (lower.includes(key)) return val;
    }
    return "I'm not sure about that, but you can check the sections above or send a message via the <strong>Contact</strong> page! 😊";
}

function sendChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMsg(msg, 'user');
    chatInput.value = '';
    document.getElementById('quick-replies').style.display = 'none';
    showTyping(() => addMsg(getBotReply(msg), 'bot'));
}

function quickReply(text) {
    chatInput.value = text;
    sendChat();
}

function toggleChat() {
    chatOpen = !chatOpen;
    if (chatOpen) {
        chatBox.classList.add('open');
        document.querySelector('.chat-badge').style.display = 'none';
        if (!greetedOnce) {
            greetedOnce = true;
            setTimeout(() => {
                addMsg("Hi! 👋 I'm Pradeep's portfolio assistant. Ask me anything!", 'bot');
            }, 300);
        }
        setTimeout(() => chatInput.focus(), 400);
    } else {
        chatBox.classList.remove('open');
    }
}
