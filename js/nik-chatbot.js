// Nik AI Chatbot - Professional Portfolio Assistant
// Powered by Advanced Natural Language Processing

class NikChatbot {
    constructor() {
        this.isOpen = false;
        
        // Portfolio Knowledge Base
        this.knowledgeBase = {
            personal: {
                name: "Binil Vincent",
                role: "Software Engineer",
                description: "Dedicated Software Engineer with hands-on experience in developing scalable web applications and robust backend systems. Skilled in writing clean, maintainable code to ensure long-term efficiency and ease of debugging.",
                location: "Kerala, India",
                education: [
                    {
                        degree: "Master of Computer Applications (MCA)",
                        institution: "St. Joseph's College of Engineering and Technology",
                        period: "2024 - 2026",
                        location: "Palai, KTU, Kerala"
                    },
                    {
                        degree: "Bachelor of Computer Applications (BCA)",
                        institution: "Mar Augusthinese College",
                        period: "2019 - 2022",
                        location: "Ramapuram, Mahatma Gandhi University, Kottayam"
                    },
                    {
                        degree: "Higher Secondary Education",
                        institution: "Government Higher Secondary School",
                        period: "2017 - 2019",
                        location: "Kadappoor"
                    }
                ]
            },
            skills: {
                technologies: ["ASP .NET Core", "Node JS", "Spring Boot", "React JS"],
                databases: ["MySQL", "SQL Server"],
                tools: ["GitHub", "GitLab", "xUnit", "Jest", "Agile", "Waterfall", "Windows", "Linux"],
                softSkills: ["Observation", "Communication", "Multi-tasking", "Decision Making"]
            },
            experience: [
                {
                    role: "Associate Software Engineer",
                    company: "Innovature Software Labs",
                    period: "Present",
                    location: "Kakkanad, Kochi",
                    description: "Leading software development projects and teams. Designing, developing, and maintaining software systems while collaborating with project managers to establish specifications."
                }
            ],
            projects: [
                {
                    name: "Real Estate - Web Application",
                    description: "Developed a user-friendly online marketplace for property buyers and renters, offering seamless property listings, search functionality, and modern UI.",
                    technologies: [".NET Core", "React.js", "MySQL"]
                },
                {
                    name: "Doctor Appointment Booking System",
                    description: "Developed a full-stack web app to streamline appointment scheduling. Users can browse doctors by specialty, view availability, and book slots in real time.",
                    technologies: ["Node.js", "React.js", "MongoDB"]
                },
                {
                    name: "Marketplace - Web Application",
                    description: "Built an e-commerce platform replicating core functionalities of Flipkart. Enables users to buy and sell products, with integrated agent support for order delivery.",
                    technologies: [".NET Core", "React.js", "SQL Server"]
                }
            ],
            certifications: [
                {
                    name: "Complete .NET Developer",
                    organization: "Udemy",
                    description: "Comprehensive course covering ASP.NET Core, Entity Framework, and modern web development practices"
                },
                {
                    name: "AWS Cloud Practitioner",
                    organization: "AWS Skill Builder",
                    description: "Foundational understanding of AWS Cloud concepts, services, and architecture"
                }
            ],
            achievements: [
                {
                    title: "NASA Space Apps Challenge 2025 - Top 10",
                    description: "Secured Top 10 position in NASA Space Apps Challenge held at Amal Jyothi College of Engineering (October 4-5, 2025). Galactic Problem Solver award for innovative space-related solution.",
                    date: "October 2025"
                }
            ],
            contact: {
                email: "binil@example.com",
                linkedin: "LinkedIn Profile",
                github: "GitHub Profile",
                location: "Kerala, India"
            }
        };
        
        this.init();
    }
    
    init() {
        this.initElements();
        this.initEventListeners();
    }
    
    initElements() {
        this.chatToggle = document.getElementById('nik-chat-toggle');
        this.chatWindow = document.getElementById('nik-chat-window');
        this.closeBtn = document.getElementById('nik-close-chat');
        this.messagesContainer = document.getElementById('nik-chat-messages');
        this.inputField = document.getElementById('nik-chat-input');
        this.sendBtn = document.getElementById('nik-send-btn');
        this.quickBtns = document.querySelectorAll('.nik-quick-btn');
    }
    
    initEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                this.inputField.value = query;
                this.sendMessage();
            });
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatWindow.classList.toggle('nik-chat-hidden');
        
        if (this.isOpen) {
            this.inputField.focus();
        }
    }
    
    sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.inputField.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and respond
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.processQuery(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `nik-message nik-${type}-message`;
        
        messageDiv.innerHTML = `
            <div class="nik-message-avatar"></div>
            <div class="nik-message-content">
                ${this.formatMessage(text)}
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    formatMessage(text) {
        // Split text into paragraphs if it contains line breaks
        const paragraphs = text.split('\n').filter(p => p.trim());
        return paragraphs.map(p => `<p>${p}</p>`).join('');
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'nik-message nik-bot-message nik-typing';
        typingDiv.innerHTML = `
            <div class="nik-message-avatar"></div>
            <div class="nik-message-content">
                <div class="nik-typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    removeTypingIndicator() {
        const typing = this.messagesContainer.querySelector('.nik-typing');
        if (typing) typing.remove();
    }
    
    processQuery(query) {
        const lowerQuery = query.toLowerCase();
        
        // Greeting responses
        if (this.matchesPattern(lowerQuery, ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening'])) {
            return this.getGreetingResponse();
        }
        
        // About Binil
        if (this.matchesPattern(lowerQuery, ['who is', 'about binil', 'tell me about him', 'about himself'])) {
            return this.getAboutResponse();
        }
        
        // Skills
        if (this.matchesPattern(lowerQuery, ['skill', 'technology', 'tech stack', 'programming', 'languages', 'tools'])) {
            return this.getSkillsResponse();
        }
        
        // Experience
        if (this.matchesPattern(lowerQuery, ['experience', 'work', 'job', 'employment', 'career', 'company', 'worked'])) {
            return this.getExperienceResponse();
        }
        
        // Projects
        if (this.matchesPattern(lowerQuery, ['project', 'built', 'developed', 'created', 'application'])) {
            return this.getProjectsResponse();
        }
        
        // Education
        if (this.matchesPattern(lowerQuery, ['education', 'degree', 'study', 'college', 'university', 'qualification'])) {
            return this.getEducationResponse();
        }
        
        // Certifications
        if (this.matchesPattern(lowerQuery, ['certification', 'certificate', 'course', 'certified'])) {
            return this.getCertificationsResponse();
        }
        
        // Achievements
        if (this.matchesPattern(lowerQuery, ['achievement', 'award', 'nasa', 'hackathon', 'win', 'prize'])) {
            return this.getAchievementsResponse();
        }
        
        // Contact
        if (this.matchesPattern(lowerQuery, ['contact', 'email', 'reach', 'linkedin', 'github', 'phone'])) {
            return this.getContactResponse();
        }
        
        // Specific tech questions
        if (this.matchesPattern(lowerQuery, ['.net', 'dotnet', 'asp.net', 'c#'])) {
            return "ACCESS GRANTED: Binil is highly proficient in ASP .NET Core. He uses it to build scalable web applications and robust backend systems like his Real Estate and Marketplace platforms.";
        }
        
        if (this.matchesPattern(lowerQuery, ['react', 'reactjs', 'react.js', 'frontend'])) {
            return "AFFIRMATIVE: Binil is exceptionally skilled in React.js for frontend architecture. He's built several major projects including a Real Estate web application and a Doctor Appointment Booking System using React components.";
        }
        
        if (this.matchesPattern(lowerQuery, ['database', 'sql', 'mysql', 'mongodb'])) {
            return "SYSTEM LOG: Binil works natively with MySQL, SQL Server, and MongoDB for database management. He has hands-on experience in designing complex schemas and optimizing queries for high-performance data retrieval.";
        }
        
        // Help/Capabilities
        if (this.matchesPattern(lowerQuery, ['help', 'what can you do', 'capabilities', 'how can you help', 'menu'])) {
            return "SYSTEM INITIALIZED. I can retrieve Binil Vincent's records regarding:\n\n> SKILLS [Technology Stack]\n> EXPERIENCE [Work History]\n> PROJECTS [Software Built]\n> EDUCATION [Academic Record]\n> AWARDS [NASA Hackathon]\n> CONTACT [Comm-Link]\n\nInput your query below.";
        }
        
        // Thanks
        if (this.matchesPattern(lowerQuery, ['thank', 'thanks', 'appreciate'])) {
            return "You're welcome! Feel free to ask if you have any other questions about Binil's portfolio. 😊";
        }
        
        // Default intelligent response
        return this.getSmartResponse(query);
    }
    
    matchesPattern(query, patterns) {
        return patterns.some(pattern => query.includes(pattern));
    }
    
    getGreetingResponse() {
        const greetings = [
            "SYSTEM ONLINE. I'm Nik, Binil Vincent's AI proxy. How can I assist you today?",
            "COMM-LINK ESTABLISHED. 👋 I am authorized to share data regarding Binil's technical engineering skills and projects. Query?",
            "HELLO. I am the NIK AI Terminal. I can retrieve Binil's professional records. What file do you need?",
            "GREETINGS USER. I am Nik, Binil's integrated portfolio AI. Ask me about his tech stack or experience!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    getAboutResponse() {
        const { name, role, description } = this.knowledgeBase.personal;
        return `FILE LOCATED: ${name} is a ${role}.\n\n${description}\n\nHe is currently engineering logic at Innovature Software Labs in Kakkanad, Kochi. He holds command over full-stack systems with strong expertise in .NET Core, React.js, Node.js, and Spring Boot.`;
    }
    
    getSkillsResponse() {
        const { technologies, databases, tools, softSkills } = this.knowledgeBase.skills;
        return `Binil has a comprehensive skill set:\n\n💻 Technologies: ${technologies.join(', ')}\n\n🗄️ Databases: ${databases.join(', ')}\n\n🛠️ Tools: ${tools.slice(0, 6).join(', ')}\n\n👥 Soft Skills: ${softSkills.join(', ')}\n\nHe's particularly strong in full-stack development and follows clean code principles!`;
    }
    
    getExperienceResponse() {
        const experiences = this.knowledgeBase.experience;
        let response = "Here's Binil's professional experience:\n\n";
        
        experiences.forEach((exp, index) => {
            response += `${index + 1}. ${exp.role} at ${exp.company}\n`;
            response += `   📅 ${exp.period} | 📍 ${exp.location}\n`;
            response += `   ${exp.description}\n\n`;
        });
        
        return response.trim();
    }
    
    getProjectsResponse() {
        const projects = this.knowledgeBase.projects;
        let response = "Binil has worked on several impressive projects:\n\n";
        
        projects.forEach((project, index) => {
            response += `${index + 1}. ${project.name}\n`;
            response += `   ${project.description}\n`;
            response += `   Tech Stack: ${project.technologies.join(', ')}\n\n`;
        });
        
        return response.trim();
    }
    
    getEducationResponse() {
        const education = this.knowledgeBase.personal.education;
        let response = "Binil's educational background:\n\n";
        
        education.forEach((edu, index) => {
            response += `${index + 1}. ${edu.degree}\n`;
            response += `   ${edu.institution}\n`;
            response += `   ${edu.period} | ${edu.location}\n\n`;
        });
        
        return response.trim();
    }
    
    getCertificationsResponse() {
        const certs = this.knowledgeBase.certifications;
        let response = "Binil has earned several professional certifications:\n\n";
        
        certs.forEach((cert, index) => {
            response += `${index + 1}. ${cert.name}\n`;
            response += `   Organization: ${cert.organization}\n`;
            response += `   ${cert.description}\n\n`;
        });
        
        return response.trim();
    }
    
    getAchievementsResponse() {
        const achievements = this.knowledgeBase.achievements;
        let response = "Binil's notable achievements:\n\n";
        
        achievements.forEach((achievement, index) => {
            response += `🏆 ${achievement.title}\n`;
            response += `${achievement.description}\n`;
            response += `Date: ${achievement.date}\n\n`;
        });
        
        return response.trim();
    }
    
    getContactResponse() {
        return "You can reach out to Binil through:\n\n📧 Use the contact form on this portfolio\n💼 Connect on LinkedIn\n💻 Check out his GitHub profile\n📍 Based in Kerala, India\n\nScroll to the contact section to send him a message!";
    }
    
    getSmartResponse(query) {
        // Intelligent fallback responses tailored to the Cyber theme
        const smartResponses = [
            "QUERY UNRECOGNIZED: While my database is extensive, I require specific parameters. Please query me about Binil's SKILSS, PROJECTS, or EXPERIENCE.",
            "PROCESSING ERROR: I am specifically calibrated to discuss Binil Vincent's professional engineering profile. Could you ask about his tech stack or awards?",
            "DATA RETRIEVAL: I am a specialized AI terminal. Try extracting data on Binil's 'NASA Hackathon', 'Education', or 'Contact Info'.",
            "AWAITING INPUT: I can scan my records for Binil's programming architectures, React framework builds, or database management skills. What shall I search?"
        ];
        
        return smartResponses[Math.floor(Math.random() * smartResponses.length)];
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.nikChatbot = new NikChatbot();
});
