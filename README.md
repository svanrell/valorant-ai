# LoadoutAi - Tactical VALORANT Recommendation Engine (Backend API)

**LoadoutAi** is a tactical agent drafting and round economy recommender system for VALORANT, inspired by the concept of *Itero* from League of Legends.

This backend serves as both the live local game-radar and the data ingestion pipeline. It integrates directly with the official Riot Games APIs to fetch high-rank match logs, uses a hybrid strategy to pull rich asset data, and tracks local client status using WebSockets. The output CSV datasets are consumed by a local Python Machine Learning training pipeline to generate recommendation models.

---

## Key Features

1. **Live Local Game Radar (WebSockets)**: 
   - A real-time `ValorantLocalService` polls the local Riot Client `lockfile` to check the game client status.
   - Using a central Socket.io gateway (`ValorantGateway`), it emits live game state transitions (`CLOSED`, `MENU`, `PREGAME`) and buy phase data (`buy_phase`) directly to the static web dashboard.
2. **Synergy Selector (Drafting)**: Recommends the optimal agent to pick based on map geometry, team synergy, and teammate picks to maximize the team's historical win rate.
3. **Economy Optimizer**: Calculates recommended weapon, armor, and ability loadouts depending on current player credits, map, and round type (Eco, Force, Full Buy).
4. **Hybrid Data Ingestion Pipeline**:
   - **Official Riot Games API** (`VAL-MATCH-V1`, `VAL-RANKED-V1`, and `VAL-CONTENT-V1` for acts): Dynamically ingests high-rank MMR leaderboards, live match histories, and active season act IDs.
   - **Unofficial Valorant Database** (`valorant-api.com`): Retrieves rich static game content (costs, coordinate systems, role descriptions, damage models, and ability lists) to build a highly detailed knowledge base for the ML models.
5. **Production Safeguards**: Implements rate-limiting (`@nestjs/throttler` at 20 req/min) to adhere to Riot developer key policies.

---

## Technology Stack

- **Core Framework**: NestJS (TypeScript Node.js)
- **WebSockets**: Socket.io (via `@nestjs/websockets` & `@nestjs/platform-socket.io`)
- **HTTP Client**: Axios with RxJS observables
- **Rate Limiting**: NestJS Throttler
- **Data Exporting**: Local generic, type-safe CSV mapper
- **Testing**: Jest (Unit and End-to-End integration tests)
- **Python ML Pipeline**: Pandas, NumPy, Scikit-learn (Managed via `requirements.txt` / `.venv`)

---

## Project Structure

```bash
src/
├── gateway/              # WebSocket Gateway & Local Client Radar
│   ├── valorant.gateway.ts
│   └── valorant-local.service.ts
├── valorant_api/         # Restructured Hybrid Ingestion Modules
│   ├── agents/           # Agent details and abilities
│   ├── maps/             # Map geometry and coordinates
│   ├── gear/             # Armor/Shield cost and stats
│   ├── weapons/          # Fire rate, cost, and damage ranges
│   ├── content/          # Acts tracking and active act resolution
│   ├── gamemodes/        # Game mode details
│   └── matches/          # Match details extraction and leaderboard MMR retrieval
├── utils/                # Generic type-safe CSV writer
├── main.ts               # Web application bootstraper
└── app.module.ts         # Module imports and declarations
public/                   # Static HTML and styling for the live Radar dashboard
contenido/                # Python ML training pipeline (datasets & pickled models)
```

---

## Datasets Output (`infoApi/`)

Running the ingestion routines generates clean, normalized datasets inside `/infoApi` for Python ML training:

- **`agents.csv`**: Uuid, displayName, description, developerName, roleName, roleDescription.
- **`maps.csv`**: Uuid, displayName, narrativeDescription, tacticalDescription, coordinates, xMultiplier, yMultiplier, xScalarToAdd, yScalarToAdd.
- **`gear.csv`**: Uuid, displayName, description, cost, categoryText, damageReduction, damageAbsorbed.
- **`weapons.csv`**: Uuid, displayName, category, cost, magazine size, fire rates, wall penetration.
- **`acts.csv`**: Active acts tracking (to resolve leaderboards).
- **`game_modes.csv`**: Game mode configurations and round parameters.
- **`ranked_leaderboard.csv`**: Active leaderboard MMR ratings of top players.
- **`match_metadata.csv`**: Match IDs, maps, lengths, and queues.
- **`match_players.csv`**: Player performance metrics per match (puuid, score, kills, deaths, assists).
- **`match_rounds.csv`**: Round details (winning team, bomb planter, defuser).
- **`match_round_purchases.csv`**: Granular choice per round: weapon, armor, spent credits, remaining credits, and AFK status.

---

## Setup & Running

### 1. Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)
- Python (v3.10 or higher) with a configured virtual environment
- A valid Riot Games Developer API Key

### 2. Environment Variables (`.env`)
Create a `.env` file at the root:
```env
VALORANT_API_KEY=your_riot_api_key_here
VALORANT_REGION=eu
PORT=3000
```

### 3. Installation
Install the Node.js packages:
```bash
$ npm install
```

Install the Python dependencies inside your virtual environment (`.venv`):
```bash
$ .venv/bin/pip install -r requirements.txt
```

### 4. Running the App
Start the NestJS backend:
```bash
# Development (watch mode)
$ npm run start:dev

# Production build & run
$ npm run build
$ npm run start:prod
```

Once running, open `http://localhost:3000` in your web browser to access the live **Radar LoadoutAi** dashboard interface, which connects to the WebSockets gateway.

### 5. Running Tests
```bash
# Unit tests
$ npm run test

# End-to-end integration tests
$ npm run test:e2e
```
