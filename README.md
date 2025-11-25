# 🛒 English Conversation Simulator - Supermarket Edition

An immersive 3D supermarket simulation built with React Three Fiber that helps English learners practice real-world conversations with an AI-powered cashier.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Configuration](#api-configuration)
- [How It Works](#how-it-works)
- [Development Timeline](#development-timeline)

## 🎯 Overview

This project creates an interactive 3D supermarket environment where users can:
- Navigate through a realistic supermarket
- Browse products on shelves
- Interact with an AI cashier that provides conversational English practice
- Receive gentle corrections and grammar feedback
- Practice shopping-related vocabulary in context

## ✨ Features

### 3D Supermarket Environment
- **Immersive 3D World**: First-person perspective with pointer lock controls
- **Realistic Physics**: Physics-based player movement using React Three Cannon
- **Detailed Environment**:
  - Textured floors, ceilings, and walls
  - Multiple aisles with shelves
  - Product displays with realistic textures (lettuce, tomatoes, Lay's chips)
  - Checkout counter with detailed cash register
  - 3D NPCs (shoppers and cashier)
  - Shopping carts
  - Decorative signs (Produce, Snacks, Dairy)

### AI-Powered Cashier
- **Contextual Conversations**: AI understands supermarket context and available products
- **English Learning Support**:
  - Gentle grammar corrections
  - Vocabulary teaching
  - Encouragement and positive reinforcement
  - Natural conversation flow
- **Realistic Shopping Experience**:
  - Product inquiries
  - Price calculations
  - Payment processing simulation
  - Small talk and friendly service

### Interactive Chat Interface
- Real-time messaging with AI cashier
- Voice input capability
- Text input fallback
- Model cycling support (fallback between different AI models)
- Clean, user-friendly UI

## 🚀 Technologies

### Frontend
- **React 18.3.1**: Component-based UI framework
- **Vite 7.2.4**: Build tool and development server
- **Three.js 0.160.0**: 3D graphics library
- **@react-three/fiber 8.16.8**: React renderer for Three.js
- **@react-three/drei 9.100.0**: Useful helpers for React Three Fiber
- **@react-three/cannon 6.6.0**: Physics engine for React Three Fiber

### Backend
- **Node.js with Express 5.1.0**: API server
- **Groq SDK 0.36.0**: AI language model integration (Llama 3.3 70B Versatile)
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 17.2.3**: Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Groq API key (get one from [Groq Console](https://console.groq.com))

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd english-simulator
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Add textures**
   
   Place the following texture files in the `public/textures/` directory:
   - `floor.jpg` - Supermarket floor texture
   - `ceiling.jpg` - Ceiling texture
   - `real_shelf.jpg` - Shelf material texture
   - `real_counter.jpg` - Checkout counter texture
   - `register_screen.jpg` - Register display texture
   - `cash_register.jpg` - Cash register body texture
   - `lechuga_final.jpg` - Lettuce product texture
   - `tomate.jpg` - Tomato product texture
   - `lays.jpg` - Lay's chips product texture

## 🎮 Usage

### Running the Application

1. **Start the backend server** (in `backend` directory):
   ```bash
   npm start
   # or
   node server.js
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend dev server** (in root directory):
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

### Controls

- **Mouse Movement**: Look around
- **W/A/S/D**: Move forward/left/backward/right
- **Space**: Jump
- **Click**: Lock/unlock pointer controls
- **ESC**: Exit pointer lock mode

### Interacting with the Cashier

1. Use the chat interface on the right side of the screen
2. Click the microphone icon to use voice input
3. Or type your message in the text input
4. The AI cashier will respond in English and help you practice

## 📁 Project Structure

```
english-simulator/
├── backend/
│   ├── .env                 # Environment variables (API keys)
│   ├── server.js            # Express server with Groq AI integration
│   ├── package.json         # Backend dependencies
│   └── node_modules/        # Backend packages
├── public/
│   └── textures/            # All texture images for 3D environment
│       ├── floor.jpg
│       ├── ceiling.jpg
│       ├── real_shelf.jpg
│       ├── real_counter.jpg
│       ├── register_screen.jpg
│       ├── cash_register.jpg
│       ├── lechuga_final.jpg
│       ├── tomate.jpg
│       └── lays.jpg
├── src/
│   ├── components/
│   │   └── ChatInterface.jsx    # Chat UI component
│   ├── App.jsx                   # Main application wrapper
│   ├── Supermarket.jsx           # 3D supermarket environment
│   ├── SupermarketWithChat.jsx   # Integrated supermarket + chat
│   ├── Supermarket2D.jsx         # 2D version (legacy)
│   ├── main.jsx                  # React entry point
│   └── styles.css                # Global styles
├── index.html               # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## 🔧 API Configuration

### Groq API Integration

The backend uses the Groq SDK to connect to AI language models:

- **Default Model**: `llama-3.3-70b-versatile`
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 150 (concise responses)

The cashier AI is configured with a detailed system prompt that:
- Maintains awareness of available products and prices
- Provides grammar corrections
- Teaches vocabulary
- Creates a natural shopping conversation
- Always responds in English

### Fallback Mechanism

The application supports model cycling if one model fails:
1. Primary: llama-3.3-70b-versatile
2. Fallback models can be configured in the frontend

## 🧠 How It Works

### 3D Rendering

1. **Three.js Scene**: Creates the 3D world with lights, camera, and objects
2. **React Three Fiber**: Renders Three.js using React components
3. **Physics Engine**: React Three Cannon handles collision detection and gravity
4. **Player Controller**: Custom Player component manages first-person movement

### Product System

Products are centralized in `PRODUCTS_DATA`:
```javascript
{
  id: 'unique-id',
  name: 'Product Name (Spanish)',
  type: 'box' | 'sphere' | 'cylinder',
  position: [x, y, z],
  texture: 'texture-key'
}
```

Products are passed to the AI so it can reference them in conversations.

### AI Conversation Flow

1. User input (voice or text) is sent to backend `/api/chat` endpoint
2. Backend constructs a request with:
   - System prompt (cashier persona + available products)
   - User message
3. Groq API processes the request using Llama 3.3
4. AI response is returned and displayed in chat
5. Grammar corrections and vocabulary teaching happen inline

## 📜 Development Timeline

### Phase 1: Initial Setup (Commit 1)
- Created project structure with Vite + React
- Initialized backend with Express
- Set up basic project configuration

### Phase 2: TypeScript Cleanup (Commit 2)
- Removed unused TypeScript template files
- Cleaned up boilerplate code

### Phase 3: AI Integration (Commit 3)
- Integrated Groq SDK with Llama models
- Implemented text input fallback
- Added model cycling for reliability
- Created basic chat interface

### Phase 4: Model Updates (Commit 4)
- Updated to Llama 3.3 70B Versatile (newer, more capable model)
- Improved AI response quality

### Phase 5: Code Internationalization (Commit 5)
- Converted all comments to English
- Standardized code documentation

### Phase 6: 3D Enhancement (Commit 6)
- Upgraded from 2D to 3D supermarket
- Added physics engine
- Implemented realistic textures
- Created detailed environment

### Phase 7: Interactive NPCs (Commit 7)
- Added 3D cashier character
- Implemented checkout counter
- Added cash register with screen
- Enhanced visual fidelity

### Phase 8: Atmosphere Enhancements (Current)
- Added more shelves and aisles
- Placed additional NPCs (shoppers)
- Added decorative signs
- Added shopping carts
- Improved lighting and ambiance

## 🎨 Assets

All textures should be placed in `public/textures/` and can be:
- Downloaded from free texture sites
- Generated using AI image tools
- Created manually

Recommended texture dimensions: 1024x1024 or 2048x2048 for best quality.

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more products
- Create new NPC interactions
- Enhance the 3D environment
- Improve AI prompts
- Add new conversation scenarios

## 📝 License

This project is for educational purposes.

## 🙏 Acknowledgments

- React Three Fiber community for excellent 3D tools
- Groq for providing fast AI inference
- Meta for the Llama language models

---

**Happy English Learning! 🎓🛒**
