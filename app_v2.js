import { cities, vegetables, farmingModels, pestControls, fertilizers, regions, categories } from './data.js?v=1786000000011';
import { weatherData } from './weather_data.js?v=1780922000000';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, db, doc, setDoc, getDoc, onSnapshot, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from './firebase-config.js';

let currentUser = null;
let unsubSnapshot = null;
let myGarden = [];
let currentOpGardenItemId = null;

try {
    const stored = localStorage.getItem('tubutu_my_garden');
    if (stored) {
        myGarden = JSON.parse(stored);
        myGarden.forEach(g => {
            if (!g.id) {
                g.id = 'g_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
            }
        });
    }
} catch (e) {
    console.error('Failed to parse myGarden data', e);
}
window.myGarden = myGarden;

async function saveGarden() {
    localStorage.setItem('tubutu_my_garden', JSON.stringify(myGarden));
    window.myGarden = myGarden;
    if (currentUser) {
        try {
            await setDoc(doc(db, 'users', currentUser.uid), { garden: myGarden }, { merge: true });
        } catch (e) {
            console.error('Error saving to cloud:', e);
        }
    }
    generateNotifications();
}

let currentNotifications = [];

function generateNotifications() {
    currentNotifications = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    
    myGarden.forEach(gardenItem => {
        if (gardenItem.type === 'fertilizer' || gardenItem.harvestedOut) return;
        
        const cropData = vegetables.find(v => v.id === gardenItem.vegId);
        if (!cropData || !cropData.growthSequence) return;
        
        const plantedDate = new Date(gardenItem.plantedDate);
        plantedDate.setHours(0,0,0,0);
        
        const daysPassed = Math.floor((today - plantedDate) / (1000 * 60 * 60 * 24));
        if (daysPassed < 0) return;
        
        let accumulatedDays = 0;
        let currentStageIndex = 0;
        let daysIntoStage = 0;
        
        for (let i = 0; i < cropData.growthSequence.length; i++) {
            const stage = cropData.growthSequence[i];
            if (daysPassed >= accumulatedDays && daysPassed < accumulatedDays + stage.days) {
                currentStageIndex = i;
                daysIntoStage = daysPassed - accumulatedDays;
                break;
            }
            accumulatedDays += stage.days;
            if (i === cropData.growthSequence.length - 1 && daysPassed >= accumulatedDays) {
                currentStageIndex = i; // stuck at last stage
                daysIntoStage = daysPassed - accumulatedDays;
            }
        }
        
        const currentStageName = cropData.growthSequence[currentStageIndex].name;
        
        // 1. Stage change notification
        if (daysIntoStage <= 3 && !(currentStageIndex === 0 && daysPassed <= 3)) {
            currentNotifications.push({
                type: 'stage',
                icon: cropData.icon || '🌱',
                title: `${gardenItem.nickname || cropData.name} 进入${currentStageName}！`,
                desc: `快去看看它的新变化吧。`,
                timestamp: Date.now()
            });
        }
        
        // 2. Fertilizer Schedule Check
        if (cropData.fertilizerSchedule) {
            cropData.fertilizerSchedule.forEach(fert => {
                if (fert.stageIndex === currentStageIndex) {
                    currentNotifications.push({
                        type: 'fertilizer',
                        icon: '🧪',
                        title: `【${gardenItem.nickname || cropData.name} - ${fert.actionName}】`,
                        desc: `建议每株施 ${fert.fertilizerType} ${fert.dosagePerPlant}。有机替代: ${fert.organicAlternative}。也可选用: ${fert.foliarAlternative}。`,
                        timestamp: Date.now()
                    });
                }
            });
        }
    });
    
    renderNotifications();
}

function renderNotifications() {
    const listEl = document.getElementById('notification-list');
    const badgeEl = document.getElementById('notification-badge');
    
    if (!listEl || !badgeEl) return;
    
    listEl.innerHTML = '';
    
    if (currentNotifications.length === 0) {
        listEl.innerHTML = '<div class="notification-empty">暂无农事提醒，作物都在健康生长~</div>';
        badgeEl.style.display = 'none';
        return;
    }
    
    currentNotifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        item.innerHTML = `
            <div class="notification-icon">${notif.icon}</div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-desc">${notif.desc}</div>
            </div>
        `;
        listEl.appendChild(item);
    });
    
    badgeEl.textContent = currentNotifications.length;
    badgeEl.style.display = 'flex';
}


