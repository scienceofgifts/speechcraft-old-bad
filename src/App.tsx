import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './views/DashboardView';
import { SpeechAnalysisView } from './views/SpeechAnalysisView';
import { PronunciationLabView } from './views/PronunciationLabView';
import { VoiceDeliveryView } from './views/VoiceDeliveryView';
import { FluencyGymView } from './views/FluencyGymView';
import { VocabularyStudioView } from './views/VocabularyStudioView';
import { VocabularyBuilderView } from './views/VocabularyBuilderView';
import { ConversationPracticeView } from './views/ConversationPracticeView';
import { FlirtingStudioView } from './views/FlirtingStudioView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';
import { OnboardingModal } from './components/OnboardingModal';
import { DailySessionModal } from './components/DailySessionModal';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredSessions,
  generateDailyPlan,
  saveDailyPlan,
} from './services/storage';
import { LearnerProfile, PracticeSessionRecord, DailySessionPlan } from './types/speech';
import { audioPlaybackManager } from './services/audioPlaybackManager';

export default function App() {
  const [profile, setProfile] = useState<LearnerProfile>(() => getStoredProfile());
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [sessions, setSessions] = useState<PracticeSessionRecord[]>(() => getStoredSessions());
  const [dailyPlan, setDailyPlan] = useState<DailySessionPlan>(() =>
    generateDailyPlan(profile.dailyDurationMinutes || 18)
  );

  // Stop any lingering audio playback when switching tabs to prevent audio leak
  useEffect(() => {
    audioPlaybackManager.stop();
  }, [currentTab]);

  // Modals state: only auto-open if onboarding has not been started yet (do NOT show if skipped or completed)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    const status = profile.onboardingStatus || (profile.onboarded ? 'completed' : 'not_started');
    return status === 'not_started';
  });
  const [isDailySessionOpen, setIsDailySessionOpen] = useState<boolean>(false);

  const refreshData = () => {
    const updatedProfile = getStoredProfile();
    setProfile(updatedProfile);
    setSessions(getStoredSessions());
    setDailyPlan(generateDailyPlan(updatedProfile.dailyDurationMinutes || 18));
  };

  const handleOnboardingComplete = (updatedProfile: LearnerProfile) => {
    setProfile(updatedProfile);
    setIsOnboardingOpen(false);
    refreshData();
  };

  const handleOnboardingSkip = (updatedProfile: LearnerProfile) => {
    setProfile(updatedProfile);
    setIsOnboardingOpen(false);
    refreshData();
  };

  const handleDismissNotice = () => {
    const updated: LearnerProfile = { ...profile, dismissedAssessmentNotice: true };
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handlePlanUpdate = (updatedPlan: DailySessionPlan) => {
    setDailyPlan(updatedPlan);
    saveDailyPlan(updatedPlan);
    setSessions(getStoredSessions());
  };

  const handleSelectExercise = (exerciseName: string) => {
    // Intelligently route exercise recommendation to the right lab
    const lower = exerciseName.toLowerCase();
    if (lower.includes('root') || lower.includes('etymology') || lower.includes('builder') || lower.includes('matrix')) {
      setCurrentTab('vocab-builder');
    } else if (lower.includes('rhotic') || lower.includes('flap') || lower.includes('th') || lower.includes('vowel')) {
      setCurrentTab('pronunciation');
    } else if (lower.includes('warm') || lower.includes('breath') || lower.includes('style') || lower.includes('pacing')) {
      setCurrentTab('delivery');
    } else if (lower.includes('filler') || lower.includes('pause') || lower.includes('concis') || lower.includes('gym')) {
      setCurrentTab('fluency');
    } else if (lower.includes('vocab') || lower.includes('collocation') || lower.includes('idiom')) {
      setCurrentTab('vocabulary');
    } else if (lower.includes('flirt') || lower.includes('banter') || lower.includes('romantic') || lower.includes('dating')) {
      setCurrentTab('flirting');
    } else if (lower.includes('conversation') || lower.includes('dialogue')) {
      setCurrentTab('conversation');
    } else {
      setCurrentTab('analysis');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Persistent Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        streakDays={3}
        onOpenSessionModal={() => setIsDailySessionOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            dailyPlan={dailyPlan}
            sessions={sessions}
            onStartSession={() => setIsDailySessionOpen(true)}
            onNavigateTab={setCurrentTab}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onDismissNotice={handleDismissNotice}
          />
        )}

        {currentTab === 'analysis' && (
          <SpeechAnalysisView
            profile={profile}
            onSelectExercise={handleSelectExercise}
          />
        )}

        {currentTab === 'pronunciation' && (
          <PronunciationLabView profile={profile} />
        )}

        {currentTab === 'delivery' && (
          <VoiceDeliveryView profile={profile} />
        )}

        {currentTab === 'fluency' && (
          <FluencyGymView profile={profile} />
        )}

        {/* Existing American Idioms & Vocabulary Feature (Preserved Intact) */}
        {currentTab === 'vocabulary' && (
          <VocabularyStudioView profile={profile} />
        )}

        {/* New Advanced Root-Based Vocabulary Builder Feature */}
        {currentTab === 'vocab-builder' && (
          <VocabularyBuilderView profile={profile} />
        )}

        {currentTab === 'conversation' && (
          <ConversationPracticeView profile={profile} />
        )}

        {currentTab === 'flirting' && (
          <FlirtingStudioView profile={profile} />
        )}

        {currentTab === 'progress' && (
          <ProgressView
            profile={profile}
            sessions={sessions}
            onRefreshData={refreshData}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            profile={profile}
            onProfileUpdate={setProfile}
            onRetakeAssessment={() => setIsOnboardingOpen(true)}
            onRefreshData={refreshData}
          />
        )}
      </main>

      {/* Studio Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="font-semibold text-slate-400">SpeechCraft Studio</span>
            <span>• Professional Spoken General American English & Lexical Mastery</span>
          </div>
          <div className="text-slate-500">
            Target: 15–20 minutes daily practice • In-memory audio processing
          </div>
        </div>
      </footer>

      {/* Onboarding & Diagnostic Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Guided Daily Session Modal */}
      <DailySessionModal
        isOpen={isDailySessionOpen}
        onClose={() => setIsDailySessionOpen(false)}
        plan={dailyPlan}
        onPlanUpdate={handlePlanUpdate}
      />
    </div>
  );
}
