import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Brain, Code } from 'lucide-react';

const NLPStrategyInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<string | null>(null);

  const examplePrompts = [
    "Buy AAPL when RSI is below 30 and volume is above average",
    "Create a momentum strategy that buys on breakouts above 20-day high",
    "Design a mean reversion strategy for SPY using Bollinger Bands",
    "Build a pairs trading strategy between TSLA and F with correlation threshold"
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedStrategy(`
def momentum_strategy(data):
    """
    AI-Generated Momentum Strategy
    Based on: "${input}"
    """
    import pandas as pd
    import numpy as np
    
    # Calculate technical indicators
    data['rsi'] = calculate_rsi(data['close'], 14)
    data['volume_ma'] = data['volume'].rolling(20).mean()
    data['price_ma'] = data['close'].rolling(20).mean()
    
    # Generate signals
    buy_signal = (
        (data['rsi'] < 30) & 
        (data['volume'] > data['volume_ma'] * 1.5) &
        (data['close'] > data['price_ma'])
    )
    
    sell_signal = (
        (data['rsi'] > 70) |
        (data['close'] < data['price_ma'] * 0.95)
    )
    
    return buy_signal, sell_signal

# Strategy Parameters (AI Optimized)
risk_per_trade = 0.02  # 2% risk per trade
max_positions = 5      # Maximum concurrent positions
stop_loss = 0.05       # 5% stop loss
take_profit = 0.15     # 15% take profit
    `);
    
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Describe your trading strategy in natural language
          </label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Buy when RSI is oversold and volume spikes, sell when price reaches resistance..."
              className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!input.trim() || isProcessing}
              className="absolute bottom-3 right-3 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg disabled:opacity-50 hover:from-cyan-600 hover:to-blue-600 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Brain className="w-4 h-4 animate-pulse" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Example Prompts */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-3">Example prompts:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePrompts.map((prompt, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setInput(prompt)}
                className="text-left p-3 border border-slate-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="text-sm text-slate-700">{prompt}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Processing Animation */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">AI is analyzing your strategy...</h3>
              <p className="text-sm text-slate-600">Generating optimized code and parameters</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {['Parsing natural language...', 'Identifying trading logic...', 'Optimizing parameters...', 'Generating Python code...'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.5 }}
                className="flex items-center space-x-2"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-700">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Generated Strategy */}
      {generatedStrategy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Generated Strategy Code</h3>
                <p className="text-sm text-slate-400">Python implementation ready for backtesting</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600">
              Copy Code
            </button>
          </div>
          
          <pre className="text-sm text-slate-300 overflow-x-auto">
            <code>{generatedStrategy}</code>
          </pre>
          
          <div className="mt-4 flex items-center space-x-3">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600">
              Run Backtest
            </button>
            <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800">
              Optimize Parameters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NLPStrategyInput;
