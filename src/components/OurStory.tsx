import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Image as ImageIcon, ChevronRight, ChevronLeft, X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimelineSection {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
}

const timelineData: TimelineSection[] = [
  { id: 1, title: "The First Unexpected Meeting ❤️", subtitle: "2 Years Ago", images: ["image1.jpeg", "section01.png"] },
  { id: 2, title: "The Arrange Marriage Meeting ❤️", subtitle: "14 March 2026", images: ["image2.jpeg", "section11.jpeg", "section12.png"] },
  { id: 3, title: "Slowly Becoming Comfortable ❤️", subtitle: "The Beginning", images: ["image3.jpeg", "section21.jpeg", "section22.jpeg"] },
  { id: 4, title: "The Roka Day ❤️", subtitle: "19 April 2026", images: ["image4.jpeg", "section31.jpeg", "section32.jpeg", "section33.jpeg"] },
  { id: 5, title: "Our First Date ❤️", subtitle: "21 April 2026", images: ["image5.jpeg", "section41.jpeg", "section42.jpeg"] },
  { id: 6, title: "Falling In Love ❤️", subtitle: "Long Calls & Video Calls", images: ["image6.jpeg", "section51.jpeg", "section52.jpeg"] },
  { id: 7, title: "Seeing You In Lehenga ❤️", subtitle: "Delhi Meeting", images: ["image7.jpeg", "section61.jpeg", "section62.jpeg"] },
  { id: 8, title: "The Birthday Surprise ❤️", subtitle: "The Most Emotional Moment", images: ["image8.jpeg", "section71.jpeg", "section72.jpeg", "section73.jpeg"] },
  { id: 9, title: "HAPPY BIRTHDAY MY LOVE ❤️", subtitle: "Forever & Always", images: ["image9.jpeg"] },
];

