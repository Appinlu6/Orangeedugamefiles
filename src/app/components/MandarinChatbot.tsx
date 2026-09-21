import { useState } from 'react';
import { X, Send, Mic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface MandarinChatbotProps {
  onClose?: () => void;
}

export function MandarinChatbot({ onClose }: MandarinChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // 对应 Affective State: happy (Positive), calm (Empathetic), excited (High Arousal)
  const [mood, setMood] = useState<'happy' | 'calm' | 'excited'>('happy');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '你好！我是橘小橘，你的普通话小导师！😊 今天想聊些什么呢？',
      timestamp: new Date(Date.now() - 300000)
    }
  ]);

  const quickReplies = [
    '告诉我更多关于屈原的故事',
    '怎样种橘子树呢？',
    '教我一首古诗吧',
    '橘子有什么营养？'
  ];

  const fetchAIResponse = async (userText: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://goswngvyhaaldrohzsva.supabase.co/functions/v1/Gemini_API',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`, // 🔥 很关键
          },
          body: JSON.stringify({
            message: userText
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error from Gemini API: ${response.status} - ${errorText}`);
        throw new Error('Gemini API error');
      }

      const data = await response.json();
      
      if (!data?.reply) {
        console.error('Error: Invalid response structure from Gemini API');
        throw new Error('Invalid response structure');
      }

      const botReply = data.reply;
      const responseMood = data.mood || 'happy';
      
      setMood(responseMood as 'happy' | 'calm' | 'excited');

      const aiMessage: Message = {
        id: Date.now(),
        type: 'ai',
        content: botReply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error(`Error fetching AI response:`, error);
      
      // Fallback response
      const aiMessage: Message = {
        id: Date.now(),
        type: 'ai',
        content: '抱歉，我现在有点累了🍊 请稍后再试一次好吗？',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      const userContent = message;
      const newMessage: Message = {
        id: Date.now(),
        type: 'user',
        content: userContent,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      fetchAIResponse(userContent);
    }
  };

  const handleQuickReply = (reply: string) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: reply,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    fetchAIResponse(reply);
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return 'bg-gradient-to-r from-orange-400 to-amber-400';
      case 'calm': return 'bg-gradient-to-r from-green-400 to-emerald-400';
      case 'excited': return 'bg-gradient-to-r from-pink-400 to-rose-400';
      default: return 'bg-gradient-to-r from-orange-400 to-amber-400';
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 shadow-2xl flex items-center justify-center border-4 border-white/30"
          >
            <div className="relative">
              <span className="text-5xl animate-bounce">🍊</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[80vh] flex flex-col"
          >
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-xl bg-white/90 border-2 border-white/50 flex flex-col h-[600px]">
              
              {/* 情绪指示器 - 基于 Affective Computing */}
              <div className="absolute top-0 left-0 right-0 h-1 z-10">
                <div className={`h-full ${getMoodColor()} ${isLoading ? 'animate-pulse' : ''} transition-all duration-700`} />
              </div>

              {/* 标题栏 */}
              <div className="relative px-6 py-5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="text-4xl">🍊</span>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">橘小橘</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${isLoading ? 'bg-orange-500 animate-bounce' : 'bg-green-500 animate-pulse'} rounded-full`} />
                        <span className="text-sm font-medium text-gray-600">
                          {isLoading ? '正在思考中...' : '在线'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-orange-100">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* 聊天区域 */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-3xl px-5 py-3 ${
                        msg.type === 'user' 
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                      }`}>
                        <p className="text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 block px-2">
                        {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                   <div className="flex justify-start">
                     <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 flex gap-1">
                       <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" />
                       <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                       <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
                     </div>
                   </div>
                )}
              </div>

              {/* 快速回复 */}
              <div className="px-6 py-3 border-t border-orange-100/50">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 disabled:opacity-50"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* 输入区域 */}
              <div className="px-6 py-4 border-t border-orange-100/50 bg-white/90">
                <div className="flex items-center gap-3">
                  <button className="p-3 rounded-full bg-green-100 hover:bg-green-200">
                    <Mic className="w-5 h-5 text-green-600" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                    placeholder="问问橘小橘..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    disabled={isLoading}
                    className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg disabled:opacity-50"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}