import React, { useState, useEffect, useRef } from 'react';

// --- React Component ---
const App = () => {
  // --- STATE MANAGEMENT ---
  const [status, setStatus] = useState('Ready. Use the mic or type a message.');
  const [transcript, setTranscript] = useState([
    { speaker: 'ai', text: 'Welcome to the supermarket! How can I help you today?' },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [textInput, setTextInput] = useState('');

  // --- REFS ---
  const recognitionRef = useRef(null);

  // --- SCENE SETUP ---
  const scene = {
    context: "You are a friendly and helpful supermarket cashier talking to a customer who is practicing their English. The customer is at your checkout counter. They have bought a carton of milk, a loaf of bread, and three apples. Your name is Sarah. Keep your responses short, natural, and friendly. Ask questions to keep the conversation going.",
    character: "Cashier",
    items: [
      { name: 'Milk', emoji: '🥛' },
      { name: 'Bread', emoji: '🍞' },
      { name: 'Apples', emoji: '🍎' },
    ],
  };

  // --- SPEECH RECOGNITION SETUP ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        addMessage('user', spokenText);
        generateAiResponse(spokenText);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setStatus('Ready. Use the mic or type a message.');
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'audio-capture' || event.error === 'not-allowed') {
            setStatus('No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.');
        } else {
            setStatus(`Speech error: ${event.error}`);
        }
      };
    } else {
      setStatus("Voice recognition is not supported in this browser.");
    }
  }, []);

  // --- CORE FUNCTIONS ---

  const speak = (text) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setStatus('Speaking...');
    utterance.onend = () => setStatus('Ready. Use the mic or type a message.');
    speechSynthesis.speak(utterance);
  };

  const addMessage = (speaker, text) => {
    setTranscript(prev => [...prev, { speaker, text }]);
  };

  const generateAiResponse = async (userText) => {
    if (!userText.trim()) return;
    setStatus('Thinking...');
    
    const conversationHistory = transcript.map(msg => `${msg.speaker === 'user' ? 'Customer' : 'Sarah'}: ${msg.text}`).join('\n');
    const prompt = `${scene.context}\n\n--- Conversation History ---\n${conversationHistory}\nCustomer: ${userText}\nSarah:`;

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.response;
      
      addMessage('ai', aiText);
      speak(aiText);

    } catch (error) {
      console.error("AI generation error", error);
      const errorMsg = `Sorry, I had a problem: ${error.message}`;
      addMessage('ai', errorMsg);
      speak(errorMsg);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      speechSynthesis.cancel();
      recognitionRef.current?.start();
      setIsRecording(true);
      setStatus('Listening...');
    }
  };
  
  const handleTextSubmit = () => {
      if (textInput.trim()) {
          addMessage('user', textInput);
          generateAiResponse(textInput);
          setTextInput('');
      }
  };

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          handleTextSubmit();
      }
  };

  // --- RENDER ---
  return (
    <div className="app-container">
      {/* --- SCENE VIEW --- */}
      <div className="scene-container">{/* SVG content remains the same */}</div>

      {/* --- CHAT VIEW --- */}
      <div className="chat-container">
        <div className="transcript">{/* Transcript mapping remains the same */}</div>
        <div className="controls">
          <button
            className={`mic-button ${isRecording ? 'recording' : ''}`}
            onClick={handleMicClick}
          >
            {isRecording ? 'Stop' : 'Mic'}
          </button>
          <input 
            type="text"
            className="text-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Or type here and press Enter..."
          />
          <button className="send-button" onClick={handleTextSubmit}>Send</button>
        </div>
        <p className="status">{status}</p>
      </div>
    </div>
  );
};

export default App;