const getAssetPath = (path: string) => {
  if (!path) return '';
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const OurStory = ({ onReset }: { onReset: () => void }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedMemory, setSelectedMemory] = useState<TimelineSection | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (activeStep < timelineData.length) {
      setActiveStep(prev => prev + 1);
      setSelectedMemory(null);
      
      // Auto-scroll to next step after a short delay
      setTimeout(() => {
        const nextElement = document.getElementById(`step-${activeStep + 1}`);
        nextElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    } else {
      setIsCompleted(true);
      setSelectedMemory(null);
      triggerFinalCelebration();
    }
  };

  const triggerFinalCelebration = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (isCompleted) {
    return <FinalScreen onReplay={onReset} />;
  }

  return (
    <div className="relative min-h-screen bg-[#fff6f8] text-[#8b1e3f] selection:bg-[#f8e1e7] pb-20 overflow-x-hidden">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <FloatingParticles />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-tight">Our Story ❤️</h1>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#d63384] to-transparent mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline Connector SVG */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 -z-10">
            <TimelineLine progress={activeStep / timelineData.length} />
          </div>

          <div className="space-y-32">
            {timelineData.map((step) => (
              <TimelineStep 
                key={step.id}
                step={step}
                isActive={activeStep === step.id}
                isUnlocked={activeStep >= step.id}
                isCompleted={activeStep > step.id}
                onClick={() => activeStep >= step.id && setSelectedMemory(step)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Memory Expanded View */}
      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal 
            memory={selectedMemory} 
            onClose={() => setSelectedMemory(null)}
            onNext={handleNext}
            isLast={selectedMemory.id === timelineData.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelineStep = ({ step, isActive, isUnlocked, onClick }: any) => {
  return (
    <div id={`step-${step.id}`} className="relative group">
      {/* Timeline Dot */}
      <div className="absolute left-[31px] md:left-1/2 top-0 -translate-x-1/2 z-20">
        <motion.div
          animate={{ 
            scale: isActive ? [1, 1.2, 1] : 1,
            backgroundColor: isUnlocked ? '#d63384' : '#f8e1e7'
          }}
          transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
          className="w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(214,51,132,0.4)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: step.id % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`flex ${step.id % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8`}
      >
        <div className="flex-1 hidden md:block" />
        
        <motion.div 
          onClick={onClick}
          whileHover={isUnlocked ? { scale: 1.02, y: -5 } : {}}
          className={`flex-1 ml-12 md:ml-0 p-8 rounded-3xl backdrop-blur-md transition-all duration-700 cursor-pointer border ${
            isActive 
              ? 'bg-white/80 border-[#f5d0dc] shadow-2xl shadow-[#f8e1e7]' 
              : isUnlocked 
                ? 'bg-white/40 border-white/60 shadow-lg grayscale-0 opacity-80' 
                : 'bg-white/10 border-white/20 blur-[2px] opacity-40 grayscale pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-4 mb-3">
             <span className="text-sm font-bold uppercase tracking-widest text-[#d63384]/60">#{step.id}</span>
             <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d63384]/20 to-transparent" />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-2">{step.title}</h3>
          <p className="text-sm italic text-[#8b1e3f]/70 mb-6">{step.subtitle}</p>
          
          {/* Blurred Preview Card */}
          <div className="relative h-48 w-full rounded-2xl bg-[#f8e1e7]/20 border border-white/40 flex items-center justify-center overflow-hidden">
             {/* Blurred Image Background */}
             <img 
               src={getAssetPath(step.images[0])} 
               alt="" 
               className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-[#f8e1e7]/30 to-[#f5d0dc]/30" />
             
             <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="p-3 bg-white/40 backdrop-blur-md rounded-full shadow-sm">
                   <ImageIcon className="w-6 h-6 text-[#d63384]/80" />
                </div>
                <span className="text-sm font-serif font-bold text-[#8b1e3f] uppercase tracking-widest drop-shadow-sm">Tap to view</span>
             </div>

             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const MemoryModal = ({ memory, onClose, onNext, isLast }: any) => {
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = memory.images.length;

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(prev => (prev < totalImages - 1 ? prev + 1 : prev));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 backdrop-blur-2xl bg-[#fff6f8]/90"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-4xl bg-white rounded-[32px] md:rounded-[40px] shadow-[0_30px_100px_rgba(139,30,63,0.15)] border border-white flex flex-col overflow-hidden h-fit max-h-[95vh]"
      >
        {/* Compact Sticky Header */}
        <div className="sticky top-0 z-50 w-full px-6 py-3 md:px-10 md:py-4 bg-white/90 backdrop-blur-md border-b border-[#f8e1e7] flex items-center justify-between gap-4 shrink-0">
           <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-2xl font-serif font-bold text-[#8b1e3f] leading-tight truncate">{memory.title}</h2>
              <p className="text-[10px] md:text-sm italic text-[#d63384]/60 truncate">{memory.subtitle}</p>
           </div>

           <button 
             onClick={onClose}
             className="shrink-0 p-1.5 md:p-2 hover:bg-[#f8e1e7] rounded-full transition-colors shadow-sm border border-[#f8e1e7]"
           >
             <X className="w-4 h-4 md:w-5 md:h-5 text-[#d63384]" />
           </button>
        </div>

        {/* Content Area - Maximized for Image clarity */}
        <div className="relative bg-white flex items-center justify-center overflow-hidden min-h-0">
          <div className="relative w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x > swipeThreshold && currentImg > 0) {
                    setCurrentImg(prev => prev - 1);
                  } else if (info.offset.x < -swipeThreshold && currentImg < totalImages - 1) {
                    setCurrentImg(prev => prev + 1);
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center relative w-full touch-none"
              >
                 <img 
                   src={getAssetPath(memory.images[currentImg])} 
                   alt={`Memory ${currentImg + 1}`}
                   className="w-auto h-auto max-w-full max-h-[calc(95vh-120px)] block object-contain shadow-inner"
                 />
                 
                 {/* Desktop Only Side Arrows */}
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-4 pointer-events-none w-full">
                   {currentImg > 0 && (
                     <button
                       onClick={handlePrevImg}
                       className="pointer-events-auto p-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-lg transition-all border border-[#f8e1e7]"
                     >
                       <ChevronLeft className="w-6 h-6 text-[#d63384]" />
                     </button>
                   )}
                   <div />
                   {currentImg < totalImages - 1 && (
                     <button
                       onClick={handleNextImg}
                       className="pointer-events-auto p-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-lg transition-all border border-[#f8e1e7]"
                     >
                       <ChevronRight className="w-6 h-6 text-[#d63384]" />
                     </button>
                   )}
                 </div>

                 {/* Next/Complete Button - Desktop Only Overlay */}
                 {currentImg === totalImages - 1 && (
                   <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                     <motion.button
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       onClick={onNext}
                       className="px-10 py-3.5 bg-[#d63384] text-white rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm"
                     >
                       {isLast ? "Complete Our Story ❤️" : "Next Memory ❤️"}
                       <ChevronRight className="w-5 h-5" />
                     </motion.button>
                   </div>
                 )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile-only Footer - Pagination and Action Button */}
        <div className="md:hidden p-6 bg-white border-t border-[#f8e1e7] flex flex-col items-center gap-6 shrink-0">
           {/* Mobile Dots - Only show if button is NOT visible */}
           {currentImg !== totalImages - 1 && (
             <div className="flex gap-1.5 bg-black/5 p-2 rounded-full">
               {Array.from({ length: totalImages }).map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setCurrentImg(i)}
                   className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                     currentImg === i ? 'bg-[#d63384] w-4' : 'bg-[#d63384]/20'
                   }`}
                 />
               ))}
             </div>
           )}

           {/* Mobile Next/Complete Button */}
           {currentImg === totalImages - 1 && (
             <motion.button
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               onClick={onNext}
               className="w-full py-4 bg-[#d63384] text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-2"
             >
               {isLast ? "Complete Our Story ❤️" : "Next Memory ❤️"}
               <ChevronRight className="w-5 h-5" />
             </motion.button>
           )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimelineLine = ({ progress }: any) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 2 1000" preserveAspectRatio="none" className="overflow-visible">
      <path
        d="M 1 0 Q 20 125 1 250 Q -18 375 1 500 Q 20 625 1 750 Q -18 875 1 1000"
        fill="none"
        stroke="#f8e1e7"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <motion.path
        d="M 1 0 Q 20 125 1 250 Q -18 375 1 500 Q 20 625 1 750 Q -18 875 1 1000"
        fill="none"
        stroke="#d63384"
        strokeWidth="2"
        style={{ pathLength: progress }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  );
};

const FloatingParticles = () => {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.2
          }}
          animate={{ 
            y: ["-20vh", "120vh"],
            x: (Math.random() * 100) + "vw"
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: -Math.random() * 20
          }}
          className="absolute"
        >
          <Heart className="w-4 h-4 text-[#f5d0dc] fill-current" />
        </motion.div>
      ))}
    </>
  );
};

