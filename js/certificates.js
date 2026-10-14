/**
 * Futuristic Holographic Certificates & Credential Engine
 * Manages certificate state, hologram rendering, carousel navigation, interactive modal,
 * and responsive multi-card grid view with 100% genuine Google Drive links.
 */

(function () {
    'use strict';

    // Comprehensive Certificate Dataset
    // 10 Genuine Verified Certificates Dataset with Original Google Drive Links
    // Cross-checked against ground truth credentials (index.html.backup) - NO dummy/placeholder certificates.
    const certificatesData = [
        {
            number: "01",
            issuer: "SJCET PALAI",
            issuerName: "St. Joseph's College of Engineering & Technology",
            issuerDept: "Department of Computer Applications • Palai, Kerala",
            category: "tech",
            title: "Essential Computer Skills: Office Tools & IT Fundamentals",
            badgeType: "35-HOUR INTENSIVE COURSE",
            date: "2025",
            certId: "SJCET-ECS-2025-01",
            icon: "fa-laptop-code",
            themeColor: "#00f2fe",
            themeGlow: "rgba(0, 242, 254, 0.42)",
            themeGlowInner: "rgba(0, 242, 254, 0.12)",
            skills: ["Office Productivity", "IT Fundamentals", "Data Management", "Computer Systems"],
            description: "35-hour intensive foundational program covering workplace computing essentials, office productivity toolsets, digital data management, and fundamental information technology principles.",
            link: "https://drive.google.com/file/d/1kMnI7slNXlUXc2msZsPgj6J_xZ-ZOd9g/view?usp=sharing"
        },
        {
            number: "02",
            issuer: "SJCET PALAI",
            issuerName: "St. Joseph's College of Engineering & Technology",
            issuerDept: "Dept. of Computer Applications • MCA Program",
            category: "tech",
            title: "Object-Oriented Programming Essentials",
            badgeType: "MCA PROGRAM CERTIFICATION",
            date: "2025",
            certId: "SJCET-OOP-MCA-2025",
            icon: "fa-code",
            themeColor: "#6366f1",
            themeGlow: "rgba(99, 102, 241, 0.45)",
            themeGlowInner: "rgba(99, 102, 241, 0.12)",
            skills: ["Object-Oriented Programming", "Java Architecture", "Design Patterns", "Software Engineering"],
            description: "Advanced academic coursework in Object-Oriented Programming architecture, design patterns, polymorphism, encapsulation, and modular software engineering principles under the SJCET MCA curriculum.",
            link: "https://drive.google.com/file/d/1mOv0zz4njb3y6Nu37_TMj2TAS6Dk3Bor/view?usp=sharing"
        },
        {
            number: "03",
            issuer: "NPTEL / IIT",
            issuerName: "IIT Kharagpur",
            issuerDept: "NPTEL Online Certification • Ministry of Education, Govt. of India",
            category: "tech",
            title: "Industry 4.0 & Industrial Internet of Things",
            badgeType: "ELITE CERTIFICATION (SCORE: 77%)",
            date: "Oct 2025",
            certId: "NPTEL25CS-IIOT-77",
            icon: "fa-microchip",
            themeColor: "#10b981",
            themeGlow: "rgba(16, 185, 129, 0.45)",
            themeGlowInner: "rgba(16, 185, 129, 0.12)",
            skills: ["Industrial IoT Protocols", "Smart Sensors", "Cyber-Physical Systems", "Edge Computing"],
            description: "Elite national certification (Score: 77%) completed through IIT Kharagpur, covering industrial sensor telemetry, cyber-physical architectures, smart manufacturing automation, and IIoT protocols.",
            link: "https://drive.google.com/file/d/1KDZHFyCmHsnH9iLfeaOHD1MF86e3IV5j/view?usp=sharing"
        },
        {
            number: "04",
            issuer: "RED HAT",
            issuerName: "Red Hat Academy",
            issuerDept: "ipsr solutions • Industry Training Partner",
            category: "tech",
            title: "AI-Integrated Cloud & DevOps Workshop",
            badgeType: "TECHNICAL WORKSHOP",
            date: "Aug 2025",
            certId: "RH-IPSR-DEVOPS-2025",
            icon: "fa-brands fa-redhat",
            themeColor: "#ee0000",
            themeGlow: "rgba(238, 0, 0, 0.45)",
            themeGlowInner: "rgba(238, 0, 0, 0.12)",
            skills: ["Red Hat Enterprise Linux", "Cloud DevOps", "Containerization", "CI/CD Automation"],
            description: "Hands-on technical workshop focused on AI-integrated cloud deployment pipelines, containerization workflows, Linux kernel infrastructure, and enterprise DevOps automation.",
            link: "https://drive.google.com/file/d/18U3X6JmA2y6-dWPCF9FJU2dZbJ-NrA57/view?usp=sharing"
        },
        {
            number: "05",
            issuer: "K-DISC",
            issuerName: "Kerala Development & Innovation Strategic Council",
            issuerDept: "Young Innovators Program (YIP 7.0) • Govt. of Kerala",
            category: "tech",
            title: "Voice of Stakeholder (VOS) Training",
            badgeType: "YIP 7.0 INNOVATION PROGRAM",
            date: "Jul 2025",
            certId: "KDISC-YIP7-VOS-2025",
            icon: "fa-user-check",
            themeColor: "#14b8a6",
            themeGlow: "rgba(20, 184, 166, 0.45)",
            themeGlowInner: "rgba(20, 184, 166, 0.12)",
            skills: ["Stakeholder Research", "Design Thinking", "Problem Validation", "Human-Centered Design"],
            description: "Trained under Young Innovators Program (YIP 7.0) by K-DISC in user interview methodologies, stakeholder requirement elicitation, and human-centered design validation.",
            link: "https://drive.google.com/file/d/1K4FzBIGXjhBqnPuVf5NWZ7wnWZMZzHhD/view?usp=sharing"
        },
        {
            number: "06",
            issuer: "NASA",
            issuerName: "NASA Space Apps Challenge Global",
            issuerDept: "Global Organizing Team • Washington D.C., USA",
            category: "hackathon",
            title: "Galactic Problem Solver",
            badgeType: "GLOBAL RECOGNITION",
            date: "Oct 4-5, 2025",
            certId: "NASA-GPS-2025-0104",
            icon: "fa-rocket",
            themeColor: "#00f2fe",
            themeGlow: "rgba(0, 242, 254, 0.45)",
            themeGlowInner: "rgba(0, 242, 254, 0.15)",
            skills: ["NASA Open Data", "Exoplanet Hunting", "Light-Curve Analysis", "Machine Learning"],
            description: "Awarded international Galactic Problem Solver honors for building the Exoplanet Detection System analyzing Kepler star brightness light curves to detect candidate exoplanetary transits.",
            link: "https://drive.google.com/file/d/1T9JEiZ14FvEzQec9FGEqSUyA_olEGNYM/view?usp=sharing"
        },
        {
            number: "07",
            issuer: "NASA / AJCE",
            issuerName: "Amal Jyothi College of Engineering",
            issuerDept: "NASA Space Apps Local Lead • Team Syntax_in_Orbit",
            category: "hackathon",
            title: "NASA Space Apps - Top 10 Senior Category",
            badgeType: "HACKATHON WINNER (TOP 10)",
            date: "Oct 4-5, 2025",
            certId: "NASA-TOP10-AJCE-2025",
            icon: "fa-trophy",
            themeColor: "#ec4899",
            themeGlow: "rgba(236, 72, 153, 0.45)",
            themeGlowInner: "rgba(236, 72, 153, 0.12)",
            skills: ["Technical Leadership", "Rapid Prototyping", "Pitch Presentation", "Space Science UX"],
            description: "Secured Top 10 Rank among competitive engineering teams in the Senior Category during the 36-hour intense hackathon marathon with groundbreaking project delivery.",
            link: "https://drive.google.com/file/d/1ugb4DiAJcJyct59_8swNpT5qaAXKsDx4/view?usp=sharing"
        },
        {
            number: "08",
            issuer: "NASA / AJCE",
            issuerName: "Amal Jyothi College of Engineering",
            issuerDept: "NASA International Space Apps Challenge • Kerala, India",
            category: "hackathon",
            title: "NASA Space Apps Challenge 2025 - Participation",
            badgeType: "OFFICIAL PARTICIPATION",
            date: "Oct 4-5, 2025",
            certId: "NASA-PART-AJCE-2025",
            icon: "fa-globe",
            themeColor: "#fbbf24",
            themeGlow: "rgba(251, 191, 36, 0.45)",
            themeGlowInner: "rgba(251, 191, 36, 0.12)",
            skills: ["Astrophysics Data", "Hackathon Sprint", "Kepler Telescope", "Team Collaboration"],
            description: "Official certificate of participation in the NASA Space Apps Challenge 2025 offline hackathon hosted at Amal Jyothi College of Engineering, tackling global space challenges.",
            link: "https://drive.google.com/file/d/1g0ZrDBTVtBGPYhgFVY1HGuP9KxqehR5w/view?usp=sharing"
        },
        {
            number: "09",
            issuer: "GOOGLE",
            issuerName: "Google Developer Groups (GDG)",
            issuerDept: "Build With India National Hackathon Finale • Google Office",
            category: "hackathon",
            title: "Build With India - Google Office Finale",
            badgeType: "NATIONAL FINALE (TOP 5,000 / 25,000)",
            date: "Sept 2025",
            certId: "BWI-GOOG-2025-5000",
            icon: "fa-brands fa-google",
            themeColor: "#4285f4",
            themeGlow: "rgba(66, 133, 244, 0.45)",
            themeGlowInner: "rgba(66, 133, 244, 0.12)",
            skills: ["Cloud Architecture", "Scalable Microservices", "Google Cloud APIs", "Innovation Pitch"],
            description: "Selected for National Grand Finale at Google Office, outperforming 20,000+ competitors to rank within top 5,000 elite nationwide engineering innovator squads.",
            link: "https://drive.google.com/file/d/1FkDr1hKmKYZp4uRvHbMqGNUxZhQ4Ey0c/view?usp=sharing"
        },
        {
            number: "10",
            issuer: "MBCCET",
            issuerName: "Mar Baselios Christian College of Engineering",
            issuerDept: "Dept. of Computer Science • Team CARING ARMS • Kuttikkanam",
            category: "hackathon",
            title: "HashItUp - 24-Hour National Hackathon",
            badgeType: "24-HOUR NATIONAL HACKATHON",
            date: "Sept 26-27, 2025",
            certId: "HIU-2025-MBCCET",
            icon: "fa-laptop-code",
            themeColor: "#a855f7",
            themeGlow: "rgba(168, 85, 247, 0.45)",
            themeGlowInner: "rgba(168, 85, 247, 0.12)",
            skills: ["Rapid Fullstack Engineering", "Team Leadership", "Real-Time Systems", "Agile Execution"],
            description: "Spearheaded Team CARING ARMS during an uninterrupted 24-hour national hackathon sprint at MBCCET Kuttikkanam, engineering a high-impact community healthcare solution.",
            link: "https://drive.google.com/file/d/1uRmMtodb8hPMQJ4w1VPYjUXYsf7USGpV/view?usp=sharing"
        }
    ];

    // State
    let currentFilter = 'all';
    let filteredList = [...certificatesData];
    let activeIndex = 0;
    let currentViewMode = 'showcase'; // 'showcase' or 'grid'

    // DOM Elements Cache
    let dom = {};

    function init() {
        cacheDOM();
        if (!dom.section) return;

        setupFilterListeners();
        setupViewModeListeners();
        setupNavListeners();
        setupModalListeners();
        renderThumbnails();
        renderGrid();
        updateShowcase(activeIndex, false);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyNavigation);
    }

    function cacheDOM() {
        dom.section = document.getElementById('certifications');
        dom.stageWrapper = document.getElementById('certStageWrapper');
        dom.showcaseCard = document.getElementById('certShowcaseCard');
        dom.brandLogo = document.getElementById('certBrandLogo');
        dom.brandDot = document.getElementById('certBrandDot');
        dom.issueDate = document.getElementById('certIssueDate');
        dom.indexPill = document.getElementById('certIndexPill');
        dom.certId = document.getElementById('certId');
        dom.credentialSubtitle = document.getElementById('certCredentialSubtitle');
        dom.mainTitle = document.getElementById('certMainTitle');
        dom.typeTag = document.getElementById('certTypeTag');
        dom.description = document.getElementById('certDescription');
        dom.skillsContainer = document.getElementById('certSkillsContainer');
        dom.issuerName = document.getElementById('certIssuerName');
        dom.issuerSub = document.getElementById('certIssuerSub');
        dom.viewBtn = document.getElementById('viewCertificateBtn');
        dom.detailsBtn = document.getElementById('previewCertDetailsBtn');
        dom.storyBtn = document.getElementById('certStoryBtn');
        dom.thumbnailsContainer = document.getElementById('certThumbnailsContainer');
        dom.thumbnailsTrack = document.getElementById('certThumbnailsTrack');
        dom.gridContainer = document.getElementById('certAllGridContainer');
        dom.prevArrow = document.getElementById('certPrevArrow');
        dom.nextArrow = document.getElementById('certNextArrow');
        dom.filterPills = document.querySelectorAll('.cert-pill-badge[data-filter]');

        // View Mode Switcher
        dom.viewShowcaseBtn = document.getElementById('certViewShowcaseBtn');
        dom.viewGridBtn = document.getElementById('certViewGridBtn');

        // Modal
        dom.modalOverlay = document.getElementById('certModalOverlay');
        dom.modalClose = document.getElementById('certModalClose');
        dom.modalBrandBadge = document.getElementById('modalBrandBadge');
        dom.modalTitle = document.getElementById('modalTitle');
        dom.modalDesc = document.getElementById('modalDesc');
        dom.modalDate = document.getElementById('modalDate');
        dom.modalId = document.getElementById('modalId');
        dom.modalIssuer = document.getElementById('modalIssuer');
        dom.modalType = document.getElementById('modalType');
        dom.modalOpenDrive = document.getElementById('modalOpenDrive');
        dom.modalCopyId = document.getElementById('modalCopyId');
        dom.modalPrev = document.getElementById('modalPrev');
        dom.modalNext = document.getElementById('modalNext');
        dom.copyToast = document.getElementById('certCopyToast');
    }

    function setupViewModeListeners() {
        if (dom.viewShowcaseBtn) {
            dom.viewShowcaseBtn.addEventListener('click', () => setViewMode('showcase'));
        }
        if (dom.viewGridBtn) {
            dom.viewGridBtn.addEventListener('click', () => setViewMode('grid'));
        }
    }

    function setViewMode(mode) {
        currentViewMode = mode;
        if (mode === 'showcase') {
            if (dom.viewShowcaseBtn) dom.viewShowcaseBtn.classList.add('active');
            if (dom.viewGridBtn) dom.viewGridBtn.classList.remove('active');
            if (dom.stageWrapper) dom.stageWrapper.style.display = 'flex';
            if (dom.thumbnailsContainer) dom.thumbnailsContainer.style.display = 'block';
            if (dom.gridContainer) dom.gridContainer.style.display = 'none';
        } else {
            if (dom.viewShowcaseBtn) dom.viewShowcaseBtn.classList.remove('active');
            if (dom.viewGridBtn) dom.viewGridBtn.classList.add('active');
            if (dom.stageWrapper) dom.stageWrapper.style.display = 'none';
            if (dom.thumbnailsContainer) dom.thumbnailsContainer.style.display = 'none';
            if (dom.gridContainer) dom.gridContainer.style.display = 'grid';
            renderGrid();
        }
    }

    function setupFilterListeners() {
        dom.filterPills.forEach(pill => {
            pill.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');
                if (filter === currentFilter) return;

                dom.filterPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentFilter = filter;

                if (filter === 'all') {
                    filteredList = [...certificatesData];
                } else {
                    filteredList = certificatesData.filter(c => c.category === filter);
                }

                // Reset to first item of filtered list
                activeIndex = 0;
                renderThumbnails();
                renderGrid();
                updateShowcase(activeIndex, true);
            });
        });
    }

    function setupNavListeners() {
        if (dom.prevArrow) {
            dom.prevArrow.addEventListener('click', navigatePrev);
        }
        if (dom.nextArrow) {
            dom.nextArrow.addEventListener('click', navigateNext);
        }

        // Details Button opens interactive credential modal
        if (dom.detailsBtn) {
            dom.detailsBtn.addEventListener('click', () => openModal(activeIndex));
        }
    }

    function setupModalListeners() {
        if (dom.modalClose) {
            dom.modalClose.addEventListener('click', closeModal);
        }

        if (dom.modalOverlay) {
            dom.modalOverlay.addEventListener('click', function (e) {
                if (e.target === dom.modalOverlay) {
                    closeModal();
                }
            });
        }

        if (dom.modalPrev) {
            dom.modalPrev.addEventListener('click', function () {
                navigatePrev();
                populateModal(activeIndex);
            });
        }

        if (dom.modalNext) {
            dom.modalNext.addEventListener('click', function () {
                navigateNext();
                populateModal(activeIndex);
            });
        }

        if (dom.modalCopyId) {
            dom.modalCopyId.addEventListener('click', copyCertId);
        }
    }

    function handleKeyNavigation(e) {
        if (dom.modalOverlay && dom.modalOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                navigatePrev();
                populateModal(activeIndex);
            } else if (e.key === 'ArrowRight') {
                navigateNext();
                populateModal(activeIndex);
            }
            return;
        }

        // Section in viewport navigation (Showcase mode only)
        if (currentViewMode === 'showcase' && isSectionInView()) {
            if (e.key === 'ArrowLeft') {
                navigatePrev();
            } else if (e.key === 'ArrowRight') {
                navigateNext();
            }
        }
    }

    function isSectionInView() {
        if (!dom.section) return false;
        const rect = dom.section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25;
    }

    function navigatePrev() {
        if (filteredList.length === 0) return;
        activeIndex = (activeIndex - 1 + filteredList.length) % filteredList.length;
        updateShowcase(activeIndex, true);
    }

    function navigateNext() {
        if (filteredList.length === 0) return;
        activeIndex = (activeIndex + 1) % filteredList.length;
        updateShowcase(activeIndex, true);
    }

    function renderThumbnails() {
        if (!dom.thumbnailsTrack) return;
        dom.thumbnailsTrack.innerHTML = '';

        filteredList.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = `cert-thumb-card ${index === activeIndex ? 'active' : ''}`;
            card.style.setProperty('--thumb-accent', cert.themeColor);
            card.style.setProperty('--thumb-glow', cert.themeGlow);
            card.style.setProperty('--thumb-glow-inner', cert.themeGlowInner);

            card.innerHTML = `
                <div class="cert-thumb-top">
                    <span class="cert-thumb-issuer">${cert.issuer}</span>
                    <span class="cert-thumb-number">${String(index + 1).padStart(2, '0')}</span>
                </div>
                <div class="cert-thumb-title">${cert.title}</div>
                <div class="cert-thumb-bottom">
                    <span class="cert-thumb-date">${cert.date}</span>
                    <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-thumb-direct-link" title="Open in Google Drive" onclick="event.stopPropagation();">
                        <i class="fas fa-external-link-alt"></i> Drive ↗
                    </a>
                </div>
            `;

            card.addEventListener('click', () => {
                if (activeIndex !== index) {
                    activeIndex = index;
                    updateShowcase(activeIndex, true);
                }
            });

            dom.thumbnailsTrack.appendChild(card);
        });
    }

    function renderGrid() {
        if (!dom.gridContainer) return;
        dom.gridContainer.innerHTML = '';

        filteredList.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'cert-grid-card';
            card.style.setProperty('--grid-accent-color', cert.themeColor);
            card.style.setProperty('--grid-accent-glow', cert.themeGlow);
            card.style.setProperty('--grid-accent-glow-inner', cert.themeGlowInner);

            const skillsHtml = cert.skills.map(s => `<span class="cert-grid-skill">${s}</span>`).join('');
            const isNasa = cert.issuer.includes('NASA') || cert.category === 'hackathon';
            const storyBtnHtml = isNasa ? `
                <a href="hackathon-nasa.html#certificates" class="btn-cert-grid-details" title="Explore Hackathon Story">
                    <i class="fas fa-rocket"></i> Story
                </a>
            ` : '';

            card.innerHTML = `
                <div>
                    <div class="cert-grid-top">
                        <span class="cert-grid-issuer-brand">
                            <i class="fas ${cert.icon}"></i> ${cert.issuer}
                        </span>
                        <span class="cert-grid-number">[ ${String(index + 1).padStart(2, '0')} / ${String(filteredList.length).padStart(2, '0')} ]</span>
                    </div>
                    <span class="cert-grid-badge">${cert.badgeType}</span>
                    <h3 class="cert-grid-title">${cert.title}</h3>
                    <p class="cert-grid-desc">${cert.description}</p>
                    <div class="cert-grid-skills">${skillsHtml}</div>
                    <div class="cert-grid-issuer-info">
                        <div class="cert-grid-issuer-name">${cert.issuerName}</div>
                        <div class="cert-grid-issuer-dept">${cert.issuerDept} • ${cert.date}</div>
                    </div>
                </div>
                <div class="cert-grid-footer-actions">
                    <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="btn-cert-grid-drive" title="Open Official Certificate in Google Drive">
                        <i class="fas fa-external-link-alt"></i> View Certificate
                    </a>
                    <button type="button" class="btn-cert-grid-details" data-cert-index="${index}" title="View Authenticated Credential Details">
                        <i class="fas fa-id-card"></i> Details
                    </button>
                    ${storyBtnHtml}
                </div>
            `;

            const detailsBtn = card.querySelector('[data-cert-index]');
            if (detailsBtn) {
                detailsBtn.addEventListener('click', () => {
                    activeIndex = index;
                    openModal(index);
                });
            }

            dom.gridContainer.appendChild(card);
        });
    }

    function updateShowcase(index, animate) {
        if (!filteredList[index]) return;
        const cert = filteredList[index];

        // Animate card with smooth transition
        if (animate && window.gsap) {
            gsap.fromTo(dom.showcaseCard, 
                { opacity: 0.6, scale: 0.98, y: 10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            );
        }

        // Apply theme variables
        dom.showcaseCard.style.setProperty('--active-theme-color', cert.themeColor);
        dom.showcaseCard.style.setProperty('--active-theme-glow', cert.themeGlow);
        dom.showcaseCard.style.setProperty('--active-theme-glow-inner', cert.themeGlowInner);

        // Update Content
        dom.brandLogo.innerHTML = `${cert.issuer}<span class="cert-brand-dot" id="certBrandDot">.</span>`;
        dom.issueDate.textContent = cert.date;
        dom.indexPill.textContent = `[ ${String(index + 1).padStart(2, '0')} / ${String(filteredList.length).padStart(2, '0')} ]`;
        dom.certId.textContent = `Certificate ID: ${cert.certId}`;
        dom.mainTitle.textContent = cert.title;
        dom.typeTag.textContent = cert.badgeType;
        dom.description.textContent = cert.description;

        // Skills
        dom.skillsContainer.innerHTML = '';
        cert.skills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'cert-skill-pill';
            span.textContent = skill;
            dom.skillsContainer.appendChild(span);
        });

        // Issuers (Primary organization & Sub-department clearly separated)
        dom.issuerName.textContent = cert.issuerName;
        dom.issuerSub.textContent = cert.issuerDept;

        // Direct Google Drive certificate link on View Certificate button
        if (dom.viewBtn) {
            dom.viewBtn.href = cert.link;
        }

        // NASA Hackathon Deep Dive Link
        if (dom.storyBtn) {
            if (cert.issuer.includes('NASA') || cert.category === 'hackathon') {
                dom.storyBtn.style.display = 'inline-flex';
                if (cert.issuer.includes('NASA')) {
                    dom.storyBtn.href = 'hackathon-nasa.html#certificates';
                    dom.storyBtn.innerHTML = '<i class="fas fa-rocket"></i> NASA Page ↗';
                } else {
                    dom.storyBtn.href = 'hackathon-nasa.html#certificates';
                    dom.storyBtn.innerHTML = '<i class="fas fa-trophy"></i> Hackathon Page ↗';
                }
            } else {
                dom.storyBtn.style.display = 'none';
            }
        }

        // Update active class on thumbnails
        const thumbCards = dom.thumbnailsTrack.querySelectorAll('.cert-thumb-card');
        thumbCards.forEach((c, idx) => {
            if (idx === index) {
                c.classList.add('active');
                scrollThumbnailIntoView(c);
            } else {
                c.classList.remove('active');
            }
        });
    }

    function scrollThumbnailIntoView(activeCard) {
        if (!dom.thumbnailsTrack || !activeCard) return;
        const trackRect = dom.thumbnailsTrack.getBoundingClientRect();
        const cardRect = activeCard.getBoundingClientRect();

        const cardLeftRel = cardRect.left - trackRect.left;
        const targetScroll = dom.thumbnailsTrack.scrollLeft + cardLeftRel - (trackRect.width / 2) + (cardRect.width / 2);

        dom.thumbnailsTrack.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }

    function openModal(index = activeIndex) {
        populateModal(index);
        if (dom.modalOverlay) {
            dom.modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (dom.modalOverlay) {
            dom.modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function populateModal(index = activeIndex) {
        const cert = filteredList[index];
        if (!cert) return;

        dom.modalDialog = dom.modalOverlay.querySelector('.cert-modal-dialog');
        if (dom.modalDialog) {
            dom.modalDialog.style.setProperty('--modal-accent', cert.themeColor);
            dom.modalDialog.style.setProperty('--modal-glow', cert.themeGlow);
        }

        if (dom.modalBrandBadge) dom.modalBrandBadge.innerHTML = `<i class="fas ${cert.icon}"></i> ${cert.issuer} &nbsp;•&nbsp; ${cert.badgeType}`;
        if (dom.modalTitle) dom.modalTitle.textContent = cert.title;
        if (dom.modalDesc) dom.modalDesc.textContent = cert.description;
        if (dom.modalDate) dom.modalDate.textContent = cert.date;
        if (dom.modalId) dom.modalId.textContent = cert.certId;
        if (dom.modalIssuer) dom.modalIssuer.textContent = `${cert.issuerName} (${cert.issuerDept})`;
        if (dom.modalType) dom.modalType.textContent = cert.badgeType;

        if (dom.modalOpenDrive) {
            dom.modalOpenDrive.href = cert.link;
        }
    }

    function copyCertId() {
        const cert = filteredList[activeIndex];
        if (!cert) return;

        navigator.clipboard.writeText(cert.certId).then(() => {
            if (dom.copyToast) {
                dom.copyToast.classList.add('show');
                setTimeout(() => {
                    dom.copyToast.classList.remove('show');
                }, 2200);
            }
        }).catch(err => {
            console.error('Failed to copy ID: ', err);
        });
    }

    // Auto initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
