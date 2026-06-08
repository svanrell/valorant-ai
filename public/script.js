// AI Recommendations Database by Map
const MAP_RECOMMENDATIONS = {
    'Ascent': [
        { id: 'sova', name: 'Sova', role: 'Initiator', winrate: '72.4%', uuid: 'dad6947f-4b67-2403-acf8-3b952a957814' },
        { id: 'killjoy', name: 'Killjoy', role: 'Sentinel', winrate: '69.1%', uuid: '1e58de9c-4950-5125-9341-7c08ee7a0862' },
        { id: 'jett', name: 'Jett', role: 'Duelist', winrate: '68.3%', uuid: 'ad8b151e-408d-f227-5185-5b7461c47a45' },
        { id: 'skye', name: 'Skye', role: 'Initiator', winrate: '65.5%', uuid: '6f2a04ca-43e0-be17-7f36-b3908627744d' },
        { id: 'omen', name: 'Omen', role: 'Controller', winrate: '63.9%', uuid: '8e253930-4c05-31dd-1b6c-968525494517' },
        { id: 'kay/o', name: 'KAY/O', role: 'Initiator', winrate: '61.8%', uuid: 'a3db83f8-4a55-398d-aa10-09a547d8cda5' }
    ],
    'Bind': [
        { id: 'raze', name: 'Raze', role: 'Duelist', winrate: '70.2%', uuid: 'f94c7e43-f19d-405d-ac15-17e21df5c7a4' },
        { id: 'brimstone', name: 'Brimstone', role: 'Controller', winrate: '68.5%', uuid: '9f0ac6b1-410a-99d4-d998-7e1458576b53' },
        { id: 'cypher', name: 'Cypher', role: 'Sentinel', winrate: '67.4%', uuid: '117ed9e3-49f3-6512-3ccf-00ad780d1b14' },
        { id: 'viper', name: 'Viper', role: 'Controller', winrate: '66.8%', uuid: '707e217c-438f-a5bb-2150-7d066a3416e7' },
        { id: 'skye', name: 'Skye', role: 'Initiator', winrate: '64.2%', uuid: '6f2a04ca-43e0-be17-7f36-b3908627744d' }
    ],
    'Haven': [
        { id: 'jett', name: 'Jett', role: 'Duelist', winrate: '71.5%', uuid: 'ad8b151e-408d-f227-5185-5b7461c47a45' },
        { id: 'sova', name: 'Sova', role: 'Initiator', winrate: '69.2%', uuid: 'dad6947f-4b67-2403-acf8-3b952a957814' },
        { id: 'omen', name: 'Omen', role: 'Controller', winrate: '68.1%', uuid: '8e253930-4c05-31dd-1b6c-968525494517' },
        { id: 'killjoy', name: 'Killjoy', role: 'Sentinel', winrate: '67.4%', uuid: '1e58de9c-4950-5125-9341-7c08ee7a0862' },
        { id: 'breach', name: 'Breach', role: 'Initiator', winrate: '65.1%', uuid: '5f8d3a7f-467b-97f3-062c-13acf203c00a' }
    ],
    'Split': [
        { id: 'raze', name: 'Raze', role: 'Duelist', winrate: '73.1%', uuid: 'f94c7e43-f19d-405d-ac15-17e21df5c7a4' },
        { id: 'cypher', name: 'Cypher', role: 'Sentinel', winrate: '70.4%', uuid: '117ed9e3-49f3-6512-3ccf-00ad780d1b14' },
        { id: 'omen', name: 'Omen', role: 'Controller', winrate: '68.2%', uuid: '8e253930-4c05-31dd-1b6c-968525494517' },
        { id: 'breach', name: 'Breach', role: 'Initiator', winrate: '66.5%', uuid: '5f8d3a7f-467b-97f3-062c-13acf203c00a' }
    ],
    'Breeze': [
        { id: 'jett', name: 'Jett', role: 'Duelist', winrate: '74.2%', uuid: 'ad8b151e-408d-f227-5185-5b7461c47a45' },
        { id: 'sova', name: 'Sova', role: 'Initiator', winrate: '71.5%', uuid: 'dad6947f-4b67-2403-acf8-3b952a957814' },
        { id: 'viper', name: 'Viper', role: 'Controller', winrate: '69.8%', uuid: '707e217c-438f-a5bb-2150-7d066a3416e7' },
        { id: 'cypher', name: 'Cypher', role: 'Sentinel', winrate: '68.1%', uuid: '117ed9e3-49f3-6512-3ccf-00ad780d1b14' }
    ],
    'Icebox': [
        { id: 'viper', name: 'Viper', role: 'Controller', winrate: '72.8%', uuid: '707e217c-438f-a5bb-2150-7d066a3416e7' },
        { id: 'jett', name: 'Jett', role: 'Duelist', winrate: '71.2%', uuid: 'ad8b151e-408d-f227-5185-5b7461c47a45' },
        { id: 'killjoy', name: 'Killjoy', role: 'Sentinel', winrate: '70.1%', uuid: '1e58de9c-4950-5125-9341-7c08ee7a0862' },
        { id: 'sova', name: 'Sova', role: 'Initiator', winrate: '68.4%', uuid: 'dad6947f-4b67-2403-acf8-3b952a957814' },
        { id: 'sage', name: 'Sage', role: 'Sentinel', winrate: '66.2%', uuid: '569fdd95-4d10-43ab-ca70-79becc718b46' }
    ],
    'Sunset': [
        { id: 'cypher', name: 'Cypher', role: 'Sentinel', winrate: '71.9%', uuid: '117ed9e3-49f3-6512-3ccf-00ad780d1b14' },
        { id: 'omen', name: 'Omen', role: 'Controller', winrate: '69.5%', uuid: '8e253930-4c05-31dd-1b6c-968525494517' },
        { id: 'raze', name: 'Raze', role: 'Duelist', winrate: '67.8%', uuid: 'f94c7e43-f19d-405d-ac15-17e21df5c7a4' },
        { id: 'gekko', name: 'Gekko', role: 'Initiator', winrate: '65.2%', uuid: 'e370fa79-4bb1-4364-7343-e70f353024ad' }
    ],
    'Lotus': [
        { id: 'raze', name: 'Raze', role: 'Duelist', winrate: '72.1%', uuid: 'f94c7e43-f19d-405d-ac15-17e21df5c7a4' },
        { id: 'killjoy', name: 'Killjoy', role: 'Sentinel', winrate: '69.8%', uuid: '1e58de9c-4950-5125-9341-7c08ee7a0862' },
        { id: 'omen', name: 'Omen', role: 'Controller', winrate: '68.0%', uuid: '8e253930-4c05-31dd-1b6c-968525494517' },
        { id: 'fade', name: 'Fade', role: 'Initiator', winrate: '66.4%', uuid: 'ade7b617-47ca-fb92-f00e-e1916e58c14d' }
    ]
};

const MAP_SPLASHES = {
    'Ascent': 'https://media.valorant-api.com/maps/7eae2e51-4ece-f12b-57fc-92b2dd29d3c4/splash.png',
    'Bind': 'https://media.valorant-api.com/maps/2c9c43a2-4501-9441-727e-2d9435727bb2/splash.png',
    'Haven': 'https://media.valorant-api.com/maps/2bee0dc9-4aa9-526f-75b4-07e5aa9458e2/splash.png',
    'Split': 'https://media.valorant-api.com/maps/d960549e-485c-fb9e-1e4e-a69785a5f25d/splash.png',
    'Breeze': 'https://media.valorant-api.com/maps/2fb9b465-41f0-842d-70a2-81e09416b4e8/splash.png',
    'Icebox': 'https://media.valorant-api.com/maps/e2ad5e54-4114-a870-96ae-ab9b691135a8/splash.png',
    'Sunset': 'https://media.valorant-api.com/maps/2262b647-43e1-a4a1-0265-72ac2b2b1c41/splash.png',
    'Lotus': 'https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6d-e8f788c22147/splash.png'
};

// Application State
let isLiveMode = false;
let activeTab = 'all';
let agentsList = []; // dynamic from valorant-api
let selectedMap = 'Ascent';
let selectedMode = 'competitive';
let currentDraftSlot = 0; // index of player card currently targeted for manual pick (0-4)
let livePregameMatchId = null;
let currentIngameRound = 1;

