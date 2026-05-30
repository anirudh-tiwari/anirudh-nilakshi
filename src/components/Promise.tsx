import { motion } from 'framer-motion';

const promises = [
  "To always choose you, every single day.",
  "To listen with my heart as much as my ears.",
  "To build a home filled with laughter and peace.",
  "To be your biggest fan and your safest harbor.",
  "To never stop learning how to love you better."
];

const Promise = () => {
  return (
    <section className="py-24 bg-pearl relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">My Promise to You</h2>
          <div className="w-24 h-[1px] bg-dusty-rose mx-auto" />
        </motion.div>

        <div className="space-y-6">
          {promises.map((promise, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex items-center space-x-6 p-6 rounded-lg bg-white/40 border border-white/60 backdrop-blur-sm"
            >
              <div className="text-3xl font-serif text-champagne opacity-50">0{index + 1}</div>
              <p className="text-xl md:text-2xl font-serif text-slate-700 italic">{promise}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-dusty-rose/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne/5 rounded-full blur-[100px] -ml-48 -mb-48" />
    </section>
  );
};

export default Promise;
