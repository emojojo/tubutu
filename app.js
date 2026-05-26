import { cities, vegetables, farmingModels, pestControls, fertilizers, regions, categories } from './data.js';
import { weatherData } from './weather_data.js';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, db, doc, setDoc, getDoc, onSnapshot, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from './firebase-config.js';

let currentUser = null;
let unsubSnapshot = null;
let myGarden = [];

try {
    const stored = localStorage.getItem('tubutu_my_garden');
    if (stored) {
        myGarden = JSON.parse(stored);
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
                    
                    // Merge local and cloud (simple union by vegId for now, prioritizing cloud)
                    const mergedMap = new Map();
                    myGarden.forEach(item => mergedMap.set(item.vegId, item));
                    cloudGarden.forEach(item => mergedMap.set(item.vegId, item));
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
                        // Check if different to avoid infinite loop
                        if (JSON.stringify(newGarden) !== JSON.stringify(myGarden)) {
                            myGarden = newGarden;
                            localStorage.setItem('tubutu_my_garden', JSON.stringify(myGarden));
                            window.myGarden = myGarden;
                            renderGrid();
                            renderCalendar();
                            const myGardenSection = document.getElementById('mygarden-section');
                            if (myGardenSection && myGardenSection.style.display === 'block') {
                                renderMyGarden();
                            }
                        }
                    }
                });

                renderGrid();
                renderCalendar();
                const myGardenSection = document.getElementById('mygarden-section');
                if (myGardenSection && myGardenSection.style.display === 'block') {
                    renderMyGarden();
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
            }
        });
    });

    let currentRegion = '';
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
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.id;
            renderGrid();
        }
    });

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
                ? `<img src="${veg.image}" alt="${veg.name}" class="veg-img">`
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
                ? `<img src="${item.image}" alt="${item.name}" class="veg-img">`
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
                <img src="${pc.image}" alt="${pc.name}" class="veg-img" onerror="this.src='images/default_crop.png'">
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
                <img src="${model.image}" alt="${model.name}" class="veg-img" onerror="this.src='images/default_crop.png'">
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
                        ? `<img src="${veg.avatar}" style="width: 24px; height: 24px; object-fit: contain; background: white; border-radius: 4px;">`
                        : (veg.image 
                            ? `<img src="${veg.image}" style="width: 24px; height: 24px; object-fit: cover; border-radius: 4px;">`
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
            ? `<img src="${item.image}" alt="${item.name}">`
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
                                            ${stage.image ? `<img src="${stage.image}" alt="${stage.name}" class="stage-image" style="width: 50%; max-width: 300px; border-radius: 8px; margin-top: 10px; display: block;">` : ''}
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
                                <select id="garden-city-input" ${isInGarden ? 'disabled' : ''} style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                                    ${cityOptionsHtml}
                                </select>
                            </div>
                            <div class="date-picker-group">
                                <label style="color: #166534; font-size: 1rem;">种植方式：</label>
                                <select id="garden-method-input" ${isInGarden ? 'disabled' : ''} style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                                    <option value="sow" ${defaultMethod !== 'transplant' ? 'selected' : ''}>🌱 播种种子</option>
                                    <option value="transplant" ${defaultMethod === 'transplant' ? 'selected' : ''}>🪴 买苗移栽</option>
                                </select>
                            </div>
                            <div class="date-picker-group">
                                <label style="color: #166534; font-size: 1rem;" id="garden-date-label">${defaultMethod === 'transplant' ? '移栽日期：' : '播种日期：'}</label>
                                <input type="date" id="garden-date-input" value="${defaultDate}" ${isInGarden ? 'disabled' : ''} style="padding: 6px; border-radius: 5px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;">
                            </div>
                            <button id="toggle-garden-btn" class="${isInGarden ? 'remove-btn' : 'add-btn'}">
                                ${isInGarden ? '❌ 移出我的菜园' : '🌱 加入我的菜园'}
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
                            ${item.stages.map((stage, index) => `
                                <div class="stage-item">
                                    <div class="stage-icon">${stageIcons[index % stageIcons.length]}</div>
                                    <div class="stage-content">
                                        <h4>阶段 ${index + 1}: ${stage.name}</h4>
                                        <p>${stage.content}</p>
                                        ${stage.image ? `<img src="${stage.image}" alt="${stage.name}" style="width: 50%; max-width: 300px; display: block; margin: 15px auto; border-radius: 8px; box-shadow: var(--shadow-sm);">` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;

            if (item.pests && item.pests.length > 0) {
                contentHtml += `
                    <div class="pest-section">
                        <h3><span class="icon">🛡️</span> 病虫害与生态防治</h3>
                        <div class="pest-list">
                            ${item.pests.map(pest => `
                                <div class="pest-item">
                                    <img src="${pest.image}" alt="${pest.name}" class="pest-img">
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
        
        if (item.type !== 'fertilizer' && item.type !== 'protection' && item.type !== 'model') {
            const toggleBtn = document.getElementById('toggle-garden-btn');
            const dateInput = document.getElementById('garden-date-input');
            const cityInput = document.getElementById('garden-city-input');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    const existingIndex = myGarden.findIndex(g => g.vegId === item.id);
                    if (existingIndex >= 0) {
                        if (!confirm('确定要从虚拟菜园中移除它吗？您的种植进度将无法恢复。')) return;
                        myGarden.splice(existingIndex, 1);
                        toggleBtn.className = 'add-btn';
                        toggleBtn.innerHTML = '🌱 加入我的菜园';
                        dateInput.disabled = false;
                        cityInput.disabled = false;
                        if (methodInput) methodInput.disabled = false;
                    } else {
                        const dateVal = dateInput.value || new Date().toISOString().split('T')[0];
                        const cityVal = cityInput.value || (cities.length > 0 ? cities[0].id : '');
                        const methodVal = methodInput ? methodInput.value : 'sow';
                        myGarden.push({ vegId: item.id, plantDate: dateVal, cityId: cityVal, method: methodVal });
                        localStorage.setItem('tubutu_default_city', cityVal);
                        localStorage.setItem('tubutu_default_method', methodVal);
                        toggleBtn.className = 'remove-btn';
                        toggleBtn.innerHTML = '❌ 移出我的菜园';
                        dateInput.disabled = true;
                        cityInput.disabled = true;
                        if (methodInput) methodInput.disabled = true;
                    }
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
        
        if (myGarden.length === 0) {
            grid.innerHTML = '';
            emptyMsg.style.display = 'block';
            return;
        }
        
        emptyMsg.style.display = 'none';
        grid.innerHTML = '';
        
        const cardsHtml = [];
        
        for (let index = 0; index < myGarden.length; index++) {
            const gardenItem = myGarden[index];
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
                            <img src="${stage.image}" alt="${stage.name}" class="timeline-img">
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
                ? `<img src="${veg.image}" alt="${veg.name}" class="mygarden-main-img">`
                : `<div class="mygarden-main-img" style="background: ${bgGradient}; display: flex; align-items: center; justify-content: center; font-size: 5rem; text-shadow: 0 10px 20px rgba(0,0,0,0.1);">${veg.icon}</div>`;

            let gddPercentage = Math.min(100, (status.accumulatedGdd / status.overallTotalGdd) * 100).toFixed(1);

            let operationsHtml = '';
            const ops = gardenItem.operations || [];
            if (ops.length > 0) {
                const sortedOps = [...ops].sort((a, b) => new Date(b.date) - new Date(a.date));
                const typeMap = {
                    'water': { icon: '💧', label: '浇水' },
                    'weed': { icon: '🌿', label: '除草' },
                    'fertilize': { icon: '🧪', label: '施肥' },
                    'pest': { icon: '🐛', label: '杀虫' },
                    'prune': { icon: '✂️', label: '修剪' },
                    'trellis': { icon: '🎋', label: '搭架' },
                    'pollinate': { icon: '🐝', label: '授粉' },
                    'other': { icon: '📌', label: '其他' }
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
            operationsHtml += `<button class="add-op-btn" style="margin-top: 10px;">➕ 添加农事记录</button>`;

            const cardHtml = `
                <div class="mygarden-card">
                    <div class="row-number">${index + 1}</div>
                    ${imgHtml}
                    <div class="veg-info">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
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
                        </div>
                        ${timelineHtml}
                        ${operationsHtml}
                    </div>
                </div>
            `;
            cardsHtml.push({ html: cardHtml, veg: veg });
        }
        
        grid.innerHTML = '';
        cardsHtml.forEach(c => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = c.html.trim();
            const cardEl = wrapper.firstChild;
            
            cardEl.addEventListener('click', (e) => {
                if (e.target.closest('.add-op-btn')) return;
                openModal(c.veg, false);
            });

            const addOpBtn = cardEl.querySelector('.add-op-btn');
            if (addOpBtn) {
                addOpBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openOperationModal(c.veg.id);
                });
            }

            grid.appendChild(cardEl);
        });
    }

    // Op Modal Logic
    const opModalOverlay = document.getElementById('op-modal-overlay');
    const opCloseBtn = document.getElementById('op-close-btn');
    const opDateInput = document.getElementById('op-date-input');
    const opRemarkInput = document.getElementById('op-remark-input');
    const opSaveBtn = document.getElementById('op-save-btn');
    const opTypeBtns = document.querySelectorAll('.op-type-btn');
    let currentOpVegId = null;

    if (opTypeBtns) {
        opTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                opTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    if (opCloseBtn) {
        opCloseBtn.addEventListener('click', () => {
            if (opModalOverlay) opModalOverlay.classList.remove('active');
        });
    }

    window.openOperationModal = function(vegId) {
        currentOpVegId = vegId;
        if (opDateInput) opDateInput.value = new Date().toISOString().split('T')[0];
        if (opRemarkInput) opRemarkInput.value = '';
        if (opTypeBtns && opTypeBtns.length > 0) {
            opTypeBtns.forEach(b => b.classList.remove('active'));
            opTypeBtns[0].classList.add('active');
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

            const existingIndex = myGarden.findIndex(g => g.vegId === currentOpVegId);
            if (existingIndex >= 0) {
                if (!myGarden[existingIndex].operations) {
                    myGarden[existingIndex].operations = [];
                }
                myGarden[existingIndex].operations.push({
                    id: Date.now().toString(),
                    date: dateVal,
                    type: typeVal,
                    remark: remarkVal
                });
                saveGarden();
                if (opModalOverlay) opModalOverlay.classList.remove('active');
                renderMyGarden();
            }
        });
    }

});
