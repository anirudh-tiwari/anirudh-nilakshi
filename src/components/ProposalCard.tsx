import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const ProposalCard = ({ onComplete }: { onComplete: () => void }) => {
  const [noCount, setNoCount] = useState(0);
  const [isYes, setIsYes] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 400;
    const newY = (Math.random() - 0.5) * 400;
    setNoButtonPos({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
  };

  const handleYes = () => {
    setIsYes(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A5A5', '#E6BE8A', '#FDFCF0']
    });
    
    // Wait for 2.5 seconds then transition to story
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely sure?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <section className="flex items-center justify-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-dusty-rose/20 text-center relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isYes ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="mb-8 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart className="w-16 h-16 text-dusty-rose fill-dusty-rose" />
                </motion.div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">
                Nilakshi...
              </h2>
              <p className="text-xl font-serif text-slate-600 mb-12">
                Will you be mine forever?
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative">
                <button
                  onClick={handleYes}
                  className="px-10 py-3 bg-dusty-rose text-white rounded-full font-bold text-lg hover:bg-dusty-rose/90 transition-all transform hover:scale-110 active:scale-95 shadow-lg z-10"
                >
                  Yes 💖
                </button>

                <motion.button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  className="px-10 py-3 bg-slate-100 text-slate-500 rounded-full font-bold text-lg z-0"
                >
                  {getNoButtonText()}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8"
              >
                <Heart className="w-20 h-20 text-dusty-rose fill-dusty-rose shadow-sm" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-serif text-dusty-rose font-bold leading-tight">
                Happy Birthday <br/> my Love!
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProposalCard;
