// Nik AI Chatbot - Professional Portfolio Assistant
// Powered by Advanced Natural Language Processing

class NikChatbot {
    constructor() {
        this.isOpen = false;
        this.modelPosition = 50;
        this.isWalking = false;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.mixer = null;
        this.walkAnimation = null;
        
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
                    role: "Application Development Associate",
                    company: "Accenture",
                    period: "May 2023 - Present",
                    location: "Bengaluru, India",
                    description: "Working on enterprise-level applications, implementing scalable solutions and collaborating with cross-functional teams."
                },
                {
                    role: "Software Developer Intern",
                    company: "Mashupstack Technology",
                    period: "February 2023 - April 2023",
                    location: "Kochi, India",
                    description: "Gained hands-on experience in web development, worked on real-world projects, and learned industry best practices."
                }
            ],
            projects: [
                {
                    name: "Real Estate - Web Application",
                    description: "Developed a user-friendly online marketplace for property buyers and renters using .NET Core and React.js. The platform offers seamless property listings, search functionality, and modern UI for enhanced user engagement.",
                    technologies: [".NET Core", "React.js", "MySQL"]
                },
                {
                    name: "NoteMarket - Mobile App",
                    description: "Created a mobile application using React Native for Android and iOS platforms, featuring Firebase integration, Redux state management, and RESTful APIs for seamless user experience.",
                    technologies: ["React Native", "Firebase", "Redux"]
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
        this.init3DModel();
        this.startWalkingAnimation();
    }
    
    initElements() {
        this.chatToggle = document.getElementById('nik-chat-toggle');
        this.chatWindow = document.getElementById('nik-chat-window');
        this.closeBtn = document.getElementById('nik-close-chat');
        this.messagesContainer = document.getElementById('nik-chat-messages');
        this.inputField = document.getElementById('nik-chat-input');
        this.sendBtn = document.getElementById('nik-send-btn');
        this.quickBtns = document.querySelectorAll('.nik-quick-btn');
        this.container3D = document.getElementById('nik-3d-container');
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
            return "Yes! Binil is proficient in ASP .NET Core and has completed comprehensive certification in .NET development. He uses it to build scalable web applications and robust backend systems.";
        }
        
        if (this.matchesPattern(lowerQuery, ['react', 'reactjs', 'react.js', 'frontend'])) {
            return "Binil is skilled in React.js for frontend development. He's built several projects including a Real Estate web application and NoteMarket mobile app using React and React Native.";
        }
        
        if (this.matchesPattern(lowerQuery, ['database', 'sql', 'mysql'])) {
            return "Binil works with MySQL and SQL Server for database management. He has hands-on experience in designing database schemas and optimizing queries for performance.";
        }
        
        // Help/Capabilities
        if (this.matchesPattern(lowerQuery, ['help', 'what can you do', 'capabilities', 'how can you help'])) {
            return "I can help you learn about Binil Vincent's:\n• Skills & Technologies\n• Work Experience\n• Projects & Applications\n• Education Background\n• Certifications\n• Achievements (NASA Space Apps!)\n• Contact Information\n\nJust ask me anything!";
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
            "Hi! I'm Nik, Binil's AI assistant. 👋 How can I help you today?",
            "Hello! 👋 I'm here to answer any questions about Binil's skills, experience, and projects. What would you like to know?",
            "Hey there! I'm Nik, ready to tell you all about Binil Vincent. What interests you?",
            "Greetings! I'm Nik, Binil's portfolio assistant. Ask me anything about his work!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    getAboutResponse() {
        const { name, role, description } = this.knowledgeBase.personal;
        return `${name} is a ${role}. ${description}\n\nHe's currently working at Accenture as an Application Development Associate and has strong expertise in full-stack development with technologies like .NET Core, React.js, and Node.js.`;
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
        // Intelligent fallback responses
        const smartResponses = [
            "That's an interesting question! While I'm focused on Binil's portfolio, I can tell you about his skills, projects, experience, or education. What would you like to know?",
            "I'm specialized in discussing Binil Vincent's professional profile. Could you ask about his skills, work experience, projects, or certifications?",
            "I'd love to help! I have detailed information about Binil's technical skills, work history, and achievements. What aspect interests you most?",
            "Great question! Let me help you learn more about Binil. You can ask me about his programming skills, projects he's built, his work at Accenture, or his educational background."
        ];
        
        return smartResponses[Math.floor(Math.random() * smartResponses.length)];
    }
    
    // 3D Model Integration
    init3DModel() {
        try {
            // Setup Three.js scene
            this.scene = new THREE.Scene();
            
            this.camera = new THREE.PerspectiveCamera(
                50,
                this.container3D.clientWidth / this.container3D.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 2.5;
            this.camera.position.y = 0.5;
            
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(this.container3D.clientWidth, this.container3D.clientHeight);
            this.renderer.setClearColor(0x000000, 0);
            this.container3D.appendChild(this.renderer.domElement);
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            this.scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(2, 2, 2);
            this.scene.add(directionalLight);
            
            // Load model
            const loader = new THREE.GLTFLoader();
            loader.load(
                'assets/alien.glb',
                (gltf) => {
                    this.model = gltf.scene;
                    this.model.scale.set(2, 2, 2);
                    this.model.position.y = -0.8;
                    this.scene.add(this.model);
                    
                    console.log('✅ 3D Model loaded successfully!');
                    
                    // Setup animations
                    if (gltf.animations && gltf.animations.length > 0) {
                        this.mixer = new THREE.AnimationMixer(this.model);
                        this.walkAnimation = this.mixer.clipAction(gltf.animations[0]);
                        this.walkAnimation.play();
                    }
                    
                    this.animate();
                },
                (progress) => {
                    const percent = (progress.loaded / progress.total * 100).toFixed(0);
                    console.log(`Loading 3D model: ${percent}%`);
                },
                (error) => {
                    console.error('❌ Error loading 3D model:', error);
                    console.log('Check if assets/alien.glb exists and is accessible');
                }
            );
            
        } catch (error) {
            console.log('3D initialization - continuing without model');
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.mixer) {
            this.mixer.update(0.01);
        }
        
        if (this.model) {
            this.model.rotation.y += 0.005;
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    startWalkingAnimation() {
        setInterval(() => {
            if (!this.isWalking) {
                this.isWalking = true;
                const targetPosition = Math.random() > 0.5 ? 
                    window.innerWidth - 170 : 50;
                
                this.container3D.style.left = targetPosition + 'px';
                
                setTimeout(() => {
                    this.isWalking = false;
                }, 3000);
            }
        }, 8000);
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.nikChatbot = new NikChatbot();
});
