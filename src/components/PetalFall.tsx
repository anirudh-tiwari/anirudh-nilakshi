import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = () => {
  const [coords] = useState({
    x: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 20,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
  });

  return (
    <motion.div
      initial={{ y: -100, x: `${coords.x}vw`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: '110vh', 
        x: [`${coords.x}vw`, `${coords.x + (Math.random() * 10 - 5)}vw`],
        opacity: [0, 0.6, 0.6, 0],
        rotate: coords.rotate + 360 
      }}
      transition={{ 
        duration: coords.duration, 
        repeat: Infinity, 
        delay: coords.delay,
        ease: "linear"
      }}
      className="fixed z-50 pointer-events-none"
      style={{ scale: coords.scale }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C10 0 10 10 0 10C0 10 10 10 10 20C10 20 10 10 20 10C20 10 10 10 10 0Z" fill="#D4A5A5" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
};

const PetalFall = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petals.map((id) => (
        <Petal key={id} />
      ))}
    </div>
  );
};

export default PetalFall;