document.addEventListener('DOMContentLoaded', () => {
    const regionSelectTrigger = document.getElementById('region-select-trigger');
    const triggerText = regionSelectTrigger.querySelector('.trigger-text');
    const regionOptions = document.getElementById('region-options');
    const customSelect = document.getElementById('custom-region-select');
    const regionDesc = document.getElementById('region-desc');
    const categoryFilters = document.getElementById('category-filters');
    const vegGrid = document.getElementById('vegetable-grid');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-btn');

    // --- Authentication Logic ---
    const showLoginModalBtn = document.getElementById('show-login-modal-btn');
    const loginModalOverlay = document.getElementById('login-modal-overlay');
    const loginCloseBtn = document.getElementById('login-close-btn');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const emailLoginBtn = document.getElementById('email-login-btn');
    const emailRegisterBtn = document.getElementById('email-register-btn');
    const authEmailInput = document.getElementById('auth-email');
    const authPasswordInput = document.getElementById('auth-password');
    
    const logoutBtn = document.getElementById('logout-btn');
    const userInfoDiv = document.getElementById('user-info');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');

    if (showLoginModalBtn) {
        showLoginModalBtn.addEventListener('click', () => {
            loginModalOverlay.classList.add('active');
        });
    }

    if (loginCloseBtn) {
        loginCloseBtn.addEventListener('click', () => {
            loginModalOverlay.classList.remove('active');
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            try {
                const result = await signInWithPopup(auth, googleProvider);
                console.log("Logged in as:", result.user.displayName);
                loginModalOverlay.classList.remove('active');
            } catch (error) {
                console.error("Login failed:", error);
                alert("登录失败：" + error.message);
            }
        });
    }

    if (emailRegisterBtn) {
        emailRegisterBtn.addEventListener('click', async () => {
            const email = authEmailInput.value.trim();
            const password = authPasswordInput.value;
            if (!email || password.length < 6) {
                alert("请输入有效的邮箱，且密码不能少于6位。");
                return;
            }
            try {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                
                // Assign a random vegetable icon as avatar
                const randomVeg = vegetables[Math.floor(Math.random() * vegetables.length)];
                await updateProfile(result.user, { 
                    photoURL: randomVeg.icon 
                });
                // Update DOM immediately since onAuthStateChanged might have fired before profile update
                if (userAvatar) userAvatar.src = randomVeg.icon;

                console.log("Registered successfully");
                loginModalOverlay.classList.remove('active');
                authEmailInput.value = '';
                authPasswordInput.value = '';
            } catch (error) {
                console.error("Registration failed:", error);
                if (error.code === 'auth/email-already-in-use') {
                    alert("该邮箱已被注册！");
                } else if (error.code === 'auth/operation-not-allowed') {
                    alert("管理员未开启邮箱注册功能，请在 Firebase 控制台开启。");
                } else {
                    alert("注册失败：" + error.message);
                }
            }
        });
    }

    if (emailLoginBtn) {
        emailLoginBtn.addEventListener('click', async () => {
            const email = authEmailInput.value.trim();
            const password = authPasswordInput.value;
            if (!email || !password) {
                alert("请输入邮箱和密码。");
                return;
            }
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Logged in successfully");
                loginModalOverlay.classList.remove('active');
                authEmailInput.value = '';
                authPasswordInput.value = '';
            } catch (error) {
                console.error("Email Login failed:", error);
                alert("登录失败：" + error.message);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                console.log("Logged out");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        });
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            if (showLoginModalBtn) showLoginModalBtn.style.display = 'none';
            if (userInfoDiv) userInfoDiv.style.display = 'flex';
            if (userAvatar) userAvatar.src = user.photoURL || 'images/default_avatar.png';
            if (userName) userName.textContent = user.displayName || user.email.split('@')[0];

            // Sync Data
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const cloudGarden = docSnap.data().garden || [];
                    cloudGarden.forEach(g => {
                        if (!g.id) {
                            g.id = 'g_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
                        }
                    });
                    
                    // Merge local and cloud (simple union by vegId for now, prioritizing cloud)
                    const mergedMap = new Map();
                    myGarden.forEach(item => mergedMap.set(item.id, item));
                    cloudGarden.forEach(item => mergedMap.set(item.id, item));
                    myGarden = Array.from(mergedMap.values());
                    
                    saveGarden();
                } else {
                    // First time login, save local garden to cloud
                    await setDoc(userDocRef, {
                        email: user.email,
                        displayName: user.displayName,
                        lastLogin: new Date().toISOString(),
                        garden: myGarden
                    });
                }

                // Listen for changes
                if (unsubSnapshot) unsubSnapshot();
                unsubSnapshot = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        const newGarden = doc.data().garden || [];
                        newGarden.forEach(g => {
                            if (!g.id) {
                                g.id = 'g_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
                            }
                        });
                        // Check if different to avoid infinite loop
                        if (JSON.stringify(newGarden) !== JSON.stringify(myGarden)) {
                            myGarden = newGarden;
                            localStorage.setItem('tubutu_my_garden', JSON.stringify(myGarden));
                            window.myGarden = myGarden;
                            generateNotifications();
                            renderGrid();
                            renderCalendar();
                            const myGardenSection = document.getElementById('mygarden-section');
                            if (myGardenSection && myGardenSection.style.display === 'block') {
                                renderMyGarden();
                                if (typeof renderMyFertilizers === 'function') renderMyFertilizers();
                            }
                        }
                    }
                });

                renderGrid();
                renderCalendar();
                const myGardenSection = document.getElementById('mygarden-section');
                if (myGardenSection && myGardenSection.style.display === 'block') {
                    renderMyGarden();
                    if (typeof renderMyFertilizers === 'function') renderMyFertilizers();
                }

            } catch(e) {
                console.error("Error syncing data:", e);
            }

        } else {
            currentUser = null;
            if (unsubSnapshot) {
                unsubSnapshot();
                unsubSnapshot = null;
            }
            if (showLoginModalBtn) showLoginModalBtn.style.display = 'flex';
            if (userInfoDiv) userInfoDiv.style.display = 'none';
        }
    });
    // --- End Auth Logic ---

    // Tab Logic
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    const vegSection = document.getElementById('veg-section');
    const fertSection = document.getElementById('fert-section');
    const calendarSection = document.getElementById('calendar-section');
    const protectionSection = document.getElementById('protection-section');

    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            mainTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle sections
            vegSection.style.display = 'none';
            fertSection.style.display = 'none';
            calendarSection.style.display = 'none';
            protectionSection.style.display = 'none';
            document.getElementById('model-section').style.display = 'none';
            const myGardenSection = document.getElementById('mygarden-section');
            if (myGardenSection) myGardenSection.style.display = 'none';
            const historySection = document.getElementById('history-section');
            if (historySection) historySection.style.display = 'none';

            const targetId = btn.dataset.target;
            if (targetId === 'veg-section') {
                vegSection.style.display = 'block';
            } else if (targetId === 'fert-section') {
                fertSection.style.display = 'block';
            } else if (targetId === 'calendar-section') {
                calendarSection.style.display = 'block';
                renderCalendar();
            } else if (targetId === 'protection-section') {
                protectionSection.style.display = 'block';
            } else if (targetId === 'model-section') {
                document.getElementById('model-section').style.display = 'block';
            } else if (targetId === 'mygarden-section') {
                if (myGardenSection) myGardenSection.style.display = 'block';
                renderMyGarden();
                if (typeof renderMyFertilizers === 'function') renderMyFertilizers();
            } else if (targetId === 'history-section') {
                if (historySection) historySection.style.display = 'block';
                renderHistory();
            }
        });
    });

        const defaultRegion = regions[0];
    let currentRegion = localStorage.getItem('tubutu_region') || defaultRegion.id;
    let currentMonth = 'all';
    let currentCategory = 'all';
    let currentSearchQuery = '';

    // Initialize Regions
    regions.forEach(region => {
        const parts = region.name.split(' (');
        const regionName = parts[0];

        const optionDiv = document.createElement('div');
        optionDiv.className = 'custom-option';
        optionDiv.dataset.value = region.id;
        optionDiv.innerHTML = `<strong>${regionName}</strong>`;
        
        optionDiv.addEventListener('click', () => {
            currentRegion = region.id;
            triggerText.innerHTML = `<strong>${regionName}</strong>`;
            customSelect.classList.remove('open');
            updateRegionDesc();
            renderGrid();
            if (calendarSection.style.display === 'block') {
                renderCalendar();
            }
        });

        regionOptions.appendChild(optionDiv);
    });

    // Set initial value
    if (regions.length > 0) {
        const defaultRegion = regions.find(r => r.id === 'east') || regions[0];
        const parts = defaultRegion.name.split(' (');
        triggerText.innerHTML = `<strong>${parts[0]}</strong>`;
        currentRegion = defaultRegion.id;
    }

    regionSelectTrigger.addEventListener('click', () => {
        customSelect.classList.toggle('open');
    });
    
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });

    // Initialize Categories
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.id = cat.id;
        btn.textContent = `${cat.icon} ${cat.name}`;
        categoryFilters.appendChild(btn);
    });

    // Event Listeners
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn') || e.target.closest('.filter-btn')) {
            const btn = e.target.closest('.filter-btn');
            document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.id;
            renderGrid();
        }
    });


    const btnShowActive = document.getElementById('btn-show-active');
    const btnShowHistory = document.getElementById('btn-show-history');
    const btnShowFert = document.getElementById('btn-show-fert');
    const mygardenActiveView = document.getElementById('mygarden-active-view');
    const mygardenHistoryView = document.getElementById('mygarden-history-view');
    const mygardenFertView = document.getElementById('mygarden-fert-view');

    if (btnShowActive && btnShowHistory) {
        btnShowActive.addEventListener('click', () => {
            btnShowActive.classList.add('active');
            btnShowHistory.classList.remove('active');
            if(btnShowFert) btnShowFert.classList.remove('active');
            mygardenActiveView.style.display = 'block';
            mygardenHistoryView.style.display = 'none';
            if(mygardenFertView) mygardenFertView.style.display = 'none';
            renderMyGarden();
        });

        btnShowHistory.addEventListener('click', () => {
            btnShowHistory.classList.add('active');
            btnShowActive.classList.remove('active');
            if(btnShowFert) btnShowFert.classList.remove('active');
            mygardenHistoryView.style.display = 'block';
            mygardenActiveView.style.display = 'none';
            if(mygardenFertView) mygardenFertView.style.display = 'none';
            renderHistory();
        });
        
        if (btnShowFert) {
            btnShowFert.addEventListener('click', () => {
                btnShowFert.classList.add('active');
                btnShowActive.classList.remove('active');
                btnShowHistory.classList.remove('active');
                if(mygardenFertView) mygardenFertView.style.display = 'block';
                mygardenActiveView.style.display = 'none';
                mygardenHistoryView.style.display = 'none';
                renderMyFertilizers();
            });
        }
    }
    



    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    const searchInput = document.getElementById('main-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            renderGrid();
            renderFertilizers();
        });
    }

    // Functions
    function updateRegionDesc() {
        const region = regions.find(r => r.id === currentRegion);
        if (region) {
            regionDesc.textContent = `该地域特点：${region.desc}`;
        }
    }

    const categoryGradients = {
        'leafy': 'linear-gradient(135deg, #a8e6cf, #dcedc1)',
        'brassica': 'linear-gradient(135deg, #c1e1c1, #8fe09b)',
        'solanaceous': 'linear-gradient(135deg, #ff8b94, #ffaaa5)',
        'root': 'linear-gradient(135deg, #ffd3b6, #ffaaa5)',
        'cucurbits': 'linear-gradient(135deg, #dcedc1, #a8e6cf)',
        'fruit': 'linear-gradient(135deg, #ffb7b2, #ff9a9e)',
        'legumes': 'linear-gradient(135deg, #b5ead7, #a8e6cf)',
        'allium': 'linear-gradient(135deg, #e2f0cb, #c7ceea)'
    };

    function renderGrid() {
        vegGrid.innerHTML = '';
        
        let filteredVegs = vegetables.filter(v => 
            currentCategory === 'all' || v.categoryId === currentCategory
        );

        if (currentSearchQuery) {
            filteredVegs = filteredVegs.filter(veg => {
                const nameMatch = veg.name && veg.name.toLowerCase().includes(currentSearchQuery);
                const descMatch = veg.description && veg.description.toLowerCase().includes(currentSearchQuery);
                const pestMatch = veg.pests && veg.pests.some(p => 
                    (p.name && p.name.toLowerCase().includes(currentSearchQuery)) || 
                    (p.symptoms && p.symptoms.toLowerCase().includes(currentSearchQuery))
                );
                return nameMatch || descMatch || pestMatch;
            });
        }

        filteredVegs.forEach(veg => {
            const cat = categories.find(c => c.id === veg.categoryId);
            const calendarText = veg.calendar[currentRegion] || '该地区暂无推荐种植时间';
            const bgGradient = categoryGradients[veg.categoryId] || 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';

            const imgHtml = veg.image 
                ? `<img loading="lazy" src="${veg.image}" alt="${veg.name}" class="veg-img">`
                : `<div class="veg-img" style="background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 5rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1);">${veg.icon}</div>`;

            const inGarden = window.myGarden && window.myGarden.some(g => g.vegId === veg.id);
            const addBtnHtml = `<button class="quick-add-btn ${inGarden ? 'added' : ''}">
                ${inGarden ? '✓ 已在菜园' : '🌱 加入菜园'}
            </button>`;

            const card = document.createElement('div');
            card.className = 'veg-card';
            card.innerHTML = `
                ${imgHtml}
                <div class="veg-content">
                    <div class="veg-header">
                        <h3 class="veg-title">${veg.icon} ${veg.name}</h3>
                        <span class="veg-category">${cat ? cat.name : ''}</span>
                    </div>
                    <p class="veg-desc">${veg.description}</p>
                    <div class="veg-calendar">
                        <span class="veg-calendar-icon">📅</span>
                        <span>${calendarText}</span>
                    </div>
                    <div style="margin-top: 15px; text-align: right;">
                        ${addBtnHtml}
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openModal(veg, false));
            vegGrid.appendChild(card);
        });
    }

    function renderFertilizers() {
        const fertGrid = document.getElementById('fert-grid');
        if (!fertGrid) return;
        fertGrid.innerHTML = '';

        let filteredFertilizers = fertilizers;
        if (currentSearchQuery) {
            filteredFertilizers = filteredFertilizers.filter(f => {
                const nameMatch = f.name && f.name.toLowerCase().includes(currentSearchQuery);
                const descMatch = f.description && f.description.toLowerCase().includes(currentSearchQuery);
                return nameMatch || descMatch;
            });
        }

        filteredFertilizers.forEach(item => {
            const calendarText = item.calendar.default || '';

            const bgGradient = 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';

            const imgHtml = item.image 
                ? `<img loading="lazy" src="${item.image}" alt="${item.name}" class="veg-img">`
                : `<div class="veg-img" style="background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 5rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1);">${item.icon}</div>`;

            const card = document.createElement('div');
            card.className = 'veg-card';
            card.innerHTML = `
                ${imgHtml}
                <div class="veg-content">
                    <div class="veg-header">
                        <h3 class="veg-title">${item.icon} ${item.name}</h3>
                        <span class="veg-category">肥料工坊</span>
                    </div>
                    <p class="veg-desc">${item.description}</p>
                    <div class="veg-calendar">
                        <span class="veg-calendar-icon">⏳</span>
                        <span>${calendarText}</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openModal({ ...item, type: 'fertilizer' }, true));
            fertGrid.appendChild(card);
        });
    }

    function renderProtections() {
        const protectionGrid = document.getElementById('protection-grid');
        if (!protectionGrid) return;
        protectionGrid.innerHTML = '';
        
        pestControls.forEach(pc => {
            const card = document.createElement('div');
            card.className = 'veg-card fade-in';
            card.innerHTML = `
                <img loading="lazy" src="${pc.image}" alt="${pc.name}" class="veg-img" onerror="this.src='images/default_crop.png'">
                <div class="veg-content">
                    <div class="veg-header">
                        <h3 class="veg-title">${pc.icon} ${pc.name}</h3>
                    </div>
                    <p class="veg-desc">${pc.description}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                openModal({ ...pc, type: 'protection' });
            });
            
            protectionGrid.appendChild(card);
        });
    }

    function renderFarmingModels() {
        const modelGrid = document.getElementById('model-grid');
        if (!modelGrid) return;
        modelGrid.innerHTML = '';
        
        farmingModels.forEach(model => {
            const card = document.createElement('div');
            card.className = 'veg-card fade-in';
            card.innerHTML = `
                <img loading="lazy" src="${model.image}" alt="${model.name}" class="veg-img" onerror="this.src='images/default_crop.png'">
                <div class="veg-content">
                    <div class="veg-header">
                        <h3 class="veg-title">${model.icon} ${model.name}</h3>
                    </div>
                    <p class="veg-desc">${model.description}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                openModal({ ...model, type: 'model' });
            });
            
            modelGrid.appendChild(card);
        });
    }

    function parseMonths(text) {
        if (!text) return [];
        let months = new Set();
        if (text.includes('全年') || text.includes('四季')) {
            for(let i=1; i<=12; i++) months.add(i);
            return Array.from(months);
        }
        if (text.includes('春')) { months.add(3); months.add(4); months.add(5); }
        if (text.includes('夏')) { months.add(6); months.add(7); months.add(8); }
        if (text.includes('秋')) { months.add(8); months.add(9); months.add(10); }
        if (text.includes('冬')) { months.add(11); months.add(12); months.add(1); }

        const rangeRegex = /([1-9]|1[0-2])\s*[-至~]\s*([1-9]|1[0-2])/g;
        let match;
        while ((match = rangeRegex.exec(text)) !== null) {
            let start = parseInt(match[1]);
            let end = parseInt(match[2]);
            if (start <= end) {
                for(let i=start; i<=end; i++) months.add(i);
            } else {
                for(let i=start; i<=12; i++) months.add(i);
                for(let i=1; i<=end; i++) months.add(i);
            }
        }

        const singleRegex = /([1-9]|1[0-2])\s*月/g;
        while ((match = singleRegex.exec(text)) !== null) {
            months.add(parseInt(match[1]));
        }

        return Array.from(months).sort((a,b)=>a-b);
    }

    function renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        const regionNameEl = document.getElementById('calendar-region-name');
        if (!grid) return;
        
        const region = regions.find(r => r.id === currentRegion);
        if (region) {
            regionNameEl.textContent = region.name.split(' (')[0];
        }

        grid.innerHTML = '';
        const currentMonth = new Date().getMonth() + 1;
        
        const monthOrder = [];
        for (let i = 0; i < 12; i++) {
            let m = currentMonth + i;
            if (m > 12) m -= 12;
            monthOrder.push(m);
        }
        
        for (let month of monthOrder) {
            const monthCard = document.createElement('div');
            monthCard.className = 'month-card';
            if (month === currentMonth) {
                monthCard.classList.add('current-month');
            }
            
            const matchedVegs = vegetables.filter(veg => {
                const text = veg.calendar[currentRegion];
                const validMonths = parseMonths(text);
                return validMonths.includes(month);
            });

            monthCard.innerHTML = `
                <div class="month-card-header">
                    <span>${month} 月 ${month === currentMonth ? '(当前月)' : ''}</span>
                    <span class="veg-count">${matchedVegs.length} 种</span>
                </div>
                <div class="month-card-body" id="month-body-${month}">
                </div>
            `;
            grid.appendChild(monthCard);

            const body = monthCard.querySelector(`#month-body-${month}`);
            if (matchedVegs.length === 0) {
                body.innerHTML = '<div class="empty-month">该月暂无推荐种植</div>';
            } else {
                matchedVegs.forEach(veg => {
                    const item = document.createElement('div');
                    item.className = 'calendar-veg-item';
                    const iconHtml = veg.avatar
                        ? `<div style="width: 28px; height: 28px; border-radius: 4px; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; background: white;"><img loading="lazy" src="${veg.avatar}?v=2" style="width: 100%; height: 100%; object-fit: contain; transform: scale(1.2);"></div>`
                        : (veg.image 
                            ? `<img loading="lazy" src="${veg.image}?v=2" style="width: 24px; height: 24px; object-fit: cover; border-radius: 4px;">`
                            : `<span>${veg.icon}</span>`);
                    item.innerHTML = `${iconHtml} <span>${veg.name}</span>`;
                    item.addEventListener('click', () => openModal(veg, false));
                    body.appendChild(item);
                });
            }
        }
    }

    const stageIcons = ['🌱', '🪴', '💧', '🛡️', '🧺'];

    function openModal(item, isFertilizer = false) {
        const bgGradient = categoryGradients[item.categoryId] || 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
        const imgHtml = item.image
            ? `<img loading="lazy" src="${item.image}" alt="${item.name}">`
            : `<div style="width: 100%; height: 100%; background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 7rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1);">${item.icon}</div>`;

        let contentHtml = `
            <div class="modal-header">
                ${imgHtml}
                <div class="modal-header-content">
                    <h2 class="modal-title">${item.icon} ${item.name}</h2>
                </div>
            </div>`;

        if (item.type === 'fertilizer' || item.type === 'protection' || item.type === 'model') {
            contentHtml += `
                <div class="modal-body">
                    ${item.type === 'fertilizer' ? `
                    <div class="modal-section garden-control-section" style="margin-top: 0; margin-bottom: 20px; background: #f0fdf4; border-color: #bbf7d0;">
                        <h3 style="color: #166534; display: flex; align-items: center; gap: 8px;">🏡 记录到我的菜园</h3>
                        <div class="garden-control-flex" style="flex-wrap: wrap; gap: 15px;">
                            <div class="date-picker-group">
                                <label style="color: #166534; font-size: 1rem;">开始制作日期：</label>
                                <input type="date" id="fert-date-input" value="${new Date().toISOString().split('T')[0]}" style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                            </div>
                            <button id="toggle-fert-btn" class="add-btn">
                                + 加入制作记录
                            </button>
                        </div>
                    </div>` : ''}

                    <div class="modal-section">
                        <h4>${item.type === 'protection' ? '📖 原理与适用' : item.type === 'model' ? '📖 核心理念' : '📖 介绍与原理'}</h4>
                        <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin-top: 8px;">${item.description}</p>
                    </div>
                    ${item.stages && item.stages.length > 0 ? `
                        <div class="modal-section">
                            <h4>${item.id === 'pc_companion_planting' ? '💡 经典搭配案例' : item.type === 'model' ? '💡 典型应用场景' : '📋 制作与使用步骤'}</h4>
                            <div class="stage-list">
                                ${item.stages.map((stage, index) => `
                                    <div class="stage-item">
                                        <div class="stage-marker">${index + 1}</div>
                                        <div class="stage-content">
                                            <h5 class="stage-name">${stage.name}</h5>
                                            <p class="stage-desc">${stage.content}</p>
                                            ${stage.image ? `<img loading="lazy" src="${stage.image}" alt="${stage.name}" class="stage-image" style="width: 50%; max-width: 300px; border-radius: 8px; margin-top: 10px; display: block;">` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : ''}
                </div>`;
        } else {
            const cat = categories.find(c => c.id === item.categoryId);
            const calendarText = item.calendar[currentRegion] || '该地区暂无推荐种植时间';
            const regionName = regions.find(r => r.id === currentRegion).name;
            
            const gardenItem = myGarden.find(g => g.vegId === item.id);
            const isInGarden = !!gardenItem;
            const defaultDate = gardenItem ? gardenItem.plantDate : new Date().toISOString().split('T')[0];

            const savedCity = localStorage.getItem('tubutu_default_city');
            const defaultCity = gardenItem ? gardenItem.cityId : (savedCity || (cities.length > 0 ? cities[0].id : ''));
            
            const cityOptionsHtml = cities.map(c => `<option value="${c.id}" ${defaultCity === c.id ? 'selected' : ''}>${c.name}</option>`).join('');

            const savedMethod = localStorage.getItem('tubutu_default_method') || 'sow';
            const defaultMethod = gardenItem ? gardenItem.method : savedMethod;

            contentHtml += `
                <div class="modal-body">
                    <div class="modal-section garden-control-section" style="margin-top: 0; margin-bottom: 20px; background: #f0fdf4; border-color: #bbf7d0;">
                        <h3 style="color: #166534; display: flex; align-items: center; gap: 8px;">🏡 虚拟菜园专属控制台</h3>
                        <div class="garden-control-flex" style="flex-wrap: wrap; gap: 15px;">
                            <div class="date-picker-group">
                                <label style="color: #166534; font-size: 1rem;">播种城市：</label>
                                <select id="garden-city-input" style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                                    ${cityOptionsHtml}
                                </select>
                            </div>
                            <div class="date-picker-group">
                                <label style="color: #166534; font-size: 1rem;">种植方式：</label>
                                <select id="garden-method-input" style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                                    <option value="sow" ${defaultMethod !== 'transplant' ? 'selected' : ''}>🌱 播种种子</option>
                                    <option value="transplant" ${defaultMethod === 'transplant' ? 'selected' : ''}>🪴 买苗移栽</option>
                                </select>
                            </div>
                            <div class="date-picker-group">
                                <label style="color: #166534; font-size: 1rem;" id="garden-date-label">${defaultMethod === 'transplant' ? '移栽日期：' : '播种日期：'}</label>
                                <input type="date" id="garden-date-input" value="${defaultDate}" style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                            </div>
                            <button id="toggle-garden-btn" class="add-btn">
                                🌱 加入我的菜园
                            </button>
                        </div>
                    </div>
                    <div class="modal-section">
                        <h3>📖 简介背景</h3>
                        <p style="line-height: 1.6; color: #555;">${item.description}</p>
                    </div>
                    <div class="modal-section">
                        <h3>📍 ${regionName} 种植时间安排</h3>
                        <p>${calendarText}</p>
                    </div>
                    <div class="modal-section">
                        <h3>📋 栽培要点与生长周期</h3>
                        <div class="stage-list">
                            ${item.stages.map((stage, index) => {
                                const hasNewStructure = stage.water_fertilizer || stage.pest_management || stage.pruning_trellising;
                                return `
                                <div class="stage-item">
                                    <div class="stage-icon">${stageIcons[index % stageIcons.length]}</div>
                                    <div class="stage-content">
                                        <h4 style="color: var(--primary-color); border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">阶段 ${index + 1}: ${stage.name}</h4>
                                        
                                        ${hasNewStructure ? `
                                            <div class="stage-details" style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
                                                ${stage.water_fertilizer ? `
                                                    <div class="stage-detail-item">
                                                        <strong>💧 水肥管理：</strong>${stage.water_fertilizer}
                                                        ${stage.water_image ? `<img loading="lazy" src="${stage.water_image}" alt="水肥管理" style="width: 50%; max-width: 300px; display: block; margin: 10px 0 5px 0; border-radius: 8px; box-shadow: var(--shadow-sm);">` : ''}
                                                    </div>` : ''}
                                                ${stage.pruning_trellising ? `
                                                    <div class="stage-detail-item">
                                                        <strong>✂️ 整枝搭架：</strong>${stage.pruning_trellising}
                                                        ${stage.pruning_image ? `<img loading="lazy" src="${stage.pruning_image}" alt="整枝搭架" style="width: 50%; max-width: 300px; display: block; margin: 10px 0 5px 0; border-radius: 8px; box-shadow: var(--shadow-sm);">` : ''}
                                                    </div>` : ''}
                                                ${stage.pest_management ? `
                                                    <div class="stage-detail-item">
                                                        <strong>🛡️ 病虫害管理：</strong>${stage.pest_management}
                                                        ${stage.pest_image ? `<img loading="lazy" src="${stage.pest_image}" alt="病虫害管理" style="width: 50%; max-width: 300px; display: block; margin: 10px 0 5px 0; border-radius: 8px; box-shadow: var(--shadow-sm);">` : ''}
                                                    </div>` : ''}
                                                ${stage.content ? `<div class="stage-detail-item"><strong>📌 其他要点：</strong>${stage.content}</div>` : ''}
                                            </div>
                                        ` : `<p>${stage.content}</p>`}
                                        
                                        ${stage.image ? `<img loading="lazy" src="${stage.image}" alt="${stage.name}" style="width: 50%; max-width: 300px; display: block; margin: 15px auto; border-radius: 8px; box-shadow: var(--shadow-sm);">` : ''}
                                    </div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>`;

            if (item.pests && item.pests.length > 0) {
                contentHtml += `
                    <div class="pest-section">
                        <h3><span class="icon">🛡️</span> 病虫害与生态防治</h3>
                        <div class="pest-list">
                            ${item.pests.map(pest => `
                                <div class="pest-item">
                                    <img loading="lazy" src="${pest.image}" alt="${pest.name}" class="pest-img">
                                    <div class="pest-details">
                                        <div class="pest-header">
                                            <h4>${pest.name}</h4>
                                            <div class="pest-tags">
                                                <span class="pest-tag env-${pest.environment || 'universal'}">${pest.environment === 'greenhouse' ? '大棚高发' : (pest.environment === 'open_field' ? '露天高发' : '普遍多发')}</span>
                                                <span class="pest-tag type-${pest.type || (pest.name.includes('病') ? 'disease' : 'pest')}">${(pest.type === 'disease' || pest.name.includes('病')) ? '病害' : '虫害'}</span>
                                            </div>
                                        </div>
                                        ${pest.cause ? `<p class="pest-cause"><strong>🚨 发生原因：</strong>${pest.cause}</p>` : ''}
                                        <p class="pest-prevent"><strong>🌱 生态防治：</strong>${pest.prevention}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
            }
        }

        modalContent.innerHTML = contentHtml;
        
        const methodInput = document.getElementById('garden-method-input');
        const dateLabel = document.getElementById('garden-date-label');
        if (methodInput && dateLabel) {
            methodInput.addEventListener('change', (e) => {
                dateLabel.innerText = e.target.value === 'transplant' ? '移栽日期：' : '播种日期：';
            });
        }
        

        if (item.type === 'fertilizer') {
            const toggleFertBtn = document.getElementById('toggle-fert-btn');
            const fertDateInput = document.getElementById('fert-date-input');
            if (toggleFertBtn) {
                toggleFertBtn.addEventListener('click', () => {
                    const dateVal = fertDateInput ? fertDateInput.value : new Date().toISOString().split('T')[0];
                    const newId = 'f_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
                    
                    myGarden.unshift({ 
                        id: newId, 
                        type: 'fertilizer',
                        fertId: item.id, 
                        startDate: dateVal,
                        isHarvested: false
                    });
                    
                    const originalText = toggleFertBtn.innerHTML;
                    toggleFertBtn.innerHTML = '✅ 添加成功！';
                    setTimeout(() => {
                        toggleFertBtn.innerHTML = '+ 再次添加新批次';
                    }, 1500);

                    saveGarden();
                    const mygardenFertView = document.getElementById('mygarden-fert-view');
                    if (mygardenFertView && mygardenFertView.style.display === 'block') {
                        renderMyFertilizers();
                    }
                });
            }
        }
        if (item.type !== 'fertilizer' && item.type !== 'protection' && item.type !== 'model') {
            const toggleBtn = document.getElementById('toggle-garden-btn');
            const dateInput = document.getElementById('garden-date-input');
            const cityInput = document.getElementById('garden-city-input');

            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    const dateVal = dateInput.value || new Date().toISOString().split('T')[0];
                    const cityVal = cityInput.value || (cities.length > 0 ? cities[0].id : '');
                    const methodVal = methodInput ? methodInput.value : 'sow';
                    const newId = 'g_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
                    
                    myGarden.push({ 
                        id: newId, 
                        vegId: item.id, 
                        plantDate: dateVal, 
                        cityId: cityVal, 
                        method: methodVal 
                    });
                    
                    localStorage.setItem('tubutu_default_city', cityVal);
                    localStorage.setItem('tubutu_default_method', methodVal);
                    
                    const originalText = toggleBtn.innerHTML;
                    toggleBtn.innerHTML = '✅ 添加成功！';

                    setTimeout(() => {
                        toggleBtn.innerHTML = '🌱 再次添加新批次';
                    }, 1500);

                    saveGarden();
                    const myGardenSection = document.getElementById('mygarden-section');
                    if (myGardenSection && myGardenSection.style.display === 'block') {
                        renderMyGarden();
                    }
                });
            }
        }

        document.body.style.overflow = 'hidden';
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Initial Render
    updateRegionDesc();
    renderGrid();
    renderFertilizers();
    renderProtections();
    renderFarmingModels();
    renderCalendar();



    window.toggleQuickAdd = (vegId) => {
        const existingIndex = myGarden.findIndex(g => g.vegId === vegId);
        if (existingIndex >= 0) {
            if (!confirm('确定要从虚拟菜园中移除它吗？您的种植进度将无法恢复。')) return;
            myGarden.splice(existingIndex, 1);
        } else {
            const dateVal = new Date().toISOString().split('T')[0];
            const savedCity = localStorage.getItem('tubutu_default_city');
            const cityVal = savedCity || (cities.length > 0 ? cities[0].id : '');
            const methodVal = localStorage.getItem('tubutu_default_method') || 'sow';
            myGarden.push({
                vegId: vegId,
                plantDate: dateVal,
                cityId: cityVal,
                method: methodVal
            });
        }
        saveGarden();
        renderGrid();
        renderCalendar();
        renderMyGarden();
    };

    
    function getWeatherDataForPlant(cityId, plantDateStr) {
        // Return pre-fetched static data instantly
        return weatherData[cityId] || null;
    }

    function calculatePlantStatus(veg, dailyData, plantDateStr, method) {
        const plantDate = new Date(plantDateStr);
        plantDate.setHours(0,0,0,0);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        let accumulatedGdd = 0;
        
        const getStageGdd = (stage) => {
            if (stage.gdd) return stage.gdd;
            if (stage.days) return stage.days * 15;
            return 150; // Default to ~10 days of GDD if completely unspecified
        };

        let initialGdd = 0;
        if (method === 'transplant' && veg.growthSequence) {
            let seedlingStageIndex = veg.growthSequence.findIndex(s => s.name.includes('幼苗'));
            if (seedlingStageIndex === -1) seedlingStageIndex = 1; 
            for (let i = 0; i < seedlingStageIndex; i++) {
                if (veg.growthSequence[i]) {
                    initialGdd += getStageGdd(veg.growthSequence[i]);
                }
            }
        }
        accumulatedGdd += initialGdd;
        
        let futureAvgGdd = 0;
        let futureDaysCount = 0;
        
        let diffDays = Math.floor((today - plantDate) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) diffDays = 0;
        
        const baseTemp = veg.baseTemp || 10;
        
        const apiFailed = !dailyData || Object.keys(dailyData).length === 0;
        
        if (apiFailed) {
            accumulatedGdd += diffDays * 15;
            futureAvgGdd = 15;
            futureDaysCount = 1;
        } else {
            let daysWithData = 0;
            for (const [dateStr, temps] of Object.entries(dailyData)) {
                const d = new Date(dateStr);
                d.setHours(0,0,0,0);
                
                const gdd = Math.max(0, (temps.max + temps.min) / 2 - baseTemp);
                
                if (d >= plantDate && d < today) {
                    accumulatedGdd += gdd;
                    daysWithData++;
                } else if (d >= today) {
                    futureAvgGdd += gdd;
                    futureDaysCount++;
                }
            }
            
            // Fill missing historical days (e.g., if planted > 90 days ago and static data doesn't go back that far)
            if (daysWithData < diffDays) {
                accumulatedGdd += (diffDays - daysWithData) * 15;
            }
        }
        
        const avgGddPerDay = futureDaysCount > 0 ? (futureAvgGdd / futureDaysCount) : 15;
        
        let currentStageIndex = 0;
        let totalRequiredGdd = 0;
        
        if (veg.growthSequence) {
            for (let i = 0; i < veg.growthSequence.length; i++) {
                totalRequiredGdd += getStageGdd(veg.growthSequence[i]);
                if (accumulatedGdd >= totalRequiredGdd) {
                    currentStageIndex = i + 1;
                }
            }
            if (currentStageIndex >= veg.growthSequence.length) {
                currentStageIndex = veg.growthSequence.length - 1;
            }
        }
        
        let overallTotalGdd = 0;
        if (veg.growthSequence) {
            overallTotalGdd = veg.growthSequence.reduce((sum, stage) => sum + getStageGdd(stage), 0);
        } else {
            overallTotalGdd = 1000;
        }
        
        let remainingGdd = Math.max(0, overallTotalGdd - accumulatedGdd);
        let remainingDays = Math.ceil(remainingGdd / (avgGddPerDay || 15));
        if (currentStageIndex === (veg.growthSequence ? veg.growthSequence.length - 1 : 0)) {
            remainingDays = 0; // Already mature
        }
        
        return { accumulatedGdd, overallTotalGdd, remainingDays, currentStageIndex, diffDays, baseTemp, apiFailed };
    }

    async function renderMyGarden() {
        const grid = document.getElementById('mygarden-grid');
        const emptyMsg = document.getElementById('mygarden-empty-msg');
        if (!grid) return;
        
        const activeGarden = myGarden.filter(g => !g.isHarvested && g.type !== 'fertilizer');
        
        if (activeGarden.length === 0) {
            grid.innerHTML = '';
            emptyMsg.style.display = 'block';
            return;
        }
        
        emptyMsg.style.display = 'none';
        grid.innerHTML = '';
        
        const filteredGarden = activeGarden;
        
        const cardsHtml = [];
        
        for (let index = 0; index < filteredGarden.length; index++) {
            const gardenItem = filteredGarden[index];
            const veg = vegetables.find(v => v.id === gardenItem.vegId);
            if (!veg) continue;
            
            const city = cities.find(c => c.id === gardenItem.cityId);
            const cityName = city ? city.name : '未知地区';
            
            const dailyData = getWeatherDataForPlant(gardenItem.cityId, gardenItem.plantDate);
            
            const status = calculatePlantStatus(veg, dailyData || {}, gardenItem.plantDate, gardenItem.method);
            
            let timelineHtml = '';
            if (veg.growthSequence && veg.growthSequence.length > 0) {
                timelineHtml = '<div class="growth-timeline">';
                veg.growthSequence.forEach((stage, idx) => {
                    let statusClass = '';
                    if (idx < status.currentStageIndex) statusClass = 'past';
                    else if (idx === status.currentStageIndex) statusClass = 'current';
                    else statusClass = 'future';
                    
                    timelineHtml += `
                        <div class="timeline-stage ${statusClass}">
                            <img loading="lazy" src="${stage.image}" alt="${stage.name}" class="timeline-img">
                            <span class="timeline-label">${stage.name}</span>
                        </div>
                    `;
                });
                timelineHtml += '</div>';
            }
            
            const categoryGradients = {
                leafy: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                root: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                fruit: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
                legume: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                allium: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
            };
            const bgGradient = categoryGradients[veg.categoryId] || 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
            const imgHtml = veg.image 
                ? `<img loading="lazy" src="${veg.image}" alt="${veg.name}" class="mygarden-main-img" onclick="openTodoHarvestModal('${gardenItem.id}')" style="cursor: pointer;" title="点击查看施肥与采收清单">`
                : `<div class="mygarden-main-img" onclick="openTodoHarvestModal('${gardenItem.id}')" style="background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 5rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1); cursor: pointer;" title="点击查看施肥与采收清单">${veg.icon}</div>`;

            let gddPercentage = Math.min(100, (status.accumulatedGdd / status.overallTotalGdd) * 100).toFixed(1);

            let reminderHtml = '';
            if (veg.fertilizerSchedule && Array.isArray(veg.fertilizerSchedule)) {
                const currentFert = veg.fertilizerSchedule.filter(f => f.stageIndex === status.currentStageIndex);
                if (currentFert.length > 0) {
                    currentFert.forEach(f => {
                        const stageName = veg.growthSequence[status.currentStageIndex] ? veg.growthSequence[status.currentStageIndex].name : '当前阶段';
                        const todoKey = 'fert_' + f.stageIndex;
                        const isChecked = gardenItem.completedTodos && gardenItem.completedTodos[todoKey];
                        const checkedStyle = isChecked ? 'filter: grayscale(1); opacity: 0.5;' : '';
                        const remarkText = gardenItem.remarks && gardenItem.remarks[todoKey] ? gardenItem.remarks[todoKey] : '';
                        
                        reminderHtml += `
                        <div style="margin-top: 15px; background: #fdfbf7; border: 1px solid #f3e8d2; border-radius: 12px; padding: 12px;">
                            <div style="color: #b45309; font-weight: bold; margin-bottom: 8px; font-size: 0.95rem;">🧪 施肥提醒清单 (待办)</div>
                            <div style="display: flex; align-items: center; background: white; padding: 12px 15px; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: all 0.3s ease; ${checkedStyle}">
                                <div style="flex: 0 0 auto; display: flex; align-items: center;">
                                    <input type="checkbox" onchange="toggleFertTodo('${gardenItem.id}', ${f.stageIndex})" ${isChecked ? 'checked' : ''} style="margin-right: 10px; width: 18px; height: 18px; accent-color: #10b981; cursor: pointer; flex-shrink: 0;">
                                    <span style="font-weight: 500; color: #4b5563; white-space: nowrap;">${f.actionName}</span>
                                    <span style="font-size: 0.85rem; color: #9ca3af; margin-left: 8px; white-space: nowrap;">(对应: ${stageName})</span>
                                </div>
                                <div style="width: 1px; background: #e5e7eb; height: 30px; margin: 0 15px; flex-shrink: 0;"></div>
                                <div style="flex: 1 1 auto; font-size: 0.9rem; color: #6b7280; line-height: 1.4; word-break: break-word;">
                                    <span style="color: #ea580c; font-weight: bold; background: #fff7ed; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; border: 1px solid #ffedd5;">每株用量：${f.dosagePerPlant}</span><span style="margin-left: 6px;">${f.fertilizerType}</span><br>
                                    <div style="margin-top: 4px;">有机替代: ${f.organicAlternative}</div>
                                    <div style="margin-top: 6px;">
                                        <input type="text" placeholder="📝 添加备注..." value="${remarkText}" onchange="saveFertRemark('${gardenItem.id}', ${f.stageIndex}, this.value)" style="width: 100%; padding: 4px 8px; border: 1px dashed #d1d5db; border-radius: 6px; font-size: 0.8rem; color: #4b5563; background: transparent; transition: all 0.2s; outline: none;" onfocus="this.style.border='1px dashed #10b981'; this.style.background='white';" onblur="this.style.border='1px dashed #d1d5db'; this.style.background='transparent';">
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    });
                }
            }
            if (veg.pruning && Array.isArray(veg.pruning)) {
                const currentPrune = veg.pruning.filter(p => p.stageIndex === status.currentStageIndex);
                if (currentPrune.length > 0) {
                    currentPrune.forEach(p => {
                        reminderHtml += `<div style="background: #f0fdf4; border: 1px solid #dcfce7; border-left: 4px solid #16a34a; padding: 10px 15px; margin: 15px 0 5px 0; border-radius: 4px;">
                            <div style="color: #166534; font-weight: bold; margin-bottom: 5px; font-size: 0.95rem;">✂️ 整枝提醒：当前处于【${(veg.growthSequence[status.currentStageIndex] ? veg.growthSequence[status.currentStageIndex].name : '当前阶段')}】</div>
                            <div style="color: #14532d; font-size: 0.9rem;">操作建议：${p.instruction}</div>
                        </div>`;
                    });
                }
            }

            let operationsHtml = '';
            const ops = gardenItem.operations || [];
            if (ops.length > 0) {
                const sortedOps = [...ops].sort((a, b) => new Date(b.date) - new Date(a.date));
                const typeMap = {
                    'water': { icon: '<img loading="lazy" src="assets/icons/op_water.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '浇水' },
                    'weed': { icon: '<img loading="lazy" src="assets/icons/op_weed.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '除草' },
                    'fertilize': { icon: '<img loading="lazy" src="assets/icons/op_fertilize.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '施肥' },
                    'pest': { icon: '<img loading="lazy" src="assets/icons/op_pest.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '杀虫' },
                    'prune': { icon: '<img loading="lazy" src="assets/icons/op_prune.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '修剪' },
                    'trellis': { icon: '<img loading="lazy" src="assets/icons/op_trellis.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '搭架' },
                    'pollinate': { icon: '<img loading="lazy" src="assets/icons/op_pollinate.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '授粉' },
                    'turn': { icon: '<div style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; margin-right:2px; vertical-align:middle; font-size:14px;">🔄</div>', label: '翻堆' },
                    'vent': { icon: '<div style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; margin-right:2px; vertical-align:middle; font-size:14px;">💨</div>', label: '放气' },
                    'other': { icon: '<img loading="lazy" src="assets/icons/op_other.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '其他' }
                };
                operationsHtml = `
                    <div class="operations-timeline">
                        <div class="operations-timeline-title">📝 农事记录</div>
                        <div class="op-list">
                            ${sortedOps.map(op => {
                                const t = typeMap[op.type] || typeMap['other'];
                                return `
                                    <div class="op-item">
                                        <div class="op-marker"></div>
                                        <div class="op-date">${op.date} <span class="op-type-badge">${t.icon} ${t.label}</span></div>
                                        ${op.remark ? `<div class="op-remark">${op.remark}</div>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            } else {
                 operationsHtml = `
                    <div class="operations-timeline">
                        <div class="operations-timeline-title">📝 农事记录</div>
                        <p style="color: #9ca3af; font-size: 0.9rem; margin-top: 5px;">暂无记录，点击下方按钮添加。</p>
                    </div>
                 `;
            }
            operationsHtml += `
                <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                    <button class="add-op-btn" onclick="openOperationModal('${gardenItem.id}')" style="flex: 1; min-width: 120px; width: auto;">➕ 添加农事记录</button>
                    <button class="harvest-record-btn" onclick="openHarvestModal('${gardenItem.id}')" style="background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; padding: 12px 16px; border-radius: 16px; font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; flex: 1; min-width: 120px; transition: all 0.2s ease;" onmouseover="this.style.background='#dcfce7'" onmouseout="this.style.background='#f0fdf4'">
                        🍓 记录单次采收
                    </button>
                    <button class="harvest-btn" data-id="${gardenItem.id}" style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; padding: 12px 16px; border-radius: 16px; font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; flex: 1; min-width: 120px; transition: all 0.2s ease;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#fef2f2'">
                        🛑 结束种植(移至历史)
                    </button>
                </div>
            `;

            let harvestBadgeHtml = '';
            if (gardenItem.harvests && gardenItem.harvests.length > 0) {
                let totalAmount = 0;
                let unit = gardenItem.harvests[0].unit || '公斤';
                gardenItem.harvests.forEach(h => {
                    totalAmount += parseFloat(h.amount || 0);
                });
                harvestBadgeHtml = `
                    <span class="harvest-total-badge" onclick="openTodoHarvestModal('${gardenItem.id}')" style="background: #fff1f2; color: #be123c; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: transform 0.1s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        📦 已累计采收: ${totalAmount.toFixed(1)} ${unit} (点击查看)
                    </span>
                `;
            }

            const cardHtml = `
                <div class="mygarden-card" style="position: relative;">
                    <button class="remove-garden-item-btn" title="移出菜园" data-id="${gardenItem.id}" style="position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #ef4444; font-size: 0.9rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;">❌</button>
                    <div class="row-number">${index + 1}</div>
                    ${imgHtml}
                    <div class="veg-info">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                            <h3 style="margin: 0; font-size: 1.3rem;">${veg.name}</h3>
                            <span style="font-size: 0.9rem; color: #555;">📍 ${cityName} | ${gardenItem.plantDate} ${gardenItem.method === 'transplant' ? '移栽' : '播种'}</span>
                        </div>
                        <div class="garden-status" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                            <span class="days-badge">已${gardenItem.method === 'transplant' ? '移栽' : '播种'} ${status.diffDays} 天</span>
                            <span class="gdd-badge" style="background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                                🌡️ 生物学起点: ${status.baseTemp}°C
                            </span>
                            <span class="gdd-badge" style="background: ${status.apiFailed ? '#fee2e2' : '#fffedd'}; color: ${status.apiFailed ? '#991b1b' : '#854d0e'}; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                                ☀️ 积温: ${Math.floor(status.accumulatedGdd)} / ${status.overallTotalGdd}°C (${gddPercentage}%) ${status.apiFailed ? '<span style="font-size: 0.75rem; opacity: 0.8;">(气象接口异常，使用估算)</span>' : ''}
                            </span>
                            <span class="gdd-badge" style="background: ${status.remainingDays === 0 ? '#dcfce7' : '#fee2e2'}; color: ${status.remainingDays === 0 ? '#166534' : '#991b1b'}; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                                ⏳ ${status.remainingDays === 0 ? '已完全成熟' : `预估剩余: 约 ${status.remainingDays} 天`}
                            </span>
                            ${harvestBadgeHtml}
                        </div>
                        ${timelineHtml}
                        ${reminderHtml}
                        ${operationsHtml}
                    </div>
                </div>
            `;
            cardsHtml.push({ html: cardHtml, veg: veg, gardenItem: gardenItem });
        }
        
        grid.innerHTML = '';
        cardsHtml.forEach(c => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = c.html.trim();
            const cardEl = wrapper.firstChild;
            const removeBtn = cardEl.querySelector('.remove-garden-item-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('确定要移出这个播期的记录吗？相关农事记录将被一起删除。')) {
                        const targetId = removeBtn.dataset.id;
                        myGarden = myGarden.filter(g => g.id !== targetId);
                        saveGarden();
                        renderMyGarden();
                    }
                });
            }

            cardEl.addEventListener('click', (e) => {
                if (e.target.closest('.add-op-btn') || e.target.closest('.remove-garden-item-btn') || e.target.closest('.harvest-btn') || e.target.closest('.harvest-record-btn') || e.target.closest('.harvest-total-badge')) return;
                openTodoHarvestModal(c.gardenItem.id);
            });

            // The add-op-btn uses an inline onclick handler now.

            const harvestBtn = cardEl.querySelector('.harvest-btn');
            if (harvestBtn) {
                harvestBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('确定这批作物已经采收完毕了吗？它将被移入收获历史记录中。')) {
                        const targetId = harvestBtn.dataset.id;
                        const item = myGarden.find(g => g.id === targetId);
                        if (item) {
                            item.isHarvested = true;
                            item.harvestDate = new Date().toISOString().split('T')[0];
                            saveGarden();
                            renderMyGarden();
                        }
                    }
                });
            }

            grid.appendChild(cardEl);
        });
    }

    
    window.deleteFertRecord = function(id) {
        if(confirm('确定删除此制作记录吗？')) {
            const idx = myGarden.findIndex(g => g.id === id);
            if(idx !== -1) {
                myGarden.splice(idx, 1);
                saveGarden();
                renderMyFertilizers();
            }
        }
    };
    
    window.finishFertRecord = function(id) {
        if(confirm('恭喜！肥料制作完成了，要归档吗？')) {
            const idx = myGarden.findIndex(g => g.id === id);
            if(idx !== -1) {
                myGarden[idx].isHarvested = true;
                myGarden[idx].endDate = new Date().toISOString();
                saveGarden();
                renderMyFertilizers();
            }
        }
    };

    function renderMyFertilizers() {
        const grid = document.getElementById('mygarden-fert-grid');
        const emptyMsg = document.getElementById('fert-empty-msg');
        if (!grid) return;
        
        const activeFerts = myGarden.filter(g => g.type === 'fertilizer' && !g.isHarvested);
        
        if (activeFerts.length === 0) {
            grid.innerHTML = '';
            emptyMsg.style.display = 'block';
            return;
        }
        
        emptyMsg.style.display = 'none';
        
        let cardsHtml = '';
        
        for (let i = 0; i < activeFerts.length; i++) {
            const record = activeFerts[i];
            const fert = fertilizers.find(f => f.id === (record.fertId || record.vegId));
            if (!fert) continue;
            
            const startDateStr = record.startDate ? record.startDate.split('T')[0] : '未知时间';
            const daysPassed = record.startDate ? Math.floor((new Date() - new Date(record.startDate)) / (1000 * 60 * 60 * 24)) : 0;
            

            let currentStageIndex = 0;
            const totalDays = fert.id === 'eco_enzyme' ? 90 : (fert.id === 'aerobic_compost' ? 60 : 45);
            const displaySequence = fert.transformationSequence || fert.stages;
            if (daysPassed > 0) {
                currentStageIndex = Math.floor((daysPassed / totalDays) * displaySequence.length);
                if (currentStageIndex >= displaySequence.length) currentStageIndex = displaySequence.length - 1;
            }
            
            const progressPercent = Math.min(100, (daysPassed / totalDays) * 100);
            const remainingDays = Math.max(0, totalDays - daysPassed);
            
            const progressHtml = `
                <div style="background: #f1f5f9; border-radius: 8px; padding: 12px; margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #64748b; margin-bottom: 5px;">
                        <span>发酵熟成进度</span>
                        <span>${Math.round(progressPercent)}%</span>
                    </div>
                    <div class="progress-bar-bg" style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                        <div class="progress-bar-fill" style="height: 100%; width: ${progressPercent}%; background: var(--primary); transition: width 1s ease-out;"></div>
                    </div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: #64748b; display: flex; justify-content: space-between;">
                        <span>当前状态: ${displaySequence[currentStageIndex].name}</span>
                        <span style="color: var(--primary-dark); font-weight: 500;">⏳ 预估距熟成约 ${remainingDays} 天</span>
                    </div>
                </div>
            `;

            let timelineHtml = '<div class="growth-timeline">';
            displaySequence.forEach((stage, idx) => {
                let statusClass = '';
                if (idx < currentStageIndex) statusClass = 'past';
                else if (idx === currentStageIndex) statusClass = 'current';
                else statusClass = 'future';
                
                timelineHtml += `
                    <div class="timeline-stage ${statusClass}">
                        <img loading="lazy" src="${stage.image}" alt="${stage.name}" class="timeline-img">
                        <span class="timeline-label">${stage.name}</span>
                    </div>
                `;
            });
            timelineHtml += '</div>';

            let operationsHtml = '';
            const ops = record.operations || [];
            if (ops.length > 0) {
                const sortedOps = [...ops].sort((a, b) => new Date(b.date) - new Date(a.date));
                const typeMap = {
                    'water': { icon: '<img loading="lazy" src="assets/icons/op_water.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '浇水' },
                    'weed': { icon: '<img loading="lazy" src="assets/icons/op_weed.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '除草' },
                    'fertilize': { icon: '<img loading="lazy" src="assets/icons/op_fertilize.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '施肥' },
                    'pest': { icon: '<img loading="lazy" src="assets/icons/op_pest.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '杀虫' },
                    'prune': { icon: '<img loading="lazy" src="assets/icons/op_prune.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '修剪' },
                    'trellis': { icon: '<img loading="lazy" src="assets/icons/op_trellis.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '搭架' },
                    'pollinate': { icon: '<img loading="lazy" src="assets/icons/op_pollinate.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '授粉' },
                    'turn': { icon: '<div style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; margin-right:2px; vertical-align:middle; font-size:14px;">🔄</div>', label: '翻堆' },
                    'vent': { icon: '<div style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; margin-right:2px; vertical-align:middle; font-size:14px;">💨</div>', label: '放气' },
                    'other': { icon: '<img loading="lazy" src="assets/icons/op_other.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '其他' }
                };
                operationsHtml = `
                    <div class="operations-timeline">
                        <div class="operations-timeline-title">📝 农事记录</div>
                        <div class="op-list">
                            ${sortedOps.map(op => {
                                const t = typeMap[op.type] || typeMap['other'];
                                return `
                                    <div class="op-item">
                                        <div class="op-marker"></div>
                                        <div class="op-date">${op.date} <span class="op-type-badge">${t.icon} ${t.label}</span></div>
                                        ${op.remark ? `<div class="op-remark">${op.remark}</div>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            } else {
                 operationsHtml = `
                    <div class="operations-timeline">
                        <div class="operations-timeline-title">📝 农事记录</div>
                        <p style="color: #9ca3af; font-size: 0.9rem; margin-top: 5px;">暂无记录，点击下方按钮添加。</p>
                    </div>
                 `;
            }
            operationsHtml += `
                <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                    <button class="add-op-btn" onclick="openOperationModal('${record.id}')" style="flex: 1; min-width: 120px; width: auto;">➕ 添加农事记录</button>
                    <button class="harvest-btn" onclick="finishFertRecord('${record.id}')" style="background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; padding: 12px 16px; border-radius: 16px; font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; flex: 1; min-width: 120px; transition: all 0.2s ease;" onmouseover="this.style.background='#dcfce7'" onmouseout="this.style.background='#f0fdf4'">
                        ✅ 标记为制作完成
                    </button>
                </div>
            `;
            const bgGradient = 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
            const imgHtml = fert.image 
                ? `<img loading="lazy" src="${fert.image}" alt="${fert.name}" class="mygarden-main-img">`
                : `<div class="mygarden-main-img" style="background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 5rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1);">${fert.icon}</div>`;

            cardsHtml += `
                <div class="mygarden-card" style="position: relative;">
                    <button class="remove-garden-item-btn" title="删除记录" onclick="deleteFertRecord('${record.id}')" style="position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #ef4444; font-size: 0.9rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;">❌</button>
                    <div class="row-number">${i + 1}</div>
                    ${imgHtml}
                    
                    <div class="veg-info">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                            <h3 style="margin: 0; font-size: 1.3rem;">${fert.name}</h3>
                            <span style="font-size: 0.9rem; color: #555;">📍 开始制作: ${startDateStr}</span>
                        </div>
                        <div class="garden-status" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                            <span class="days-badge">已进行 ${daysPassed} 天</span>
                            <span class="gdd-badge" style="background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                                🌡️ 适宜发酵温度: 15-25°C
                            </span>
                        </div>
                        

                        ${progressHtml}
                        ${timelineHtml}
                        ${operationsHtml}
                    </div>
                </div>
            `;
        }
        grid.innerHTML = cardsHtml;
    }

    async function renderHistory() {
        const grid = document.getElementById('history-grid');
        const emptyMsg = document.getElementById('history-empty-msg');
        if (!grid) return;
        
        const historyGarden = myGarden.filter(g => g.isHarvested && g.type !== 'fertilizer');
        
        if (historyGarden.length === 0) {
            grid.innerHTML = '';
            emptyMsg.style.display = 'block';
            return;
        }
        
        emptyMsg.style.display = 'none';
        grid.innerHTML = '';
        
        const filteredHistory = historyGarden;
        
        const cardsHtml = [];
        
        for (let index = 0; index < filteredHistory.length; index++) {
            const gardenItem = filteredHistory[index];
            const veg = vegetables.find(v => v.id === gardenItem.vegId);
            if (!veg) continue;
            
            const city = cities.find(c => c.id === gardenItem.cityId);
            const cityName = city ? city.name : '未知地区';
            
            const categoryGradients = {
                leafy: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                root: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                fruit: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
                legume: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                allium: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
            };
            const bgGradient = categoryGradients[veg.categoryId] || 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
            const imgHtml = veg.image 
                ? `<img loading="lazy" src="${veg.image}" alt="${veg.name}" class="mygarden-main-img" style="filter: grayscale(30%);">`
                : `<div class="mygarden-main-img" style="background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 5rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1); filter: grayscale(30%);">${veg.icon}</div>`;

            let operationsHtml = '';
            const ops = gardenItem.operations || [];
            if (ops.length > 0) {
                const sortedOps = [...ops].sort((a, b) => new Date(b.date) - new Date(a.date));
                const typeMap = {
                    'water': { icon: '<img loading="lazy" src="assets/icons/op_water.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '浇水' },
                    'weed': { icon: '<img loading="lazy" src="assets/icons/op_weed.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '除草' },
                    'fertilize': { icon: '<img loading="lazy" src="assets/icons/op_fertilize.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '施肥' },
                    'pest': { icon: '<img loading="lazy" src="assets/icons/op_pest.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '杀虫' },
                    'prune': { icon: '<img loading="lazy" src="assets/icons/op_prune.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '修剪' },
                    'trellis': { icon: '<img loading="lazy" src="assets/icons/op_trellis.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '搭架' },
                    'pollinate': { icon: '<img loading="lazy" src="assets/icons/op_pollinate.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '授粉' },
                    'turn': { icon: '<div style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; margin-right:2px; vertical-align:middle; font-size:14px;">🔄</div>', label: '翻堆' },
                    'vent': { icon: '<div style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; margin-right:2px; vertical-align:middle; font-size:14px;">💨</div>', label: '放气' },
                    'other': { icon: '<img loading="lazy" src="assets/icons/op_other.png?v=1" style="width:16px;height:16px;vertical-align:middle;margin-right:2px;border-radius:2px;">', label: '其他' }
                };
                operationsHtml = `
                    <div class="operations-timeline">
                        <div class="operations-timeline-title">📝 历史农事记录</div>
                        <div class="op-list">
                            ${sortedOps.map(op => {
                                const t = typeMap[op.type] || typeMap['other'];
                                return `
                                    <div class="op-item">
                                        <div class="op-marker"></div>
                                        <div class="op-date">${op.date} <span class="op-type-badge">${t.icon} ${t.label}</span></div>
                                        ${op.remark ? `<div class="op-remark">${op.remark}</div>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            const cardHtml = `
                <div class="mygarden-card" style="position: relative; opacity: 0.9;">
                    <div class="row-number">🏆</div>
                    ${imgHtml}
                    <div class="veg-info">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                            <h3 style="margin: 0; font-size: 1.3rem;">${veg.name}</h3>
                            <span style="font-size: 0.9rem; color: #555;">📍 ${cityName} | ${gardenItem.plantDate} ${gardenItem.method === 'transplant' ? '移栽' : '播种'}</span>
                        </div>
                        <div class="garden-status" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                            <span class="days-badge" style="background: #f3f4f6; color: #374151;">已于 ${gardenItem.harvestDate} 采收完毕</span>
                        </div>
                        ${operationsHtml}
                    </div>
                </div>
            `;
            cardsHtml.push({ html: cardHtml, veg: veg, gardenItem: gardenItem });
        }
        
        cardsHtml.forEach(c => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = c.html.trim();
            const cardEl = wrapper.firstChild;
            grid.appendChild(cardEl);
        });
    }

    // Op Modal Logic
    const opModalOverlay = document.getElementById('op-modal-overlay');
    const opCloseBtn = document.getElementById('op-close-btn');
    const opDateInput = document.getElementById('op-date-input');
    const opRemarkInput = document.getElementById('op-remark-input');
    const opSaveBtn = document.getElementById('op-save-btn');
    // opTypeBtns are now dynamically populated in openOperationModal

    if (opCloseBtn) {
        opCloseBtn.addEventListener('click', () => {
            if (opModalOverlay) opModalOverlay.classList.remove('active');
        });
    }

    window.openOperationModal = function(gardenItemId) {
        currentOpGardenItemId = gardenItemId;
        if (opDateInput) opDateInput.value = new Date().toISOString().split('T')[0];
        if (opRemarkInput) opRemarkInput.value = '';
        const currentItem = myGarden.find(g => g.id === gardenItemId);
        const isFert = currentItem && currentItem.type === 'fertilizer';

        const opTypeSelector = document.getElementById('op-type-selector');
        if (opTypeSelector) {
            opTypeSelector.innerHTML = '';
            let opTypes = [];
            if (isFert) {
                opTypes = [
                    { id: 'turn', name: '翻堆', icon: '🔄' },
                    { id: 'vent', name: '放气', icon: '💨' },
                    { id: 'other', name: '其他', img: 'assets/icons/op_other.png?v=1' }
                ];
            } else {
                opTypes = [
                    { id: 'water', name: '浇水', img: 'assets/icons/op_water.png?v=1' },
                    { id: 'weed', name: '除草', img: 'assets/icons/op_weed.png?v=1' },
                    { id: 'fertilize', name: '施肥', img: 'assets/icons/op_fertilize.png?v=1' },
                    { id: 'pest', name: '杀虫', img: 'assets/icons/op_pest.png?v=1' },
                    { id: 'prune', name: '修剪', img: 'assets/icons/op_prune.png?v=1' },
                    { id: 'trellis', name: '搭架', img: 'assets/icons/op_trellis.png?v=1' },
                    { id: 'pollinate', name: '授粉', img: 'assets/icons/op_pollinate.png?v=1' },
                    { id: 'other', name: '其他', img: 'assets/icons/op_other.png?v=1' }
                ];
            }
            
            opTypes.forEach((type, index) => {
                const btn = document.createElement('div');
                btn.className = `op-type-btn ${index === 0 ? 'active' : ''}`;
                btn.dataset.type = type.id;
                
                let iconHtml = type.img 
                    ? `<img loading="lazy" src="${type.img}" class="op-icon-large" style="width:36px; height:36px; object-fit:contain; margin-bottom:4px;">`
                    : `<div style="font-size: 28px; height: 36px; display: flex; align-items: center; justify-content: center; margin-bottom: 4px;">${type.icon}</div>`;
                    
                btn.innerHTML = `${iconHtml}<span class="op-type-text">${type.name}</span>`;
                
                btn.addEventListener('click', () => {
                    opTypeSelector.querySelectorAll('.op-type-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
                
                opTypeSelector.appendChild(btn);
            });
        }

        const cropSelector = document.getElementById('op-crop-selector');
        if (cropSelector) {
            cropSelector.innerHTML = '';
            myGarden.forEach(g => {
                const isItemFert = g.type === 'fertilizer';
                if (isFert !== isItemFert) return;

                let displayName = '';
                if (isItemFert) {
                    const f = fertilizers.find(f => f.id === g.fertId) || { name: g.fertId };
                    displayName = f.name;
                } else {
                    const v = vegetables.find(v => v.id === g.vegId) || { name: g.vegId };
                    displayName = v.name;
                }

                const tag = document.createElement('div');
                tag.className = 'crop-select-tag';
                if (g.id === gardenItemId) {
                    tag.classList.add('active');
                }
                tag.dataset.id = g.id;
                tag.innerHTML = `<span class="checkmark">✓</span> ${displayName} (${g.plantDate})`;
                tag.addEventListener('click', () => {
                    tag.classList.toggle('active');
                    if (cropSelector.querySelectorAll('.crop-select-tag.active').length === 0) {
                        tag.classList.add('active');
                    }
                });
                cropSelector.appendChild(tag);
            });
        }

        if (opModalOverlay) opModalOverlay.classList.add('active');
    };

    if (opSaveBtn) {
        opSaveBtn.addEventListener('click', () => {
            if (!opDateInput) return;
            const dateVal = opDateInput.value;
            const remarkVal = opRemarkInput ? opRemarkInput.value.trim() : '';
            const activeBtn = document.querySelector('.op-type-btn.active');
            const typeVal = activeBtn ? activeBtn.dataset.type : 'other';

            if (!dateVal) {
                alert('请选择操作日期');
                return;
            }

            const cropSelector = document.getElementById('op-crop-selector');
            let targetGardenItemIds = [currentOpGardenItemId];
            if (cropSelector) {
                const activeTags = cropSelector.querySelectorAll('.crop-select-tag.active');
                if (activeTags.length > 0) {
                    targetGardenItemIds = Array.from(activeTags).map(t => t.dataset.id);
                }
            }

            let updated = false;
            myGarden.forEach(g => {
                if (targetGardenItemIds.includes(g.id)) {
                    if (!g.operations) {
                        g.operations = [];
                    }
                    g.operations.push({
                        id: Date.now().toString() + '_' + Math.random().toString(36).substring(7),
                        date: dateVal,
                        type: typeVal,
                        remark: remarkVal
                    });
                    updated = true;
                }
            });

            if (updated) {
                saveGarden();
                if (opModalOverlay) opModalOverlay.classList.remove('active');
                renderMyGarden();
            }
        });
    }

    // --- Image Lightbox Logic ---
    const lightboxOverlay = document.getElementById('image-lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    document.body.addEventListener('click', (e) => {
        // Enlarge ONLY pest images
        if (e.target.tagName === 'IMG' && (e.target.classList.contains('pest-img') || e.target.closest('.pest-img'))) {
            if (lightboxOverlay && lightboxImg) {
                lightboxImg.src = e.target.src;
                lightboxOverlay.classList.add('active');
            }
        }
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', () => {
            if (lightboxOverlay) lightboxOverlay.classList.remove('active');
        });
    }

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                lightboxOverlay.classList.remove('active');
            }
        });
    }

    
    // --- Harvest Record Logic ---
    window.openHarvestModal = function(gardenId) {
        document.getElementById('harvest-garden-id').value = gardenId;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        document.getElementById('harvest-date').value = `${yyyy}-${mm}-${dd}`;
        
        // Auto select unit based on previous harvest if exists
        const item = myGarden.find(i => i.id === gardenId);
        if (item && item.harvests && item.harvests.length > 0) {
            document.getElementById('harvest-unit').value = item.harvests[0].unit || '公斤';
        }
        
        document.getElementById('harvest-amount').value = '';
        document.getElementById('harvest-input-overlay').classList.add('active');
    };

    document.getElementById('harvest-input-close-btn').addEventListener('click', () => {
        document.getElementById('harvest-input-overlay').classList.remove('active');
    });

    document.getElementById('harvest-submit-btn').addEventListener('click', () => {
        const gardenId = document.getElementById('harvest-garden-id').value;
        const date = document.getElementById('harvest-date').value;
        const amount = parseFloat(document.getElementById('harvest-amount').value);
        const unit = document.getElementById('harvest-unit').value;

        if (!date || isNaN(amount) || amount <= 0) {
            alert('请填写正确的日期和数量！');
            return;
        }

        const item = myGarden.find(i => i.id === gardenId);
        if (item) {
            if (!item.harvests) {
                item.harvests = [];
            }
            item.harvests.push({
                date: date,
                amount: amount,
                unit: unit
            });
            // Sort harvests by date descending
            item.harvests.sort((a, b) => new Date(b.date) - new Date(a.date));
            saveGarden();
            document.getElementById('harvest-input-overlay').classList.remove('active');
            renderMyGarden();
        }
    });

    // --- Combined To-Do and Harvest Modal Logic ---
    window.saveFertRemark = function(gardenId, stageIndex, remark) {
        const item = myGarden.find(i => i.id === gardenId);
        if (item) {
            item.remarks = item.remarks || {};
            item.remarks['fert_' + stageIndex] = remark;
            saveMyGarden();
        }
    };

    window.toggleFertTodo = function(gardenId, stageIndex) {
        const item = myGarden.find(i => i.id === gardenId);
        if (item) {
            item.completedTodos = item.completedTodos || {};
            item.completedTodos['fert_' + stageIndex] = !item.completedTodos['fert_' + stageIndex];
            saveMyGarden();
            renderMyGarden();
            // Re-render modal list if open
            if (document.getElementById('todo-harvest-overlay').classList.contains('active')) {
                openTodoHarvestModal(gardenId);
            }
        }
    };

    window.openTodoHarvestModal = function(gardenId) {
        const item = myGarden.find(i => i.id === gardenId);
        if (!item) return;
        const vegInfo = vegetables.find(v => v.id === item.vegId);
        if (!vegInfo) return;

        document.getElementById('todo-harvest-title').innerHTML = `${vegInfo.icon || '🌱'} ${vegInfo.name} - 待办清单与产量`;

        // Calculate current status for fertilizer checks
        const dailyData = getWeatherDataForPlant(item.cityId, item.plantDate);
        const status = calculatePlantStatus(vegInfo, dailyData, item.plantDate, item.method);

        // 1. To-Do List Render
        const todoList = document.getElementById('todo-fertilizer-list');
        if (vegInfo.fertilizerSchedule && vegInfo.fertilizerSchedule.length > 0) {
            todoList.innerHTML = vegInfo.fertilizerSchedule.map(fert => {
                const stageName = vegInfo.growthSequence[fert.stageIndex]?.name || '特定阶段';
                const todoKey = 'fert_' + fert.stageIndex;
                const isChecked = item.completedTodos && item.completedTodos[todoKey];
                const checkedStyle = isChecked ? 'filter: grayscale(1); opacity: 0.5;' : '';
                const remarkText = item.remarks && item.remarks[todoKey] ? item.remarks[todoKey] : '';
                return `
                    <div style="display: flex; align-items: center; background: white; margin-top: 8px; padding: 12px 15px; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: all 0.3s ease; ${checkedStyle}">
                        <div style="flex: 0 0 auto; display: flex; align-items: center;">
                            <input type="checkbox" onchange="toggleFertTodo('${item.id}', ${fert.stageIndex})" ${isChecked ? 'checked' : ''} style="margin-right: 10px; width: 18px; height: 18px; accent-color: #10b981; cursor: pointer; flex-shrink: 0;">
                            <span style="font-weight: 500; color: #4b5563; white-space: nowrap;">${fert.actionName}</span>
                            <span style="font-size: 0.85rem; color: #9ca3af; margin-left: 8px; white-space: nowrap;">(对应: ${stageName})</span>
                        </div>
                        <div style="width: 1px; background: #e5e7eb; height: 30px; margin: 0 15px; flex-shrink: 0;"></div>
                        <div style="flex: 1 1 auto; font-size: 0.9rem; color: #6b7280; line-height: 1.4; word-break: break-word;">
                            ${fert.dosagePerPlant} ${fert.fertilizerType}<br>
                            有机替代: ${fert.organicAlternative}
                            <div style="margin-top: 6px;">
                                <input type="text" placeholder="📝 添加备注..." value="${remarkText}" onchange="saveFertRemark('${item.id}', ${fert.stageIndex}, this.value)" style="width: 100%; padding: 4px 8px; border: 1px dashed #d1d5db; border-radius: 6px; font-size: 0.8rem; color: #4b5563; background: transparent; transition: all 0.2s; outline: none;" onfocus="this.style.border='1px dashed #10b981'; this.style.background='white';" onblur="this.style.border='1px dashed #d1d5db'; this.style.background='transparent';">
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            todoList.innerHTML = '<div style="color:#9ca3af;font-size:0.9rem;">暂无特定的施肥提醒计划</div>';
        }

        // 2. Harvest Render
        const statsDashboard = document.getElementById('todo-harvest-stats');
        const chartContainer = document.getElementById('todo-harvest-chart-container');
        const listContainer = document.getElementById('todo-harvest-list');
        const emptyMsg = document.getElementById('todo-harvest-empty-msg');
        
        if (item.harvests && item.harvests.length > 0) {
            statsDashboard.style.display = 'flex';
            chartContainer.style.display = 'block';
            listContainer.style.display = 'block';
            emptyMsg.style.display = 'none';

            let total = 0;
            const unit = item.harvests[0].unit || '公斤';
            let maxAmount = 0;
            const aggregated = {};
            item.harvests.forEach(h => {
                const date = h.date;
                const amt = parseFloat(h.amount || 0);
                total += amt;
                if (!aggregated[date]) aggregated[date] = 0;
                aggregated[date] += amt;
            });
            const sortedDates = Object.keys(aggregated).sort((a, b) => new Date(a) - new Date(b));
            sortedDates.forEach(d => { if (aggregated[d] > maxAmount) maxAmount = aggregated[d]; });

            const count = item.harvests.length;
            const avg = (total / count).toFixed(1);

            document.getElementById('todo-harvest-total-val').innerText = total.toFixed(1) + ' ' + unit;
            document.getElementById('todo-harvest-count-val').innerText = count + ' 次';
            document.getElementById('todo-harvest-avg-val').innerText = avg + ' ' + unit;

            const chartEl = document.getElementById('todo-harvest-chart');
            chartEl.innerHTML = '';
            sortedDates.forEach(date => {
                const amt = aggregated[date];
                const heightPct = maxAmount > 0 ? Math.max((amt / maxAmount) * 100, 5) : 5;
                const shortDate = date.substring(5);
                const barWrapper = document.createElement('div');
                barWrapper.className = 'harvest-bar-wrapper';
                barWrapper.innerHTML = `
                    <div class="harvest-bar-val">${amt.toFixed(1)}</div>
                    <div class="harvest-bar" style="height: ${heightPct}%" title="${date}: ${amt} ${unit}"></div>
                    <div class="harvest-bar-date">${shortDate}</div>
                `;
                chartEl.appendChild(barWrapper);
            });

            listContainer.innerHTML = item.harvests.map(h => `
                <div class="harvest-list-item">
                    <span style="color: #64748b;">📅 ${h.date}</span>
                    <span style="font-weight: 600; color: #0f172a;">${parseFloat(h.amount).toFixed(1)} ${h.unit || '公斤'}</span>
                </div>
            `).join('');
        } else {
            statsDashboard.style.display = 'none';
            chartContainer.style.display = 'none';
            listContainer.style.display = 'none';
            emptyMsg.style.display = 'block';
        }
        const overlay = document.getElementById('todo-harvest-overlay');
        overlay.classList.add('active');
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        overlay.style.zIndex = '9999';
    };

    document.getElementById('todo-harvest-close-btn')?.addEventListener('click', () => {
        const overlay = document.getElementById('todo-harvest-overlay');
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    });

    // --- Harvest Viz Logic ---
    window.openHarvestVizModal = function(gardenId) {
        const item = myGarden.find(i => i.id === gardenId);
        if (!item || !item.harvests || item.harvests.length === 0) return;
        
        const vegInfo = vegetables.find(v => v.id === item.vegId);
        document.getElementById('harvest-viz-title').innerHTML = `${vegInfo ? vegInfo.icon : '🍓'} ${vegInfo ? vegInfo.name : '未知'} - 产量统计`;
        
        let total = 0;
        const unit = item.harvests[0].unit || '公斤';
        let maxAmount = 0;
        
        // Aggregate by date (in case multiple harvests per day)
        const aggregated = {};
        item.harvests.forEach(h => {
            const date = h.date;
            const amt = parseFloat(h.amount || 0);
            total += amt;
            if (!aggregated[date]) aggregated[date] = 0;
            aggregated[date] += amt;
        });
        
        const sortedDates = Object.keys(aggregated).sort((a, b) => new Date(a) - new Date(b));
        sortedDates.forEach(d => {
            if (aggregated[d] > maxAmount) maxAmount = aggregated[d];
        });

        const count = item.harvests.length;
        const avg = (total / count).toFixed(1);

        document.getElementById('harvest-total-val').innerText = total.toFixed(1) + ' ' + unit;
        document.getElementById('harvest-count-val').innerText = count + ' 次';
        document.getElementById('harvest-avg-val').innerText = avg + ' ' + unit;

        const chartContainer = document.getElementById('harvest-chart');
        chartContainer.innerHTML = '';
        
        sortedDates.forEach(date => {
            const amt = aggregated[date];
            const heightPct = maxAmount > 0 ? Math.max((amt / maxAmount) * 100, 5) : 5;
            const shortDate = date.substring(5); // MM-DD
            
            const barWrapper = document.createElement('div');
            barWrapper.className = 'harvest-bar-wrapper';
            barWrapper.innerHTML = `
                <div class="harvest-bar-val">${amt.toFixed(1)}</div>
                <div class="harvest-bar" style="height: ${heightPct}%" title="${date}: ${amt} ${unit}"></div>
                <div class="harvest-bar-date">${shortDate}</div>
            `;
            chartContainer.appendChild(barWrapper);
        });

        const listContainer = document.getElementById('harvest-list');
        listContainer.innerHTML = item.harvests.map(h => `
            <div class="harvest-list-item">
                <span style="color: #64748b;">📅 ${h.date}</span>
                <span style="font-weight: 600; color: #0f172a;">${parseFloat(h.amount).toFixed(1)} ${h.unit || '公斤'}</span>
            </div>
        `).join('');

        document.getElementById('harvest-viz-overlay').classList.add('active');
    };

    document.getElementById('harvest-viz-close-btn').addEventListener('click', () => {
        document.getElementById('harvest-viz-overlay').classList.remove('active');
    });

    // --- Notification UI Logic ---
    const bellBtn = document.getElementById('notification-bell');
    const dropdown = document.getElementById('notification-dropdown');
    const badge = document.getElementById('notification-badge');
    const clearBtn = document.getElementById('notification-clear');
    
    if (bellBtn && dropdown) {
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = dropdown.style.display === 'none';
            dropdown.style.display = isHidden ? 'block' : 'none';
            if (isHidden && badge) {
                badge.style.display = 'none';
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            currentNotifications = [];
            if(typeof renderNotifications === 'function') renderNotifications();
        });
    }
    // --- End Notification UI Logic ---

    if(typeof generateNotifications === 'function') generateNotifications();
});
