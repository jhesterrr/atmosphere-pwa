import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sun, Moon, CloudRain, Cloud, Wind, Droplets, Thermometer, Palmtree } from 'lucide-react';
import { cn } from '../utils/cn';

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case 'tropical': return <Palmtree className="w-16 h-16 text-emerald-300" />;
    case 'sunny': return <Sun className="w-16 h-16 text-yellow-300" />;
    case 'night': return <Moon className="w-16 h-16 text-indigo-300" />;
    case 'rainy': return <CloudRain className="w-16 h-16 text-blue-300" />;
    case 'cloudy': return <Cloud className="w-16 h-16 text-gray-300" />;
    default: return <Sun className="w-16 h-16 text-yellow-300" />;
  }
};

const WeatherCard = ({ weather, temperature, humidity, windSpeed, location }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative p-10 rounded-[2.5rem]",
        "bg-white/5 backdrop-blur-2xl border border-white/20",
        "shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
        "flex flex-col items-center justify-center gap-8",
        "w-full max-w-[340px] mx-auto",
        "cursor-default group"
      )}
    >
      {/* Glossy Reflection Effect */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center gap-3 relative z-10" style={{ transform: "translateZ(50px)" }}>
        <h2 className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">{location}</h2>
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <WeatherIcon condition={weather} />
        </motion.div>
      </div>

      <div className="flex flex-col items-center relative z-10" style={{ transform: "translateZ(70px)" }}>
        <motion.span 
          key={temperature}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-thin text-white tracking-tighter"
        >
          {temperature}°
        </motion.span>
        <span className="text-white/60 text-sm font-semibold tracking-widest uppercase mt-2">{weather}</span>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full mt-2 pt-8 border-t border-white/5 relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
          <Droplets className="w-5 h-5 text-white/40" />
          <span className="text-white text-xs font-bold">{humidity}%</span>
          <span className="text-white/20 text-[8px] tracking-tighter uppercase font-bold">Hum</span>
        </div>
        <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
          <Wind className="w-5 h-5 text-white/40" />
          <span className="text-white text-xs font-bold">{windSpeed}</span>
          <span className="text-white/20 text-[8px] tracking-tighter uppercase font-bold">km/h</span>
        </div>
        <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
          <Thermometer className="w-5 h-5 text-white/40" />
          <span className="text-white text-xs font-bold">22°</span>
          <span className="text-white/20 text-[8px] tracking-tighter uppercase font-bold">Feel</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