// Mode rules state variables
let modeMaxPlayers = 5;
let modeAllowBuy = true;
let modeMaxRounds = 25;
let modeSwapRound = 13;

// 5 slots representing players (Simulator or Live)
let myTeam = [
    { puuid: 'p1', name: 'Ally 1 (You)', agentId: null, state: '', level: 125, rank: 21, playerCardId: '' },
    { puuid: 'p2', name: 'Ally 2', agentId: null, state: '', level: 88, rank: 18, playerCardId: '' },
    { puuid: 'p3', name: 'Ally 3', agentId: null, state: '', level: 232, rank: 20, playerCardId: '' },
    { puuid: 'p4', name: 'Ally 4', agentId: null, state: '', level: 41, rank: 17, playerCardId: '' },
    { puuid: 'p5', name: 'Ally 5', agentId: null, state: '', level: 195, rank: 22, playerCardId: '' }
];

// Active highlighted agent (clicked on grid but not locked yet)
let activeSelectedAgent = null;

// Assets cache
let agentsCache = {};
let ranksCache = {};

// DOM Elements
const mapSelect = document.getElementById('mapSelect');
const modeSelect = document.getElementById('modeSelect');
const connectionStatus = document.getElementById('connectionStatus');
const connectionText = document.getElementById('connectionText');
const teamList = document.getElementById('teamList');
const teamCount = document.getElementById('teamCount');
const synergyFill = document.getElementById('synergyFill');
const synergyVal = document.getElementById('synergyVal');
const synergyRating = document.getElementById('synergyRating');
const synergyStrengths = document.getElementById('synergyStrengths');
const synergyWeaknesses = document.getElementById('synergyWeaknesses');
const alertsContainer = document.getElementById('alertsContainer');
const recommendedPicks = document.getElementById('recommendedPicks');
const agentsGrid = document.getElementById('agentsGrid');

// Selection Detail elements
const selectionPanel = document.getElementById('selectionPanel');
const selectionPortrait = document.getElementById('selectionPortrait');
const selectionPortraitPlaceholder = document.getElementById('selectionPortraitPlaceholder');
const selectionName = document.getElementById('selectionName');
const selectionRole = document.getElementById('selectionRole');
const selectionDesc = document.getElementById('selectionDesc');
const selectionAbilities = document.getElementById('selectionAbilities');
const lockBtn = document.getElementById('lockBtn');
const timerDigits = document.getElementById('timerDigits');

// Buy Overlay elements
const buyOverlay = document.getElementById('buyOverlay');
const buyOverlayRound = document.getElementById('buyOverlayRound');
const buyOverlayText = document.getElementById('buyOverlayText');
const buyOverlayTimerBar = document.getElementById('buyOverlayTimerBar');

// Load agents and ranks from API
async function initData() {
    try {
        // Fetch agents
        const agentRes = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=en-US');
        const agentJson = await agentRes.json();
        if (agentJson.status === 200) {
            agentsList = agentJson.data;
            agentsList.forEach(agent => {
                agentsCache[agent.uuid.toLowerCase()] = {
                    name: agent.displayName,
                    icon: agent.displayIcon,
                    bust: agent.bustPortrait,
                    full: agent.fullPortrait,
                    role: agent.role.displayName,
                    description: agent.description,
                    abilities: agent.abilities
                };
            });
        }

        // Fetch competitive tiers (ranks)
        const rankRes = await fetch('https://valorant-api.com/v1/competitivetiers');
        const rankJson = await rankRes.json();
        if (rankJson.status === 200 && rankJson.data.length > 0) {
            const latestTiers = rankJson.data[rankJson.data.length - 1].tiers;
            latestTiers.forEach(tier => {
                ranksCache[tier.tier] = {
                    name: tier.tierName,
                    icon: tier.largeIcon
                };
            });
        }

        // Render components
        renderTeam();
        renderAgentsGrid();
        renderRecommended();
        updateSynergy();

    } catch (err) {
        console.error("Initialization error:", err);
    }
}

// Switch active fullscreen layout
function switchView(viewName) {
    document.querySelectorAll('.state-view').forEach(view => {
        view.classList.remove('active');
    });
    const target = document.getElementById('view' + viewName.charAt(0).toUpperCase() + viewName.slice(1));
    if (target) {
        target.classList.add('active');
    }
}

// Initialize grid list of agents
function renderAgentsGrid() {
    agentsGrid.innerHTML = '';

    // Filter agents
    const filtered = agentsList.filter(agent => {
        if (activeTab === 'all') return true;
        if (!agent.role) return false;
        return agent.role.displayName.toLowerCase() === activeTab;
    });

    // Sort alphabetically
    filtered.sort((a, b) => a.displayName.localeCompare(b.displayName));

    filtered.forEach(agent => {
        const item = document.createElement('div');
        item.className = 'agent-grid-item';

        const agentUuidLower = agent.uuid.toLowerCase();
        if (activeSelectedAgent && activeSelectedAgent.uuid === agent.uuid) {
            item.classList.add('selected');
        }

        // Check if agent is already taken by someone else on the team
        const isTaken = myTeam.some(player => player.agentId === agentUuidLower);
        if (isTaken) {
            item.classList.add('picked');
        }

        item.innerHTML = `<img src="${agent.displayIcon}" alt="${agent.displayName}" title="${agent.displayName}">`;

        if (isTaken) {
            const overlay = document.createElement('div');
            overlay.className = 'locked-overlay';
            overlay.innerText = 'PICKED';
            item.appendChild(overlay);
        }

        item.onclick = () => selectAgent(agent);
        agentsGrid.appendChild(item);
    });
}

function filterRole(roleName) {
    activeTab = roleName;
    // Update tabs state
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        if (tab.innerText.toLowerCase() === roleName + 's' || (roleName === 'all' && tab.innerText.toLowerCase() === 'all')) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    renderAgentsGrid();
    renderRecommended(); // Keep AI recommendations list in sync with the selected role tab!
}

// Display details of currently selected agent
function selectAgent(agent) {
    // Check if already locked by another player
    const isTaken = myTeam.some((player, idx) => idx !== currentDraftSlot && player.agentId === agent.uuid.toLowerCase());

    activeSelectedAgent = agent;

    // Render selected state in grid
    const items = document.querySelectorAll('.agent-grid-item');
    items.forEach(el => el.classList.remove('selected'));

    // Find active element in grid to add border glow
    const targetImg = Array.from(agentsGrid.querySelectorAll('img')).find(img => img.src === agent.displayIcon);
    if (targetImg && targetImg.parentElement) {
        targetImg.parentElement.classList.add('selected');
    }

    // Update details block
    selectionPortraitPlaceholder.style.display = 'none';
    selectionPortrait.src = agent.fullPortrait || agent.bustPortrait || agent.displayIcon;
    selectionPortrait.style.display = 'block';

    selectionName.innerText = agent.displayName;
    selectionRole.innerText = agent.role;
    selectionDesc.innerText = agent.description;

    // Load abilities
    selectionAbilities.innerHTML = '';
    if (agent.abilities) {
        agent.abilities.forEach(ability => {
            if (ability.displayIcon) {
                const abIcon = document.createElement('div');
                abIcon.className = 'ability-icon-wrap';
                abIcon.innerHTML = `<img src="${ability.displayIcon}" alt="${ability.displayName}">`;
                abIcon.title = `${ability.displayName}: ${ability.description}`;
                selectionAbilities.appendChild(abIcon);
            }
        });
    }

    // Enable Lock in Button if NOT in Live Mode, or if it is our slot
    if (isTaken) {
        lockBtn.disabled = true;
        lockBtn.innerText = 'Character Taken';
    } else {
        lockBtn.disabled = isLiveMode && currentDraftSlot !== 0; // lock disabled if live mode and not Ally 1
        lockBtn.innerText = 'Lock Agent';
    }

    if (isLiveMode && livePregameMatchId) {
        socket.emit('pregame_select', { pregameMatchId: livePregameMatchId, agentUuid: agent.uuid.toLowerCase() });
    }
}

