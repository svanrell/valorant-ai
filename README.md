# LoadoutAi - Tactical VALORANT Recommendation Engine (Backend API)

**LoadoutAi** is a tactical agent drafting and round economy recommender system for VALORANT, inspired by the concept of *Itero* from League of Legends.

This backend serves as the data ingestion pipeline. It integrates directly with the official Riot Games APIs to fetch high-rank match logs, structure them, and save them locally to normalized, append-only CSV datasets. These datasets are then consumed by a local Python Machine Learning training pipeline.

---

## Key Features

1. **Synergy Selector (Drafting)**: Recommends the optimal agent to pick based on map geometry, team synergy, and teammate picks to maximize the team's historical win rate.
2. **Economy Optimizer**: Calculates recommended weapon, armor, and ability loadouts depending on current player credits, map, and round type (Eco, Force, Full Buy).
3. **Data Acquisition Pipeline**: 
   - Synchronizes agents, maps, gear, weapons, game modes, and active acts.
   - Fetches active acts and MMR leaderboard rankings of high-level matches.
   - Automatically parses match details across 4 CSV tables to capture granular player behaviors.
4. **Production Safeguards**: Implements rate-limiting (`@nestjs/throttler` at 20 req/min) to adhere to Riot developer key policies.

---

## Technology Stack

- **Core Framework**: NestJS (TypeScript Node.js)
- **HTTP Client**: Axios with RxJS observables
- **Rate Limiting**: NestJS Throttler
- **Data Exporting**: Local generic, type-safe CSV mapper
- **Testing**: Jest (Unit and End-to-End integration tests)

---

## Project Structure

```bash
src/
├── agents/       # Agent data fetching (VAL-CONTENT-V1)
├── maps/         # Map geometry and data fetching (VAL-CONTENT-V1)
├── gear/         # Armor/Shield cost and stats fetching (VAL-CONTENT-V1)
├── weapons/      # Fire rate, cost, and damage ranges fetching (VAL-CONTENT-V1)
├── content/      # Acts tracking and active act resolution (VAL-CONTENT-V1)
├── gamemodes/    # Game mode details (VAL-CONTENT-V1)
├── matches/      # Match details extraction and leaderboard MMR retrieval (VAL-MATCH-V1 & VAL-RANKED-V1)
└── utils/        # Generic type-safe CSV writer
```

---

## Datasets Output (`infoApi/`)

Calling the endpoints generates clean, normalized datasets inside `/infoApi` for Python ML training:

- **`agents.csv`**: Uuid, displayName, description, developerName, roleName, roleDescription.
- **`maps.csv`**: Uuid, displayName, descriptions, coordinates, multipliers.
- **`gear.csv`**: Uuid, displayName, cost, category, damage absorption rates.
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
- A valid Riot Games Developer API Key

### 2. Environment Variables (`.env`)
Create a `.env` file at the root:
```env
VALORANT_API_KEY=your_riot_api_key_here
VALORANT_REGION=eu
PORT=3000
```

### 3. Installation
```bash
$ npm install
```

### 4. Running the App
```bash
# Development (watch mode)
$ npm run start:dev

# Production build & run
$ npm run build
$ npm run start:prod
```

### 5. Running Tests
```bash
# Unit tests
$ npm run test

# End-to-end integration tests
$ npm run test:e2e
```
