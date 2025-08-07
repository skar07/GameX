# WebEngineStudio — A Visual Web‑Native Game Engine Platform

## Overview

**WebEngineStudio** is an experimental full-stack platform that redefines how multiplayer browser-based games are created. Built with TypeScript, Three.js, and WebSocket, it merges real-time engine needs with visual design interfaces and eventual AI-assisted schema generation.

---

## Core Features

- **Modular Game Engine**
  - Tick-based server loop, authoritative game state, network sync  
  - WebSocket-based real-time updates and input handling  
  - State management using typed structures (`Map`, `Record`, spatial grids)

- **Three.js Frontend Editor**
  - Live visualization of game state  
  - Extensible GUI: drag-and-drop components, scene editor  

- **ORM Layer (Future)**
  - Decorator-powered entity modeling (e.g. `@Entity`, `@Column`)  
  - Auto-generated DB schema  
  - DB access abstracted cleanly into the engine environment

- **AI-Assisted Schema Creation (Planned)**
  - Prompt-driven model generation  
  - Integration with LLMs to auto-create ORM definitions  
  - Example: “Create a Player with health, XP, and position” → generated class + schema

- **Component-Based Extensibility**
  - Add game features visually  
  - Support for collectibles, collision logic, UI overlays  

---

## Why It Matters

- Combines **real-time game logic** with **visual development tools**, entirely in-browser  
- Provides a modern alternative to heavyweight engines like Unity/Unreal, but tailored for the web  
- Embeds data persistence and schema modeling into the engine — an intersection of **DevTools × Game Dev × Low-Code**

---

## Tech Stack

- **Backend**: TypeScript, WebSocket, Map/Record state management  
- **Frontend**: Three.js, Reactive UI overlays  
- **ORM**: Decorator-based TS model definitions  
- **LLMs**: Integration for prompt-to-schema workflows (future phase)  
- **Storage**: JSON/ORM → DB abstraction layer  

---

## Roadmap

1. ✅ Core Engine: Movement, world logic, player system — *in progress*  
2. 🛠️ Editor UI: Visual manipulation of game objects, maps  
3. 🧱 ORM Layer: Decorators, persistence, schema generation  
4. 🤖 AI Features: Prompt-based entity creation  
5. 🧩 Full IDE Mode: GUI editor for building comprehensive games  

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/WebEngineStudio.git

# Install dependencies
npm install

# Run the server
npm run server

# Run the client (development mode)
npm run client

# Open your browser
http://localhost:3000
