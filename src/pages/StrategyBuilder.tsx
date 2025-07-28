import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Code, Play, Save, Download } from 'lucide-react';
import NLPStrategyInput from '../components/strategy/NLPStrategyInput';
import GeneticOptimizer from '../components/strategy/GeneticOptimizer';
import BacktestResults from '../components/strategy/BacktestResults';
import StrategyLibrary from '../components/strategy/StrategyLibrary';

const StrategyBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nlp' | 'genetic' | 'library' | 'backtest'>('nlp');

  const tabs = [
    { id: 'nlp', label: 'NLP Builder', icon: Bot },
    { id: 'genetic', label: 'Genetic Optimizer', icon: Zap },
    { id: 'library', label: 'Strategy Library', icon: Code },
    { id: 'backtest', label: 'Backtest Results', icon: Play },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Strategy Builder</h1>
          <p className="text-slate-600 mt-1">Create and optimize trading strategies with AI</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Save className="w-4 h-4" />
            <span>Save Strategy</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600">
            <Play className="w-4 h-4" />
            <span>Deploy Live</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'nlp' && <NLPStrategyInput />}
            {activeTab === 'genetic' && <GeneticOptimizer />}
            {activeTab === 'library' && <StrategyLibrary />}
            {activeTab === 'backtest' && <BacktestResults />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;
