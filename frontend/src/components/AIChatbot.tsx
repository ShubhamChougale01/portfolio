import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Shubham's AI assistant. Need help exploring the portfolio?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    'projects': "You can explore Shubham's projects in the Projects section. He's worked on Computer Vision, LLM integrations, and Edge AI implementations.",
    'skills': "Shubham specializes in Python, TensorFlow, PyTorch, OpenAI APIs, Computer Vision, and mobile AI implementations.",
    'experience': "Shubham has 5+ years of experience in AI/ML engineering, working on practical applications like property management systems and defect detection.",
    'contact': "You can reach out to Shubham through the Contact section below, or connect with him on LinkedIn.",
    'resume': "You can download Shubham's resume from the About section or contact him directly.",
    'hello': "Hello! I'm here to help you learn more about Shubham's work in AI and data science. What would you like to know?",
    'hi': "Hi there! Feel free to ask me about Shubham's projects, skills, or experience.",
    'default': "That's an interesting question! For detailed information, I'd recommend checking out the relevant sections of the portfolio or reaching out to Shubham directly."
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for responses
    const lowerInput = inputMessage.toLowerCase();
    let response = predefinedResponses.default;

    for (const [keyword, reply] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(keyword)) {
        response = reply;
        break;
      }
    }

    setTimeout(() => {
      const botMessage = { type: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-card border border-border rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-foreground font-semibold">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about projects, skills..."
                className="flex-1 px-3 py-2 bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-border"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
