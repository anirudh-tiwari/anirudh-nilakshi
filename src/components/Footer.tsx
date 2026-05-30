import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-24 bg-white flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <Heart className="w-12 h-12 text-dusty-rose fill-dusty-rose/20 animate-pulse" />
      </motion.div>
      
      <h2 className="text-5xl md:text-6xl font-signature text-dusty-rose mb-4">
        Forever Yours
      </h2>
      
      <p className="text-slate-400 font-sans tracking-[0.2em] uppercase text-sm">
        Waiting for our forever to begin
      </p>
      
      <div className="mt-16 text-slate-300 text-xs">
        &copy; {new Date().getFullYear()} • Crafted with love
      </div>
    </footer>
  );
};

export default Footer;