const FinalScreen = ({ onReplay }: any) => {
  return (
    <div className="min-h-screen bg-[#fff6f8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8 inline-block"
        >
          <Heart className="w-32 h-32 text-[#d63384] fill-[#d63384] drop-shadow-[0_0_30px_rgba(214,51,132,0.4)]" />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#8b1e3f] mb-4">
          HAPPY BIRTHDAY <br/> MY LOVE ❤️
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-3xl md:text-5xl font-serif font-bold text-[#d63384] mb-8"
        >
          I love you Nilakshi ❤️
        </motion.p>
        
        <p className="text-xl md:text-2xl font-serif text-[#d63384]/80 max-w-2xl mx-auto mb-16 italic">
          To many more memories, endless laughs, and a love that never stops growing.
        </p>

        <button
          onClick={onReplay}
          className="flex items-center gap-3 px-10 py-4 bg-white border-2 border-[#f8e1e7] text-[#d63384] rounded-full font-bold shadow-xl hover:bg-[#fff6f8] transition-all transform hover:scale-105 active:scale-95 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Replay From Start ❤️
        </button>
      </motion.div>

      {/* Falling Rose Petals Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, x: Math.random() * 100 + "vw", rotate: 0 }}
            animate={{ 
              y: "110vh", 
              x: (Math.random() * 100) + "vw",
              rotate: 360 
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-3xl"
          >
            🌸
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurStory;
