"use client";

import { useState } from 'react';
import { Lightbulb, Mic, Sparkles, Brain, TrendingUp, Cloud } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import Badge from '@/app/components/ui/Badge';
import { formatRelativeTime } from '@/app/lib/utils/format';

export default function SmartAdvicePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Mock advice data
  const mockAdvice = [
    {
      advice_id: 1,
      context_type: 'weather',
      advice_text:
        'Heavy rainfall expected in the next 48 hours. Avoid irrigation and consider harvesting mature crops if possible.',
      confidence_score: 0.94,
      generated_by: 'AI',
      created_at: '2025-11-04T08:00:00Z',
    },
    {
      advice_id: 2,
      context_type: 'market',
      advice_text:
        'Wheat prices showing upward trend (+5.2%). Consider selling your harvest within the next week for optimal returns.',
      confidence_score: 0.87,
      generated_by: 'AI',
      created_at: '2025-11-03T14:30:00Z',
    },
    {
      advice_id: 3,
      context_type: 'crop_health',
      advice_text:
        'Temperature rising above 35°C. Increase irrigation frequency for cotton crops and provide shade if possible.',
      confidence_score: 0.91,
      generated_by: 'RuleEngine',
      created_at: '2025-11-02T10:15:00Z',
    },
    {
      advice_id: 4,
      context_type: 'custom',
      advice_text:
        'Based on your farm profile, November is the optimal time to start wheat planting in your region.',
      confidence_score: 0.89,
      generated_by: 'Expert',
      created_at: '2025-11-01T09:00:00Z',
    },
  ];

  const getContextIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="w-5 h-5" />;
      case 'market':
        return <TrendingUp className="w-5 h-5" />;
      case 'crop_health':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getContextColor = (type: string) => {
    switch (type) {
      case 'weather':
        return 'info';
      case 'market':
        return 'success';
      case 'crop_health':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const handleGenerateAdvice = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive);
    // Voice input implementation would go here
  };

  return (
    <ProtectedRoute allowedRoles={['farmer']}>
      <DashboardLayout role="farmer">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
              Smart Farmer Advice
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              AI-powered recommendations for your farm
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard variant="elevated">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[var(--color-primary-subtle)]">
                  <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    Generate New Advice
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Get personalized recommendations based on current weather, market
                    trends, and your farm profile
                  </p>
                  <ModernButton
                    variant="primary"
                    size="md"
                    onClick={handleGenerateAdvice}
                    loading={isGenerating}
                    disabled={isGenerating}
                  >
                    <Brain className="w-5 h-5" />
                    Generate Advice
                  </ModernButton>
                </div>
              </div>
            </ModernCard>

            <ModernCard variant="elevated">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[var(--color-info-light)]">
                  <Mic className="w-8 h-8 text-[var(--color-info)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    Voice Assistant (KhetBot)
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Ask questions in Urdu or Roman Urdu using voice commands
                  </p>
                  <ModernButton
                    variant={isVoiceActive ? 'destructive' : 'secondary'}
                    size="md"
                    onClick={handleVoiceInput}
                  >
                    <Mic
                      className={`w-5 h-5 ${isVoiceActive ? 'animate-pulse' : ''}`}
                    />
                    {isVoiceActive ? 'Stop Listening' : 'Start Voice Input'}
                  </ModernButton>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* AI Advice History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-[var(--color-warning)]" />
              <h2 className="text-2xl font-semibold text-[var(--color-text)]">
                Your Advice History
              </h2>
            </div>

            <div className="space-y-4">
              {mockAdvice.map((advice) => (
                <ModernCard
                  key={advice.advice_id}
                  hoverable
                  className={`border-l-4 border-l-[var(--color-${getContextColor(
                    advice.context_type
                  )})]`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`p-3 rounded-lg bg-[var(--color-${getContextColor(
                        advice.context_type
                      )}-light)]`}
                    >
                      <div
                        className={`text-[var(--color-${getContextColor(
                          advice.context_type
                        )})]`}
                      >
                        {getContextIcon(advice.context_type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant={getContextColor(
                              advice.context_type
                            )}
                            size="sm"
                          >
                            {advice.context_type.replace('_', ' ')}
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            {advice.generated_by}
                          </Badge>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {formatRelativeTime(advice.created_at)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-[var(--color-text-muted)]">
                            Confidence
                          </p>
                          <p className="text-sm font-bold text-[var(--color-success)]">
                            {Math.round(advice.confidence_score * 100)}%
                          </p>
                        </div>
                      </div>

                      <p className="text-[var(--color-text-secondary)]">
                        {advice.advice_text}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button className="text-sm text-[var(--color-primary)] hover:underline">
                          View Details
                        </button>
                        <span className="text-[var(--color-text-muted)]">•</span>
                        <button className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                          Mark as Read
                        </button>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <ModernCard variant="elevated" className="bg-gradient-to-r from-[var(--color-primary-subtle)] to-transparent">
            <div className="flex items-start gap-4">
              <Brain className="w-12 h-12 text-[var(--color-primary)] flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  How Smart Advice Works
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Our AI system analyzes multiple data sources including weather
                  forecasts, market trends, historical patterns, and your farm
                  profile to provide personalized recommendations. The confidence
                  score indicates the reliability of each recommendation.
                </p>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>✓ Real-time weather impact analysis</li>
                  <li>✓ Market price trend predictions</li>
                  <li>✓ Crop-specific health monitoring</li>
                  <li>✓ Multilingual voice support (Urdu/Roman Urdu/English)</li>
                </ul>
              </div>
            </div>
          </ModernCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