// Lock in the agent to the selected slot (for Simulation mode)
function lockSelection() {
    if (!activeSelectedAgent) return;
    const agentId = activeSelectedAgent.uuid.toLowerCase();

    if (isLiveMode) {
        if (livePregameMatchId) {
            socket.emit('pregame_lock', { pregameMatchId: livePregameMatchId, agentUuid: agentId });
        }
    } else {
        // Set agent to targeted slot
        myTeam[currentDraftSlot].agentId = agentId;
        myTeam[currentDraftSlot].state = 'locked';
        myTeam[currentDraftSlot].playerCardId = 'locked';

        // Find next open slot
        findNextOpenSlot();

        // Refresh team and synergy
        renderTeam();
        renderAgentsGrid();
        updateSynergy();
    }
}

function findNextOpenSlot() {
    for (let i = 0; i < myTeam.length; i++) {
        if (!myTeam[i].agentId) {
            currentDraftSlot = i;
            return;
        }
    }
}

// Render left column of team members
function renderTeam() {
    teamList.innerHTML = '';
    let count = 0;

    myTeam.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        if (index === currentDraftSlot) {
            card.classList.add('active-selection');
        }
        if (player.state === 'locked') {
            card.classList.add('locked');
        } else if (player.state === 'selected') {
            card.classList.add('selecting');
        }

        // Apply player card background if available
        if (player.playerCardId && player.playerCardId !== 'locked') {
            card.style.backgroundImage = `linear-gradient(rgba(11, 18, 25, 0.85), rgba(11, 18, 25, 0.95)), url(https://media.valorant-api.com/playercards/${player.playerCardId}/wideart.png)`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        } else {
            card.style.backgroundImage = 'none';
        }

        if (player.agentId && agentsCache[player.agentId]) {
            count++;
        }

        // Get rank info
        let rankHtml = '';
        if (player.rank && ranksCache[player.rank]) {
            rankHtml = `<img src="${ranksCache[player.rank].icon}" class="player-rank-icon" alt="${ranksCache[player.rank].name}" title="${ranksCache[player.rank].name}">`;
        }

        const agentIdLower = player.agentId ? player.agentId.toLowerCase() : '';
        const agentData = agentsCache[agentIdLower];

        let avatarContent = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            </svg>
        `;

        if (agentData) {
            avatarContent = `<img src="${agentData.icon}" alt="${agentData.name}">`;
        }

        const agentName = agentData ? agentData.name : 'Selecting...';

        let statusBadgeText = 'OPEN';
        let statusBadgeClass = 'status-open';

        if (player.state === 'locked') {
            statusBadgeText = 'LOCKED';
            statusBadgeClass = 'status-locked';
        } else if (player.state === 'selected') {
            statusBadgeText = 'PRE-PICK';
            statusBadgeClass = 'status-prepick';
        }

        card.innerHTML = `
            <div class="player-index">${index + 1}</div>
            <div class="player-avatar-wrap">
                ${avatarContent}
            </div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-agent">${agentName}</div>
                <div class="player-meta">
                    <span class="player-level">LVL ${player.level}</span>
                    ${rankHtml}
                    <span class="status-badge-inner ${statusBadgeClass}">${statusBadgeText}</span>
                </div>
            </div>
        `;

        // Add clear button in simulator mode
        if (!isLiveMode && player.agentId) {
            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-slot-btn';
            clearBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            clearBtn.onclick = (e) => {
                e.stopPropagation();
                clearSlot(index);
            };
            card.appendChild(clearBtn);
        }

        // Slot click updates currently targeted slot for simulator
        if (!isLiveMode) {
            card.style.cursor = 'pointer';
            card.onclick = () => {
                currentDraftSlot = index;
                renderTeam();
            };
        }

        teamList.appendChild(card);
    });

    teamCount.innerText = `${count} / ${myTeam.length} Picked`;
}

function clearSlot(index) {
    myTeam[index].agentId = null;
    myTeam[index].state = '';
    myTeam[index].playerCardId = '';
    currentDraftSlot = index;
    renderTeam();
    renderAgentsGrid();
    updateSynergy();
}

// Render AI Recommended Agent Cards
const MAP_TACTICAL_STATS = {
    'Ascent': {
        atkWin: '48.6%',
        defWin: '51.4%',
        atkPercent: 48.6,
        defPercent: 51.4,
        metaClass: 'Initiator & Sentinel',
        complexity: 'Medium',
        avgDuration: '54.2s',
        defaultSite: 'A Site (53%)',
        plantSpot: 'Default Generator',
        metaComp: 'Jett, Omen, Sova, KO, KJ',
        proTip: 'Mid control is crucial. Smoke Market and Arch to split defense. Sova arrows reveal A site easily.'
    },
    'Bind': {
        atkWin: '50.2%',
        defWin: '49.8%',
        atkPercent: 50.2,
        defPercent: 49.8,
        metaClass: 'Controller & Duelist',
        complexity: 'Medium',
        avgDuration: '52.8s',
        defaultSite: 'B Site (51%)',
        plantSpot: 'Default Truck/Cubby',
        metaComp: 'Raze, Brim, Viper, Skye, Fade',
        proTip: 'Teleporters enable rapid rotations. Use Viper walls to segment site lines.'
    },
    'Haven': {
        atkWin: '49.5%',
        defWin: '50.5%',
        atkPercent: 49.5,
        defPercent: 50.5,
        metaClass: 'Initiator & Sentinel',
        complexity: 'High',
        avgDuration: '56.1s',
        defaultSite: 'C Site (42%)',
        plantSpot: 'Default Box C/Back A',
        metaComp: 'Jett, Omen, Sova, Breach, KJ',
        proTip: '3-site map. Sentinel setups at B or C allow active rotation to support A.'
    },
    'Split': {
        atkWin: '47.8%',
        defWin: '52.2%',
        atkPercent: 47.8,
        defPercent: 52.2,
        metaClass: 'Duelist & Controller',
        complexity: 'High',
        avgDuration: '53.5s',
        defaultSite: 'A Site (55%)',
        plantSpot: 'Screen box A / Mid B',
        metaComp: 'Raze, Omen, Cypher, Breach, Skye',
        proTip: 'Mid/Vents control dictates the round. Fight for Ramps and Heaven control.'
    },
    'Breeze': {
        atkWin: '51.1%',
        defWin: '48.9%',
        atkPercent: 51.1,
        defPercent: 48.9,
        metaClass: 'Duelist & Controller',
        complexity: 'Low',
        avgDuration: '55.4s',
        defaultSite: 'A Site (58%)',
        plantSpot: 'Pyramids default',
        metaComp: 'Jett, Viper, Sova, Cypher, KAY/O',
        proTip: 'Open sites favor long-range rifles and Operator. Viper is mandatory for cover.'
    },
    'Icebox': {
        atkWin: '50.8%',
        defWin: '49.2%',
        atkPercent: 50.8,
        defPercent: 49.2,
        metaClass: 'Sentinel & Controller',
        complexity: 'Medium',
        avgDuration: '53.9s',
        defaultSite: 'A Site (56%)',
        plantSpot: 'Default A Nest/Box',
        metaComp: 'Jett, Viper, Sage, Killjoy, Sova',
        proTip: 'Verticality is high. Hold Tube on mid. Viper wall screen on A is essential.'
    },
    'Sunset': {
        atkWin: '49.1%',
        defWin: '50.9%',
        atkPercent: 49.1,
        defPercent: 50.9,
        metaClass: 'Sentinel & Controller',
        complexity: 'Medium',
        avgDuration: '52.1s',
        defaultSite: 'B Site (54%)',
        plantSpot: 'Default B Pillars',
        metaComp: 'Raze, Omen, Cypher, Gekko, Fade',
        proTip: 'Mid control gives full map splits. Trap Cypher trips on B main before executing.'
    },
    'Lotus': {
        atkWin: '51.5%',
        defWin: '48.5%',
        atkPercent: 51.5,
        defPercent: 48.5,
        metaClass: 'Duelist & Initiator',
        complexity: 'High',
        avgDuration: '54.8s',
        defaultSite: 'C Site (45%)',
        plantSpot: 'Default A box/C mound',
        metaComp: 'Raze, Omen, Killjoy, Fade, Breach',
        proTip: '3-site map with rotating doors. Breach stun/flash is highly effective here.'
    }
};

function renderRecommended() {
    recommendedPicks.innerHTML = '';
    const picks = MAP_RECOMMENDATIONS[selectedMap] || [];

    // Map each pick with its original index (1-based absolute rank)
    const rankedPicks = picks.map((pick, idx) => ({ ...pick, originalRank: idx + 1 }));

    // Filter picks by role if not 'all'
    const filteredPicks = activeTab === 'all'
        ? rankedPicks
        : rankedPicks.filter(pick => pick.role && pick.role.toLowerCase() === activeTab);

    if (filteredPicks.length === 0) {
        const noPicksMsg = document.createElement('div');
        noPicksMsg.style.fontSize = '10px';
        noPicksMsg.style.color = 'var(--text-muted)';
        noPicksMsg.style.textAlign = 'center';
        noPicksMsg.style.padding = '20px 10px';
        noPicksMsg.style.fontStyle = 'italic';
        noPicksMsg.innerText = `No recommendations for ${activeTab}s on this map.`;
        recommendedPicks.appendChild(noPicksMsg);
        return;
    }

    filteredPicks.forEach((pick) => {
        const card = document.createElement('div');

        let avatarUrl = '';
        const pickUuidLower = pick.uuid ? pick.uuid.toLowerCase() : '';
        if (pickUuidLower && agentsCache[pickUuidLower]) {
            avatarUrl = agentsCache[pickUuidLower].icon;
        } else {
            // Fallback: search in agentsCache by displayName
            const pickNameLower = pick.name.toLowerCase();
            const foundAgentKey = Object.keys(agentsCache).find(key => agentsCache[key].name.toLowerCase() === pickNameLower);
            if (foundAgentKey) {
                avatarUrl = agentsCache[foundAgentKey].icon;
                pick.uuid = foundAgentKey; // Correct the UUID in-place so click selection works
            }
        }

        // Compact styling
        card.className = 'pick-compact-card';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.background = 'rgba(15, 26, 36, 0.4)';
        card.style.border = '1px solid var(--border-cyber)';
        card.style.borderRadius = '4px';
        card.style.padding = '8px 12px';
        card.style.gap = '12px';
        card.style.cursor = 'pointer';
        card.style.position = 'relative';
        card.style.transition = 'all 0.2s';

        card.innerHTML = `
            <div style="font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 900; color: var(--color-cyan); width: 15px;">#${pick.originalRank}</div>
            <img src="${avatarUrl}" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border-cyber); object-fit: cover;" alt="${pick.name}">
            <div style="flex: 1;">
                <div style="font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; color: var(--text-main); text-transform: uppercase;">${pick.name}</div>
                <div style="font-size: 9px; color: var(--text-muted);">${pick.role}</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 8px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Win Rate</div>
                <div style="font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; color: var(--color-green); text-shadow: 0 0 4px var(--glow-green);">${pick.winrate}</div>
            </div>
        `;

        // Hover effect helper in JS
        card.onmouseenter = () => {
            card.style.borderColor = 'var(--color-cyan)';
            card.style.background = 'rgba(0, 240, 255, 0.05)';
            card.style.transform = 'translateY(-1px)';
        };
        card.onmouseleave = () => {
            card.style.borderColor = 'var(--border-cyber)';
            card.style.background = 'rgba(15, 26, 36, 0.4)';
            card.style.transform = 'translateY(0)';
        };

        // Clicking a recommended card automatically selects it in both simulator and live modes
        card.onclick = () => {
            if (agentsCache[pick.uuid]) {
                const rawAgent = agentsList.find(a => a.uuid === pick.uuid);
                if (rawAgent) {
                    selectAgent(rawAgent);
                }
            }
        };

        recommendedPicks.appendChild(card);
    });
}

// Main algorithm to calculate Team Synergy, Strengths, Weaknesses, and Alerts
// Main algorithm to calculate Team Synergy, Strengths, Weaknesses, and Alerts
function updateSynergy() {
    let synergy = 50; // Base baseline

    // Track composition classes
    let counts = {
        'Duelist': 0,
        'Initiator': 0,
        'Controller': 0, // Smokes
        'Sentinel': 0
    };

    let healers = 0; // Sage / Skye
    let totalAgentsPicked = 0;
    let alignedPicks = 0; // recommendations alignment

    myTeam.forEach(player => {
        if (player.agentId) {
            totalAgentsPicked++;
            const agent = agentsCache[player.agentId];
            if (agent) {
                if (counts[agent.role] !== undefined) {
                    counts[agent.role]++;
                }
                if (agent.name === 'Sage' || agent.name === 'Skye') {
                    healers++;
                }
                // Check if alignment with recommended agents on map
                const isRecommended = (MAP_RECOMMENDATIONS[selectedMap] || []).some(pick => pick.uuid === player.agentId);
                if (isRecommended) {
                    alignedPicks++;
                }
            }
        }
    });

    if (totalAgentsPicked === 0) {
        // Initial state
        setSynergyMeter(0, "WAITING FOR PICKS", "Select characters to analyze synergy.", "No agents drafted yet.");
        renderAlerts(counts, healers, totalAgentsPicked);
        return;
    }

    // 1. Smokes (Controller) - crucial (+20%)
    if (counts['Controller'] > 0) {
        synergy += 20;
    }

    // 2. Healer (Sage/Skye) - essential (+15%)
    if (healers > 0) {
        synergy += 15;
    }

    // 3. Class diversity (+10% for having at least 1 Duelist and 1 Initiator)
    if (counts['Duelist'] > 0 && counts['Initiator'] > 0) {
        synergy += 10;
    }

    // 4. Sentinel (lockdown) (+10%)
    if (counts['Sentinel'] > 0) {
        synergy += 10;
    }

    // 5. Recommended picks match (+5% per agent, max +15%)
    synergy += Math.min(alignedPicks * 5, 15);

    // Cap synergy between 15% and 100% depending on role penalties
    let penalties = 0;
    if (counts['Controller'] === 0) penalties += 20;
    if (healers === 0) penalties += 15;
    if (counts['Duelist'] === 0) penalties += 10;

    synergy = Math.max(15, Math.min(100, synergy - penalties));

    // Determine status rating
    let rating = "CRITICAL COMPOSITION";
    let strengths = [];
    let weaknesses = [];

    if (synergy >= 85) {
        rating = "ELITE TEAM SYNERGY";
        strengths.push("Perfect tactical balance", "Optimal map-pick match");
    } else if (synergy >= 65) {
        rating = "BALANCED COMPOSITION";
        strengths.push("Good core utility presence");
        if (counts['Controller'] === 0) weaknesses.push("Vulnerable to lines-of-sight (No Smokes)");
        if (healers === 0) weaknesses.push("Low health sustain (No Healers)");
    } else {
        rating = "UNBALANCED COMPOSITION";
        if (counts['Controller'] === 0) weaknesses.push("Missing smoke visual cover");
        if (healers === 0) weaknesses.push("Lacks sustain heal abilities");
        if (totalAgentsPicked < 3) {
            strengths.push("Analyzing composition...");
        }
    }

    if (counts['Controller'] > 0) strengths.push("Smoke sightline block available");
    if (healers > 0) strengths.push("Sustain healing support");
    if (counts['Sentinel'] > 0) strengths.push("Strong site defensive hold");

    const strengthsText = strengths.length > 0 ? strengths.join(", ") : "None detected.";
    const weaknessesText = weaknesses.length > 0 ? weaknesses.join(", ") : "None detected.";

    setSynergyMeter(synergy, rating, strengthsText, weaknessesText);
    renderAlerts(counts, healers, totalAgentsPicked);
}

// Animate circular SVG indicator and percentage number
function setSynergyMeter(val, rating, strengths, weaknesses) {
    synergyVal.innerText = `${val}%`;
    synergyRating.innerText = rating;
    synergyStrengths.innerText = strengths;
    synergyWeaknesses.innerText = weaknesses;

    // Gauge SVG math: path length is 188.4 (pi * r where r=55, semi circle)
    // 0% synergy = stroke-dashoffset 188.4
    // 100% synergy = stroke-dashoffset 0
    const maxDash = 188.4;
    const offset = maxDash - ((val / 100) * maxDash);
    synergyFill.style.strokeDashoffset = offset;

    // Color status
    if (val >= 80) {
        synergyRating.style.color = 'var(--color-green)';
    } else if (val >= 60) {
        synergyRating.style.color = 'var(--color-yellow)';
    } else {
        synergyRating.style.color = 'var(--color-red)';
    }
}

// Render critical warnings based on missing utilities
function renderAlerts(counts, healers, totalAgents) {
    alertsContainer.innerHTML = '';

    if (totalAgents === 0) {
        alertsContainer.innerHTML = `
            <div class="alert-banner" style="background: rgba(0, 240, 255, 0.05); border-color: rgba(0, 240, 255, 0.2);">
                <span class="alert-icon" style="color: var(--color-cyan);">ℹ️</span>
                <div class="alert-info-text">
                    <div class="alert-title" style="color: var(--color-cyan);">Awaiting Select</div>
                    <div class="alert-desc">Select map and lock characters.</div>
                </div>
            </div>
        `;
        return;
    }

    let warningsCount = 0;

    // Smokes alert
    if (counts['Controller'] === 0) {
        warningsCount++;
        alertsContainer.appendChild(createAlertElement(
            "MISSING: SMOKES (NO VISUAL BLOCK)",
            "Your team lacks visual coverage block. Suggest Omen, Viper or Brimstone.",
            "high"
        ));
    }

    // Healer alert
    if (healers === 0) {
        warningsCount++;
        alertsContainer.appendChild(createAlertElement(
            "MISSING: HEALER (SUSTAIN LOW)",
            "No healing utility detected. Suggest picking Sage or Skye.",
            "medium"
        ));
    }

    // Duelist alert
    if (counts['Duelist'] === 0) {
        warningsCount++;
        alertsContainer.appendChild(createAlertElement(
            "MISSING: DUELIST (ENTRY DEFICIT)",
            "Your team lacks entry-fraggers. High risk entering sites. Suggest Jett or Raze.",
            "medium"
        ));
    }

    // Initiator alert
    if (counts['Initiator'] === 0) {
        warningsCount++;
        alertsContainer.appendChild(createAlertElement(
            "MISSING: INITIATOR (INTEL DEFICIT)",
            "Your team lacks recon info. Sites will be blind check. Suggest Sova or Fade.",
            "medium"
        ));
    }

    // If no warnings, show perfect comp message
    if (warningsCount === 0) {
        alertsContainer.innerHTML = `
            <div class="alert-success-placeholder">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="alert-success-title">COMPOSITION OPTIMIZED</div>
                <p style="font-size:11px; opacity:0.8;">No major utility deficits. Team ready for tactical match execution!</p>
            </div>
        `;
    }
}

function createAlertElement(title, desc, priority) {
    const el = document.createElement('div');
    el.className = 'alert-banner';

    if (priority === 'high') {
        el.style.borderColor = 'rgba(255, 70, 85, 0.4)';
        el.style.background = 'rgba(255, 70, 85, 0.08)';
    } else {
        el.style.borderColor = 'rgba(255, 208, 0, 0.3)';
        el.style.background = 'rgba(255, 208, 0, 0.06)';
        el.style.setProperty('--color-red', 'var(--color-yellow)');
        el.style.setProperty('--glow-red', 'var(--glow-yellow)');
    }

    el.innerHTML = `
        <span class="alert-icon">⚠️</span>
        <div class="alert-info-text">
            <div class="alert-title">${title}</div>
            <div class="alert-desc">${desc}</div>
        </div>
    `;
    return el;
}

// Change Map dropdown listener
mapSelect.onchange = (e) => {
    selectedMap = e.target.value;
    renderRecommended();
    updateSynergy();
};

// Change Mode dropdown listener
if (modeSelect) {
    modeSelect.onchange = (e) => {
        selectedMode = e.target.value;
        
        const preset = GAME_MODE_PRESETS[selectedMode] || GAME_MODE_PRESETS['custom'];
        
        // Call the secure JS function to update index.html rules dynamically
        applyGameModeRules(preset.playersCount, preset.canBuy, preset.maxRounds);
        
        const modeRulesName = document.getElementById('modeRulesName');
        if (modeRulesName) modeRulesName.innerText = preset.name;
        
        const modeRulesDesc = document.getElementById('modeRulesDesc');
        if (modeRulesDesc) modeRulesDesc.innerText = preset.description;
        
        const ingameModeEl = document.getElementById('ingameMode');
        if (ingameModeEl) ingameModeEl.innerText = selectedMode.toUpperCase();
        
        console.log(`Game mode changed to: ${selectedMode}`);
    };
}

// Custom Timer Simulation
let timerInterval = null;
let timeLeft = 60;

function startTimer(duration) {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = duration;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDigits.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (timeLeft <= 10) {
        timerDigits.style.color = 'var(--color-red)';
        timerDigits.style.textShadow = '0 0 6px var(--glow-red)';
    } else {
        timerDigits.style.color = 'var(--color-cyan)';
        timerDigits.style.textShadow = '0 0 6px var(--glow-cyan)';
    }
}

// Floating Buy Overlay controls
let buyOverlayTimeout = null;
let buyOverlayMaxTime = 30;

function showBuyOverlay(round, duration, recommendation) {
    buyOverlay.classList.remove('hidden');
    buyOverlayRound.innerText = `ROUND ${round} - BUY PHASE`;
    buyOverlayText.innerHTML = `<strong>AI BUY STRATEGY:</strong> ${recommendation}`;

    buyOverlayMaxTime = duration;
    updateBuyOverlayProgress(duration);

    if (buyOverlayTimeout) clearInterval(buyOverlayTimeout);
    let buyTimeLeft = duration;

    buyOverlayTimeout = setInterval(() => {
        buyTimeLeft--;
        updateBuyOverlayProgress(buyTimeLeft);
        if (buyTimeLeft <= 0) {
            clearInterval(buyOverlayTimeout);
            buyOverlay.classList.add('hidden');
        }
    }, 1000);
}

function updateBuyOverlayProgress(current) {
    const pct = (current / buyOverlayMaxTime) * 100;
    buyOverlayTimerBar.style.width = `${pct}%`;
}

function hideBuyOverlay() {
    if (buyOverlayTimeout) clearInterval(buyOverlayTimeout);
    buyOverlay.classList.add('hidden');
}

// Force launch offline simulator sandbox
function startSimulator() {
    isLiveMode = false;
    setConnectionState('offline', 'Radar Offline (Sim)');
    switchView('pregame');

    // Reset to baseline full team first
    myTeam = [
        { puuid: 'p1', name: 'Ally 1 (You)', agentId: null, state: '', level: 125, rank: 21, playerCardId: '' },
        { puuid: 'p2', name: 'Ally 2', agentId: null, state: '', level: 88, rank: 18, playerCardId: '' },
        { puuid: 'p3', name: 'Ally 3', agentId: null, state: '', level: 232, rank: 20, playerCardId: '' },
        { puuid: 'p4', name: 'Ally 4', agentId: null, state: '', level: 41, rank: 17, playerCardId: '' },
        { puuid: 'p5', name: 'Ally 5', agentId: null, state: '', level: 195, rank: 22, playerCardId: '' }
    ];

    // Trigger initial rules sync based on dropdown
    selectedMode = modeSelect ? modeSelect.value : 'competitive';
    const preset = GAME_MODE_PRESETS[selectedMode] || GAME_MODE_PRESETS['competitive'];
    applyGameModeRules(preset.playersCount, preset.canBuy, preset.maxRounds);
    
    const modeRulesName = document.getElementById('modeRulesName');
    if (modeRulesName) modeRulesName.innerText = preset.name;
    const modeRulesDesc = document.getElementById('modeRulesDesc');
    if (modeRulesDesc) modeRulesDesc.innerText = preset.description;

    currentDraftSlot = 0;
    renderTeam();
    renderAgentsGrid();
    updateSynergy();
    startTimer(60);
}

// Launch in-game HUD HUD view simulation (DEMO)
function startIngameDemo() {
    isLiveMode = false;
    setConnectionState('offline', 'Radar Offline (Sim)');
    switchView('ingame');

    selectedMap = mapSelect.value || 'Ascent';

    const ingameMapEl = document.getElementById('ingameMap');
    if (ingameMapEl) ingameMapEl.innerText = selectedMap;

    selectedMode = modeSelect ? modeSelect.value : 'competitive';
    const preset = GAME_MODE_PRESETS[selectedMode] || GAME_MODE_PRESETS['competitive'];
    applyGameModeRules(preset.playersCount, preset.canBuy, preset.maxRounds);

    const ingameModeEl = document.getElementById('ingameMode');
    if (ingameModeEl) ingameModeEl.innerText = selectedMode.toUpperCase();

    document.getElementById('ingameRoundHeader').innerText = 'MATCH START | ROUND 1';

    const splash = MAP_SPLASHES[selectedMap] || MAP_SPLASHES['Ascent'];
    document.getElementById('viewIngame').style.backgroundImage = `linear-gradient(rgba(5, 8, 12, 0.45), rgba(5, 8, 12, 0.55)), url('${splash}')`;

    // Trigger simulated recommendations
    document.getElementById('ingameRecWeapon').innerText = preset.canBuy ? 'PHANTOM' : 'RANDOM / FREE';
    document.getElementById('ingameRecAgent').innerText = 'JETT';

    const creditsInput = document.getElementById('ingameCreditsInput');
    if (creditsInput) creditsInput.value = preset.canBuy ? '3200' : '0';

    document.getElementById('ingameRecSide').innerText = 'ATTACKER';

    updateBuyRecommendations(creditsInput ? parseInt(creditsInput.value) || 0 : 0, 1);

    document.getElementById('ingameCoachText').innerText = "PUSH B SITE VIA LONG; SMOKE DEFENDERS. PEEK CAREFULLY.";
    document.getElementById('ingameBuyTimerDigits').innerText = `00:30`;
    document.getElementById('ingameBuyTimerBar').style.width = '100%';

    // ult track images
    document.getElementById('ultAgentHead1').src = 'https://media.valorant-api.com/agents/ad8b151e-408d-f227-5185-5b7461c47a45/displayicon.png';
    document.getElementById('ultAgentHead2').src = 'https://media.valorant-api.com/agents/a3db83f8-4a55-398d-aa10-09a547d8cda5/displayicon.png';
    document.getElementById('ultAgentHead3').src = 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';
    document.getElementById('ultAgentHead4').src = 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-9341-7c08ee7a0862/displayicon.png';
}

// ==========================================
// WEB SOCKET & LIVE RIOT DATA INTEGRATION
// ==========================================
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to NestJS WebSocket gateway');
    setConnectionState('menu-mode', 'Radar Online');
});

socket.on('disconnect', () => {
    console.log('Disconnected from NestJS WebSocket gateway');
    setConnectionState('offline', 'Radar Offline');
    switchView('closed');
});

function setConnectionState(state, text) {
    connectionStatus.className = `status-badge status-${state}`;
    connectionText.innerText = text;
    isLiveMode = (state === 'live');

    const sandboxCard = document.getElementById('sandboxControlsCard');
    if (isLiveMode) {
        mapSelect.disabled = true; // live client locks map selection
        if (modeSelect) modeSelect.disabled = true;
        if (sandboxCard) sandboxCard.style.display = 'none';
    } else {
        mapSelect.disabled = false;
        if (modeSelect) modeSelect.disabled = false;
        if (sandboxCard) sandboxCard.style.display = 'flex';
    }
}

// Listen for live Valorant Game Radar status changes
socket.on('valorant_status', (data) => {
    console.log("Websocket valorant_status event:", data);

    if (data.status === 'CLOSED') {
        setConnectionState('offline', 'Game Offline');
        switchView('closed');
    }
    else if (data.status === 'MENU') {
        setConnectionState('menu-mode', 'In Game Lobby');
        switchView('menu');
    }
    else if (data.status === 'PREGAME') {
        setConnectionState('live', 'Agent Selection');
        switchView('pregame');

        livePregameMatchId = data.pregameMatchId;

        // Set map from server pregame matches
        if (data.mapName) {
            selectedMap = data.mapName;
            mapSelect.value = selectedMap;

            // Override with live ML recommendations from server if available
            if (data.mlDraftPicks && data.mlDraftPicks.length > 0) {
                MAP_RECOMMENDATIONS[selectedMap] = data.mlDraftPicks;
            }

            renderRecommended();
        }

        // Set mode if available from live status
        if (data.mode) {
            selectedMode = data.mode.toLowerCase();
            if (modeSelect) modeSelect.value = selectedMode;
            
            const preset = GAME_MODE_PRESETS[selectedMode] || GAME_MODE_PRESETS['custom'];
            applyGameModeRules(preset.playersCount, preset.canBuy, preset.maxRounds);
            
            const modeRulesName = document.getElementById('modeRulesName');
            if (modeRulesName) modeRulesName.innerText = preset.name;
            const modeRulesDesc = document.getElementById('modeRulesDesc');
            if (modeRulesDesc) modeRulesDesc.innerText = preset.description;
        }

        // Map live player list
        if (data.players && data.players.length > 0) {
            myTeam = data.players.map((p, index) => ({
                puuid: p.puuid,
                name: p.puuid === data.myPuuid ? 'You' : `Ally ${index + 1}`,
                agentId: p.agentId ? p.agentId.toLowerCase() : null,
                state: p.state, // "", "selected", "locked"
                level: p.level || 0,
                rank: p.rank || 0,
                playerCardId: p.playerCardId || ''
            }));
        }

        renderTeam();
        renderAgentsGrid();
        updateSynergy();
        startTimer(60); // start draft selection timer
    }
    else if (data.status === 'INGAME') {
        setConnectionState('live', 'In Game Match');
        switchView('ingame');

        livePregameMatchId = null;

        if (data.mapName) {
            selectedMap = data.mapName;
            mapSelect.value = selectedMap;
            document.getElementById('ingameMap').innerText = selectedMap;

            const splash = MAP_SPLASHES[selectedMap] || MAP_SPLASHES['Ascent'];
            document.getElementById('viewIngame').style.backgroundImage = `linear-gradient(rgba(5, 8, 12, 0.55), rgba(5, 8, 12, 0.65)), url('${splash}')`;
        }
        if (data.mode) {
            selectedMode = data.mode.toLowerCase();
            if (modeSelect) modeSelect.value = selectedMode;
            
            const preset = GAME_MODE_PRESETS[selectedMode] || GAME_MODE_PRESETS['custom'];
            applyGameModeRules(preset.playersCount, preset.canBuy, preset.maxRounds);
            
            const modeRulesName = document.getElementById('modeRulesName');
            if (modeRulesName) modeRulesName.innerText = preset.name;
            const modeRulesDesc = document.getElementById('modeRulesDesc');
            if (modeRulesDesc) modeRulesDesc.innerText = preset.description;

            const ingameModeEl = document.getElementById('ingameMode');
            if (ingameModeEl) ingameModeEl.innerText = data.mode.toUpperCase();
        }

        // Map live player list
        if (data.players && data.players.length > 0) {
            myTeam = data.players.map((p, index) => ({
                puuid: p.puuid,
                name: p.puuid === data.myPuuid ? 'You' : `Ally ${index + 1}`,
                agentId: p.agentId ? p.agentId.toLowerCase() : null,
                state: p.state,
                level: p.level || 0,
                rank: p.rank || 0,
                playerCardId: p.playerCardId || ''
            }));
        }

        renderTeam();
        updateSynergy();

        // Dynamic Ultimate heads based on teammate picks
        let activeH = [
            'https://media.valorant-api.com/agents/ad8b151e-408d-f227-5185-5b7461c47a45/displayicon.png', // Jett fallback
            'https://media.valorant-api.com/agents/a3db83f8-4a55-398d-aa10-09a547d8cda5/displayicon.png', // Reyna fallback
            'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png', // Omen fallback
            'https://media.valorant-api.com/agents/1e58de9c-4950-5125-9341-7c08ee7a0862/displayicon.png'  // Killjoy fallback
        ];

        let loadedIndex = 0;
        myTeam.forEach((player, idx) => {
            if (idx > 0 && player.agentId && agentsCache[player.agentId] && loadedIndex < 4) {
                activeH[loadedIndex] = agentsCache[player.agentId].icon;
                loadedIndex++;
            }
        });

        document.getElementById('ultAgentHead1').src = activeH[0];
        document.getElementById('ultAgentHead2').src = activeH[1];
        document.getElementById('ultAgentHead3').src = activeH[2];
        document.getElementById('ultAgentHead4').src = activeH[3];
    }
});

function getBuyRecommendationText(credits, round) {
    if (round === 1 || round === 13) {
        return "Pistol Round: Buy Ghost + Abilities, or Light Shield + Classic + Abilities.";
    }
    if (round >= 25) {
        return "OVERTIME: Buy everything! Vandal/Phantom + Heavy Shield + Abilities.";
    }
    if (credits < 1500) {
        return "Eco Round: Full save credits to guarantee a minimum buy next round (threshold 3900+).";
    } else if (credits >= 1500 && credits < 3900) {
        return "Force/Semi-Buy: Buy Spectre + Light Armor. Play close-range angles.";
    } else {
        const rifle = selectedMap === 'Breeze' ? 'VANDAL' : 'PHANTOM';
        return `Full Buy: Purchase ${rifle} + Heavy Armor + Full Abilities. Play standard lines-of-sight.`;
    }
}

function updateBuyRecommendations(credits, round) {
    let wName = "PHANTOM";
    let wCost = 2900;
    let sName = "LIGHT SHIELD";
    let sCost = 400;
    let aName = "FULL BUY";
    let aCost = 300;

    if (!modeAllowBuy) {
        // Economy disabled/Spike Rush/Deathmatch rules
        wName = "RANDOM / FREE";
        wCost = 0;
        sName = "FREE SHIELD";
        sCost = 0;
        aName = "ABILITIES ACTIVE";
        aCost = 0;
        
        document.getElementById('ingameBuyWeaponName').innerText = wName;
        document.getElementById('ingameBuyWeaponCost').innerText = `(Free)`;
        document.getElementById('ingameBuyShieldName').innerText = sName;
        document.getElementById('ingameBuyShieldCost').innerText = `(Free)`;
        document.getElementById('ingameBuyAbilitiesName').innerText = aName;
        document.getElementById('ingameBuyAbilitiesCost').innerText = `(Free)`;
        document.getElementById('ingameBuyTotalCost').innerText = '0';
        document.getElementById('ingameRecWeapon').innerText = wName;
        return;
    }

    if (round === 1 || round === 13) {
        wName = "GHOST";
        wCost = 500;
        sName = "NO SHIELD";
        sCost = 0;
        aName = "ABILITIES";
        aCost = 300;
    } else if (round >= 25) {
        wName = selectedMap === 'Breeze' ? 'VANDAL' : 'PHANTOM';
        wCost = 2900;
        sName = "HEAVY SHIELD";
        sCost = 1000;
        aName = "FULL BUY";
        aCost = 300;
    } else {
        if (credits < 1500) {
            wName = "CLASSIC";
            wCost = 0;
            sName = "NO SHIELD";
            sCost = 0;
            aName = "SAVE";
            aCost = 0;
        } else if (credits >= 1500 && credits < 3900) {
            wName = "SPECTRE";
            wCost = 1600;
            sName = "LIGHT SHIELD";
            sCost = 400;
            aName = "ABILITIES";
            aCost = 200;
        } else {
            wName = selectedMap === 'Breeze' ? 'VANDAL' : 'PHANTOM';
            wCost = 2900;
            sName = "HEAVY SHIELD";
            sCost = 1000;
            aName = "FULL BUY";
            aCost = 300;
        }
    }

    const totalCost = wCost + sCost + aCost;

    // Update elements
    document.getElementById('ingameBuyWeaponName').innerText = wName;
    document.getElementById('ingameBuyWeaponCost').innerText = `(${wCost})`;
    document.getElementById('ingameBuyShieldName').innerText = sName;
    document.getElementById('ingameBuyShieldCost').innerText = `(${sCost})`;
    document.getElementById('ingameBuyAbilitiesName').innerText = aName;
    document.getElementById('ingameBuyAbilitiesCost').innerText = `(${aCost})`;
    document.getElementById('ingameBuyTotalCost').innerText = totalCost.toString();
    document.getElementById('ingameRecWeapon').innerText = wName;
}

// Listen for live Buy Phase updates
socket.on('buy_phase', (data) => {
    console.log("WebSocket buy_phase event:", data);

    currentIngameRound = data.round;
    const creditsInput = document.getElementById('ingameCreditsInput');
    const credits = parseInt(creditsInput.value) || 0;

    // Estimate side based on round
    const side = data.round <= 12 ? 'ATTACKER' : 'DEFENDER';

    // Dynamic coach tips by map and round
    let coachTip = "PUSH B SITE VIA LONG; SMOKE DEFENDERS. PEEK CAREFULLY.";
    if (selectedMap === 'Ascent') {
        coachTip = side === 'ATTACKER'
            ? "Push B Main together. Omen smoke Market & CT. Sova scan back site."
            : "Hold A Main with Omen smoke. Killjoy setup B site defense. Watch Mid link.";
    } else if (selectedMap === 'Bind') {
        coachTip = side === 'ATTACKER'
            ? "Execute A through Short and Showers. Smoke Truck and U-Hall."
            : "Hold Hookah aggressively with Raze grenade. Viper wall screen B Long.";
    }

    updateBuyRecommendations(credits, data.round);

    if (data.available) {
        // Update floating overlay
        const recText = getBuyRecommendationText(credits, data.round);
        showBuyOverlay(data.round, data.time, recText);

        // Update in-game HUD widgets
        document.getElementById('ingameRoundHeader').innerText = `Round ${data.round} - BUY PHASE`;

        // Set agent name based on first player
        let myAgent = 'JETT';
        if (myTeam[0] && myTeam[0].agentId && agentsCache[myTeam[0].agentId]) {
            myAgent = agentsCache[myTeam[0].agentId].name;
        }
        document.getElementById('ingameRecAgent').innerText = myAgent;
        document.getElementById('ingameRecSide').innerText = side;
        document.getElementById('ingameRecSide').style.color = side === 'ATTACKER' ? 'var(--color-red)' : 'var(--color-cyan)';

        // Coach tip
        document.getElementById('ingameCoachText').innerText = coachTip;

        // Timer
        const minutes = Math.floor(data.time / 60);
        const seconds = data.time % 60;
        document.getElementById('ingameBuyTimerDigits').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('ingameBuyTimerBar').style.width = `${(data.time / (data.round === 1 || data.round === 13 || data.round >= 25 ? 45 : 30)) * 100}%`;
        document.getElementById('ingameBuyTimerDigits').style.color = 'var(--color-cyan)';
    } else {
        hideBuyOverlay();
        document.getElementById('ingameRoundHeader').innerText = `Round ${data.round} - LIVE`;
        document.getElementById('ingameBuyTimerDigits').innerText = `00:00`;
        document.getElementById('ingameBuyTimerDigits').style.color = 'var(--color-red)';
        document.getElementById('ingameBuyTimerBar').style.width = `0%`;
    }
});

// Bind credits input change listener
document.getElementById('ingameCreditsInput').oninput = (e) => {
    const credits = parseInt(e.target.value) || 0;
    updateBuyRecommendations(credits, currentIngameRound);
    if (isLiveMode) {
        socket.emit('update_ingame_credits', { credits });
    }
};

// Listen for live ML Buy Recommendations
socket.on('ml_buy_recommendations', (data) => {
    console.log("WebSocket ml_buy_recommendations event:", data);
    if (data && data.buy_recommendations) {
        renderMlBuyRecommendations(data);
    }
});

function getWeaponCost(name) {
    const weapon = name.toLowerCase();
    if (weapon === 'classic') return 0;
    if (weapon === 'shorty') return 150;
    if (weapon === 'frenzy') return 450;
    if (weapon === 'ghost') return 500;
    if (weapon === 'sheriff') return 800;
    if (weapon === 'stinger') return 1100;
    if (weapon === 'spectre') return 1600;
    if (weapon === 'bucky') return 850;
    if (weapon === 'judge') return 1850;
    if (weapon === 'marshal') return 950;
    if (weapon === 'vandal') return 2900;
    if (weapon === 'phantom') return 2900;
    if (weapon === 'guardian') return 2250;
    if (weapon === 'operator') return 4700;
    if (weapon === 'odin') return 3200;
    return 0;
}
/* NOT OFFICIAL INFO BY NOW */
function renderMlBuyRecommendations(data) {
    if (!data || !data.buy_recommendations || data.buy_recommendations.length === 0) return;

    const rec = data.buy_recommendations[0]; // Top recommendation

    // Update weapon
    document.getElementById('ingameRecWeapon').innerText = rec.weapon.toUpperCase();

    // Update side based on round
    const side = currentIngameRound <= 12 ? 'ATTACKER' : 'DEFENDER';
    document.getElementById('ingameRecSide').innerText = side;
    document.getElementById('ingameRecSide').style.color = side === 'ATTACKER' ? 'var(--color-red)' : 'var(--color-cyan)';

    // Update items details
    document.getElementById('ingameBuyWeaponName').innerText = rec.weapon.toUpperCase();
    const weaponCost = getWeaponCost(rec.weapon);
    document.getElementById('ingameBuyWeaponCost').innerText = `(${weaponCost})`;

    const shieldName = rec.shield === 'Heavy' ? 'HEAVY SHIELD' : (rec.shield === 'Light' ? 'LIGHT SHIELD' : 'NO SHIELD');
    const shieldCost = rec.shield === 'Heavy' ? 1000 : (rec.shield === 'Light' ? 400 : 0);
    document.getElementById('ingameBuyShieldName').innerText = shieldName;
    document.getElementById('ingameBuyShieldCost').innerText = `(${shieldCost})`;

    const abilitiesName = rec.abilities ? 'FULL BUY' : 'SAVE';
    const abilitiesCost = rec.abilities ? 400 : 0;
    document.getElementById('ingameBuyAbilitiesName').innerText = abilitiesName;
    document.getElementById('ingameBuyAbilitiesCost').innerText = `(${abilitiesCost})`;

    document.getElementById('ingameBuyTotalCost').innerText = rec.cost.toString();

    // Coach tip based on tactic
    let coachTip = `AI SUGGESTED TACTIC: ${rec.tactic.toUpperCase()} | SITE: ${rec.site} | MAIN DEFENDER: ${rec.defensor.toUpperCase()}`;
    document.getElementById('ingameCoachText').innerText = coachTip;

    // Update enemy economy prediction
    if (data.enemy_economy) {
        const eco = data.enemy_economy;
        document.getElementById('ingameEnemyEcoEstimateRound').innerText = `ROUND ${currentIngameRound} ESTIMATE`;
        document.getElementById('ingameEnemyEcoCreds').innerText = `AVG CREDS: ${eco.avg_credits}`;
        document.getElementById('ingameEnemyEcoLoadout').innerText = `${eco.weapon.toUpperCase()} / ${eco.shield === 'Heavy' ? 'HEAVY' : (eco.shield === 'Light' ? 'LIGHT' : 'NO')} SHIELD`;

        let ecoDesc = 'Full buy with heavy weapon setup';
        if (eco.type === 'Eco') {
            ecoDesc = 'Light saving buy, low utilities';
        } else if (eco.type === 'Semi-Buy') {
            ecoDesc = 'Medium buy with SMGs/rifles and light shields';
        }
        document.getElementById('ingameEnemyEcoDesc').innerText = ecoDesc;
        document.getElementById('ingameEnemyEcoRating').innerText = `${eco.type.toUpperCase()} (${eco.type === 'Full-Buy' ? 'DANGEROUS' : 'ECO/SAVE'})`;

        // Color rating
        if (eco.type === 'Full-Buy') {
            document.getElementById('ingameEnemyEcoRating').style.color = 'var(--color-red)';
        } else if (eco.type === 'Semi-Buy') {
            document.getElementById('ingameEnemyEcoRating').style.color = 'var(--color-yellow)';
        } else {
            document.getElementById('ingameEnemyEcoRating').style.color = 'var(--color-green)';
        }
    }
}

// Game Mode presets mapping (parameters driven securely via JS function)
const GAME_MODE_PRESETS = {
    'competitive': {
        name: 'Competitive',
        playersCount: 5,
        canBuy: true,
        maxRounds: 25, // first to 13
        description: 'Standard 5v5 competitive draft, credits buy active, halves swap at round 12.'
    },
    'unrated': {
        name: 'Unrated',
        playersCount: 5,
        canBuy: true,
        maxRounds: 25, // first to 13
        description: 'Standard 5v5 unrated draft, credits buy active, halves swap at round 12.'
    },
    'swiftplay': {
        name: 'Swiftplay',
        playersCount: 5,
        canBuy: true,
        maxRounds: 9, // first to 5 (swap round = Math.ceil(9/2) = 5, after 4 rounds)
        description: '5v5 compressed economy Swiftplay, halves swap at round 4 (Round 5 start).'
    },
    'spikerush': {
        name: 'Spike Rush',
        playersCount: 5,
        canBuy: false, // random weapons
        maxRounds: 7, // first to 4 (swap round = Math.ceil(7/2) = 4, after 3 rounds)
        description: '5v5 Spike Rush, random weapons, buy phase disabled, halves swap at round 3 (Round 4 start).'
    },
    'deathmatch': {
        name: 'Deathmatch',
        playersCount: 1, // FFA
        canBuy: false, // spawn with weapon
        maxRounds: 1, // single round to 40 kills
        description: 'Free-For-All Deathmatch (simulated 1 player), buy phase disabled, no abilities active.'
    },
    'escalation': {
        name: 'Escalation',
        playersCount: 5,
        canBuy: false,
        maxRounds: 1, // single round progression
        description: '5v5 Escalation, weapon progression tiers, buy phase disabled, fast respawns.'
    },
    'custom': {
        name: 'Custom Game',
        playersCount: 5,
        canBuy: true,
        maxRounds: 25,
        description: 'Custom game rules. Standard 5v5 configuration.'
    }
};

// Main JS function to securely configure game mode rules and automatically update index.html
function applyGameModeRules(playersCount, canBuy, maxRounds) {
    // Force parameter types to prevent external client-side HTML manipulation
    modeMaxPlayers = Number(playersCount);
    modeAllowBuy = Boolean(canBuy);
    modeMaxRounds = Number(maxRounds);
    modeSwapRound = modeMaxRounds > 1 ? Math.ceil(modeMaxRounds / 2) : 0;

    // Automatically update team capacity and layout slots
    updateTeamSize(modeMaxPlayers);

    // Update the index.html elements
    const sizeEl = document.getElementById('modeRulesSize');
    if (sizeEl) {
        sizeEl.innerText = modeMaxPlayers === 1 ? '1 Player (FFA)' : `${modeMaxPlayers} Players`;
    }

    const buyEl = document.getElementById('modeRulesBuy');
    if (buyEl) {
        if (modeAllowBuy) {
            buyEl.innerText = 'Buy Allowed';
            buyEl.className = 'rules-badge-buy enabled';
        } else {
            buyEl.innerText = 'Buy Disabled';
            buyEl.className = 'rules-badge-buy disabled';
        }
    }

    const roundsEl = document.getElementById('modeRulesRounds');
    if (roundsEl) {
        if (modeSwapRound > 0) {
            roundsEl.innerText = `Swap at Round ${modeSwapRound} (Max ${modeMaxRounds})`;
        } else {
            roundsEl.innerText = 'No Side Swap (1 round)';
        }
    }

    // Update HUD economy controls
    const creditsInput = document.getElementById('ingameCreditsInput');
    if (creditsInput) {
        creditsInput.disabled = !modeAllowBuy;
        if (!modeAllowBuy) {
            creditsInput.value = '0';
            creditsInput.style.opacity = '0.5';
            creditsInput.style.cursor = 'not-allowed';
        } else {
            creditsInput.style.opacity = '1';
            creditsInput.style.cursor = 'text';
            if (creditsInput.value === '0') {
                creditsInput.value = '3900'; // Reset to standard buy creds
            }
        }
    }

    // Refresh buy recommendations if we are in game view
    updateBuyRecommendations(creditsInput ? parseInt(creditsInput.value) || 0 : 0, currentIngameRound);
}

// Sandbox team size update helper
function updateTeamSize(newSize) {
    const currentSize = myTeam.length;
    if (newSize < currentSize) {
        // Shrink team
        myTeam = myTeam.slice(0, newSize);
        if (currentDraftSlot >= newSize) {
            currentDraftSlot = newSize - 1;
        }
    } else if (newSize > currentSize) {
        // Grow team
        for (let i = currentSize; i < newSize; i++) {
            myTeam.push({
                puuid: `p${i + 1}`,
                name: `Ally ${i + 1}`,
                agentId: null,
                state: '',
                level: 100 + i * 20,
                rank: 15 + i,
                playerCardId: ''
            });
        }
    }

    // Update team count text: e.g. "0 / 3 Picked"
    const pickedCount = myTeam.filter(p => p.agentId).length;
    if (teamCount) teamCount.innerText = `${pickedCount} / ${myTeam.length} Picked`;

    renderTeam();
    renderAgentsGrid();
    updateSynergy();
}

// Initialize application
initData();
startTimer(60); // default simulator draft timer
switchView('closed'); // start offline
