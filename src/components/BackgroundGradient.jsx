import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const themes = {
  sunny: {
    base: 'linear-gradient(135deg, #FF9D6C 0%, #BB4E75 100%)',
    orbs: ['#FF9D6C', '#BB4E75', '#ffffff']
  },
  night: {
    base: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    orbs: ['#203A43', '#2C5364', '#0F2027']
  },
  rainy: {
    base: 'linear-gradient(135deg, #616161 0%, #9bc5c3 100%)',
    orbs: ['#616161', '#9bc5c3', '#ffffff']
  },
  cloudy: {
    base: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
    orbs: ['#bdc3c7', '#2c3e50', '#ffffff']
  },
  tropical: {
    base: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
    orbs: ['#00b4db', '#0083b0', '#ffffff']
  },
};

const Orb = ({ color, mouseX, mouseY, index }) => {
  const springConfig = { stiffness: 50, damping: 40 };
  const tx = useSpring(useTransform(mouseX, [0, 100], [-150, 150]), springConfig);
  const ty = useSpring(useTransform(mouseY, [0, 100], [-150, 150]), springConfig);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        background: `radial-gradient(circle at center, ${color}66 0%, transparent 70%)`,
        x: tx,
        y: ty,
        top: `${index * 30}%`,
        left: `${index * 30}%`,
        filter: 'blur(100px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const BackgroundGradient = ({ weather }) => {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const currentTheme = themes[weather] || themes.sunny;
  const spotlight = useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(800px circle at ${x}% ${y}%, rgba(255,255,255,0.1), transparent 80%)`);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#050505]" style={{ zIndex: -1 }}>
      {/* Base Weather Background */}
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        style={{ background: currentTheme.base }}
      />

      {/* Living Orbs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden mix-blend-screen">
        {currentTheme.orbs.map((color, i) => (
          <Orb key={`${weather}-${i}`} color={color} mouseX={mouseX} mouseY={mouseY} index={i} />
        ))}
      </div>

      {/* Interactive Light Spotlight */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-plus-lighter"
        style={{ background: spotlight }}
      />
      
      {/* Texture Noise */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />
    </div>
  );
};

export default BackgroundGradient;
