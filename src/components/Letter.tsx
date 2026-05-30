import { motion } from 'framer-motion';
import parchment from '../assets/parchment.png';
import goldLeaf from '../assets/gold-leaf.png';

const Letter = () => {
  return (
    <section className="py-24 px-6 bg-pearl overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 p-12 md:p-20 shadow-2xl rounded-sm"
          style={{
            backgroundImage: `url(${parchment})`,
            backgroundSize: 'cover',
          }}
        >
          {/* Decorative Corner */}
          <img 
            src={goldLeaf} 
            alt="" 
            className="absolute -top-10 -left-10 w-32 h-32 opacity-60 rotate-[-15deg] pointer-events-none"
          />
          <img 
            src={goldLeaf} 
            alt="" 
            className="absolute -bottom-10 -right-10 w-32 h-32 opacity-60 rotate-[165deg] pointer-events-none"
          />

          <div className="relative z-10 font-serif text-slate-800 space-y-8 leading-relaxed text-lg md:text-xl">
            <h2 className="text-3xl md:text-4xl text-dusty-rose mb-8 italic">My Dearest Nilakshi...</h2>
            
            <p>
              Every moment I spend thinking about our future, I see your smile and hear your laugh. You are the most beautiful part of my dreams, and I am so grateful to have you in my life.
            </p>

            <p>
              This space is a promise. A promise that while I wait for our paths to cross, I am becoming the man you deserve. I am building a life that has a beautiful, intentional space just for you.
            </p>

            <p>
              Until our "Forever" arrives, know that you are already loved, already cherished, and already the most important part of my world, Nilakshi.
            </p>

            <div className="pt-8 font-signature text-4xl text-dusty-rose">
              With all my love,
            </div>
          </div>
        </motion.div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-champagne/10 blur-[100px] -z-10" />
      </div>
    </section>
  );
};

export default Letter;
