import { motion } from 'framer-motion';
import { Heart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

const events = [
  {
    title: "The Beginning",
    description: "The beautiful moment our paths first crossed and my world changed forever.",
    icon: <Sparkles className="w-6 h-6" />,
    date: "Our First Meet"
  },
  {
    title: "The Now",
    description: "Growing together, sharing laughs, and building a love that feels like home.",
    icon: <Heart className="w-6 h-6" />,
    date: "Today"
  },
  {
    title: "The Forever",
    description: "A lifetime of Sundays, shared dreams, and a love that only deepens with time.",
    icon: <InfinityIcon className="w-6 h-6" />,
    date: "Nilakshi & Me"
  }
];

const Journey = () => {
  return (
    <section className="py-24 bg-white/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-slate-800">Our Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-champagne/30 -translate-y-1/2 -z-10" />
          
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              className="bg-pearl p-8 rounded-lg shadow-sm border border-champagne/20 flex flex-col items-center text-center group hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-dusty-rose/10 rounded-full flex items-center justify-center text-dusty-rose mb-6 group-hover:scale-110 transition-transform">
                {event.icon}
              </div>
              <span className="text-xs uppercase tracking-widest text-champagne font-bold mb-2">{event.date}</span>
              <h3 className="text-2xl font-serif mb-4 text-slate-800">{event.title}</h3>
              <p className="text-slate-600 font-sans leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
