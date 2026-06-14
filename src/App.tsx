import { useState } from 'react';
import ProposalCard from './components/ProposalCard';
import OurStory from './components/OurStory';
import PetalFall from './components/PetalFall';
import './App.css';

function App() {
  const [phase, setPhase] = useState<'proposal' | 'story'>('proposal');
  const isTrue = true;

  const handleStartStory = () => {
    setPhase('story');
  };

  if (!isTrue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl text-2xl font-bold text-gray-800">
        NOT WORKING
      </div>
    );
  }

  return (
    <main className="min-h-screen selection:bg-[#f5d0dc] overflow-x-hidden">
      <PetalFall />
      {phase === 'proposal' ? (
        <div className="min-h-screen flex items-center justify-center bg-pearl">
          <ProposalCard onComplete={handleStartStory} />
        </div>
      ) : (
        <OurStory onReset={() => setPhase('proposal')} />
      )}
    </main>
  );
}

export default App;
