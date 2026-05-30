import { useState, useEffect } from 'react';
import ProposalCard from './components/ProposalCard';
import OurStory from './components/OurStory';
import PetalFall from './components/PetalFall';
import './App.css';

function App() {
  const [phase, setPhase] = useState<'proposal' | 'story'>('proposal');

  const handleStartStory = () => {
    setPhase('story');
  };

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
