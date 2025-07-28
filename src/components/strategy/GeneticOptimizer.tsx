import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dna, Play, Pause, RotateCcw, TrendingUp } from 'lucide-react';

interface Individual {
  id: string;
  fitness: number;
  parameters: {
    rsi_period: number;
    rsi_oversold: number;
    rsi_overbought: number;
    volume_multiplier: number;
    stop_loss: number;
    take_profit: number;
  };
  sharpe_ratio: number;
  max_drawdown: number;
  win_rate: number;
}

const GeneticOptimizer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState<Individual[]>([]);
  const [bestIndividual, setBestIndividual] = useState<Individual | null>(null);

  const generateRandomIndividual = (): Individual => ({
    id: Math.random().toString(36).substr(2, 9),
    fitness: Math.random() * 100,
    parameters: {
      rsi_period: Math.floor(Math.random() * 20) + 10,
      rsi_oversold: Math.floor(Math.random() * 20) + 20,
      rsi_overbought: Math.floor(Math.random() * 20) + 70,
      volume_multiplier: parseFloat((Math.random() * 2 + 1).toFixed(2)),
      stop_loss: parseFloat((Math.random() * 0.05 + 0.02).toFixed(3)),
      take_profit: parseFloat((Math.random() * 0.2 + 0.1).toFixed(3)),
    },
    sharpe_ratio: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
    max_drawdown: parseFloat((Math.random() * 0.3 + 0.05).toFixed(3)),
    win_rate: parseFloat((Math.random() * 0.4 + 0.5).toFixed(3)),
  });

  const startOptimization = () => {
    setIsRunning(true);
    setGeneration(0);
    
    // Initialize population
    const initialPopulation = Array.from({ length: 20 }, generateRandomIndividual);
    setPopulation(initialPopulation);
    setBestIndividual(initialPopulation.reduce((best, current) => 
      current.fitness > best.fitness ? current : best
    ));

    // Simulate evolution
    const interval = setInterval(() => {
      setGeneration(prev => {
        const newGen = prev + 1;
        if (newGen >= 50) {
          setIsRunning(false);
          clearInterval(interval);
          return newGen;
        }
        
        // Update population fitness
        setPopulation(prevPop => {
          const newPop = prevPop.map(individual => ({
            ...individual,
            fitness: Math.min(individual.fitness + Math.random() * 5, 100),
            sharpe_ratio: Math.min(individual.sharpe_ratio + Math.random() * 0.1, 3),
          }));
          
          const best = newPop.reduce((best, current) => 
            current.fitness > best.fitness ? current : best
          );
          setBestIndividual(best);
          
          return newPop;
        });
        
        return newGen;
      });
    }, 100);
  };

  const stopOptimization = () => {
    setIsRunning(false);
  };

  const resetOptimization = () => {
    setIsRunning(false);
    setGeneration(0);
    setPopulation([]);
    setBestIndividual(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Genetic Algorithm Optimizer</h3>
          <p className="text-sm text-slate-600">Evolve optimal strategy parameters using genetic algorithms</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={startOptimization}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg disabled:opacity-50 hover:from-green-600 hover:to-emerald-600"
          >
            <Play className="w-4 h-4" />
            <span>Start Evolution</span>
          </button>
          
          <button
            onClick={stopOptimization}
            disabled={!isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:bg-red-600"
          >
            <Pause className="w-4 h-4" />
            <span>Stop</span>
          </button>
          
          <button
            onClick={resetOptimization}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress */}
      {(isRunning || generation > 0) && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Dna className={`w-5 h-5 text-white ${isRunning ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Generation {generation}</h4>
                <p className="text-sm text-slate-600">Population: {population.length} individuals</p>
              </div>
            </div>
            
            {bestIndividual && (
              <div className="text-right">
                <p className="text-sm text-slate-600">Best Fitness</p>
                <p className="text-2xl font-bold text-green-600">{bestIndividual.fitness.toFixed(1)}%</p>
              </div>
            )}
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(generation / 50) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Best Individual */}
      {bestIndividual && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Best Individual (Generation {generation})</h4>
              <p className="text-sm text-slate-600">Highest performing parameter set</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-slate-600">Fitness Score</p>
              <p className="text-xl font-bold text-green-600">{bestIndividual.fitness.toFixed(1)}%</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-slate-600">Sharpe Ratio</p>
              <p className="text-xl font-bold text-blue-600">{bestIndividual.sharpe_ratio.toFixed(2)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-slate-600">Win Rate</p>
              <p className="text-xl font-bold text-purple-600">{(bestIndividual.win_rate * 100).toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-medium text-slate-900 mb-3">Optimized Parameters</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div>
                <span className="text-slate-600">RSI Period:</span>
                <span className="ml-2 font-medium">{bestIndividual.parameters.rsi_period}</span>
              </div>
              <div>
                <span className="text-slate-600">RSI Oversold:</span>
                <span className="ml-2 font-medium">{bestIndividual.parameters.rsi_oversold}</span>
              </div>
              <div>
                <span className="text-slate-600">RSI Overbought:</span>
                <span className="ml-2 font-medium">{bestIndividual.parameters.rsi_overbought}</span>
              </div>
              <div>
                <span className="text-slate-600">Volume Multiplier:</span>
                <span className="ml-2 font-medium">{bestIndividual.parameters.volume_multiplier}x</span>
              </div>
              <div>
                <span className="text-slate-600">Stop Loss:</span>
                <span className="ml-2 font-medium">{(bestIndividual.parameters.stop_loss * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-slate-600">Take Profit:</span>
                <span className="ml-2 font-medium">{(bestIndividual.parameters.take_profit * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Population Overview */}
      {population.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-4">Population Fitness Distribution</h4>
          <div className="space-y-2">
            {population.slice(0, 10).map((individual, index) => (
              <div key={individual.id} className="flex items-center space-x-3">
                <span className="text-sm text-slate-600 w-8">#{index + 1}</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${individual.fitness}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 w-12">
                  {individual.fitness.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneticOptimizer;
