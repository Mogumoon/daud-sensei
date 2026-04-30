import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Bot, User, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import useChatStore from '../stores/useChatStore';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, i) => {
      // Bold text with **
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold my-2 text-primary text-lg">{line.replace(/\*\*/g, '')}</p>;
      }
      
      // List items
      if (line.startsWith('- ')) {
        const listContent = line.slice(2);
        return (
          <div key={i} className="ml-4 my-2 flex items-start gap-3">
            <span className="text-accent mt-1 font-bold">•</span>
            <span className="flex-1" dangerouslySetInnerHTML={{ 
              __html: listContent
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic text-gray-600 font-mono text-sm bg-gray-50 px-1 rounded">$1</em>')
            }} />
          </div>
        );
      }
      
      // Section headers (lines that end with :)
      if (line.endsWith(':') && !line.startsWith('*') && line.length > 3) {
        return <h4 key={i} className="font-bold text-accent my-3 text-base border-l-4 border-accent pl-3 bg-accent/5 py-2 rounded-r">{line}</h4>;
      }
      
      // Numbered items or emoji bullets
      if (line.startsWith('🔹') || line.startsWith('🔸') || line.match(/^\d+\./)) {
        return <p key={i} className="my-2 font-medium text-gray-700">{line}</p>;
      }
      
      // Code or romaji (text between single asterisks)
      if (line.match(/^\*.*\*$/)) {
        return <p key={i} className="italic text-sm text-gray-600 my-2 font-mono bg-gray-50 px-3 py-2 rounded-lg border-l-4 border-gray-300">
          {line.replace(/\*/g, '')}
        </p>;
      }
      
      // Japanese text detection (basic)
      if (line.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/)) {
        return <p key={i} className="my-2 text-xl font-medium text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">{line}</p>;
      }
      
      // Empty line
      if (line === '') return <br key={i} />;
      
      // Regular text with inline formatting
      return (
        <p key={i} className="my-1 leading-relaxed" dangerouslySetInnerHTML={{ 
          __html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic text-gray-600 font-mono text-sm bg-gray-50 px-1 rounded">$1</em>')
        }} />
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 group ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
      }`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative chat-message ${
        isUser
          ? 'bg-accent text-white rounded-br-md'
          : 'bg-white border border-gray-100 shadow-sm rounded-bl-md hover:shadow-md transition-shadow'
      }`}>
        <div className="space-y-1">
          {formatContent(message.content)}
        </div>
        
        {/* Copy button for assistant messages */}
        {!isUser && (
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
            title="Salin pesan"
          >
            {copied ? (
              <CheckCircle size={14} className="text-green-500" />
            ) : (
              <Copy size={14} className="text-gray-400" />
            )}
          </button>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 opacity-60 ${isUser ? 'text-white' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function AskSensei() {
  const { messages, isLoading, sendMessage, clearChat, error } = useChatStore();
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Use useMemo to avoid setting state in effect
  const shouldShowSuggestions = useMemo(() => {
    return messages.length <= 1;
  }, [messages.length]);

  useEffect(() => {
    setShowSuggestions(shouldShowSuggestions);
  }, [shouldShowSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const suggestions = [
    'Apa bedanya は dan が?',
    'Cara pakai て-form?',
    'Contoh kalimat dengan ～ている',
    'Arti dari いただきます?',
    'Bagaimana cara mengatakan "selamat pagi" dalam bahasa Jepang?',
    'Apa itu keigo (bahasa hormat)?',
  ];

  const quickActions = [
    { label: 'Tata Bahasa', query: 'Jelaskan tata bahasa dasar bahasa Jepang' },
    { label: 'Kosakata', query: 'Ajarkan kosakata bahasa Jepang sehari-hari' },
    { label: 'Kanji', query: 'Bagaimana cara belajar kanji yang efektif?' },
    { label: 'Budaya', query: 'Ceritakan tentang budaya Jepang' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-bg to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎌</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-800">Tanya Sensei</h1>
              <p className="text-sm text-text-muted flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI asisten bahasa Jepang
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearChat} 
              className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105" 
              aria-label="Clear chat"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome message and quick actions */}
          {shouldShowSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Selamat datang di Tanya Sensei! 🎌
                </h2>
                <p className="text-text-muted max-w-2xl mx-auto">
                  Saya siap membantu Anda belajar bahasa Jepang. Tanyakan apa saja tentang 
                  tata bahasa, kosakata, kanji, atau budaya Jepang!
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleSuggestionClick(action.query)}
                    className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    <div className="font-medium text-gray-800">{action.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence>
            {messages.map((msg, i) => (
              <ChatBubble key={`${i}-${msg.timestamp}`} message={msg} />
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Bot size={20} />
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl rounded-bl-md px-4 py-3 text-red-700">
                {error}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && shouldShowSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 pb-4"
          >
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-text-muted mb-3 text-center">💡 Contoh pertanyaan:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-sm px-4 py-2 rounded-xl bg-white border border-gray-100 text-text-muted hover:border-accent hover:text-accent hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 px-4 py-4 sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Tanya tentang bahasa Jepang... (Enter untuk kirim, Shift+Enter untuk baris baru)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 bg-white resize-none min-h-[48px] max-h-32"
                disabled={isLoading}
                rows={1}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-primary !px-4 !py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-xs text-text-muted mt-3">
            🤖 Powered by Gemini AI • Jawaban mungkin tidak selalu akurat
          </p>
        </form>
      </div>
    </div>
  );
}
