import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import BackgroundGradient from './components/BackgroundGradient';
import { motion, AnimatePresence } from 'framer-motion';

const mockWeatherData = {
  tropical: {
    temperature: 32,
    humidity: 78,
    windSpeed: 10,
    location: "Manila, Philippines",
  },
  sunny: {
    temperature: 28,
    humidity: 45,
    windSpeed: 12,
    location: "Los Angeles",
  },
  night: {
    temperature: 18,
    humidity: 60,
    windSpeed: 8,
    location: "Tokyo",
  },
  rainy: {
    temperature: 14,
    humidity: 85,
    windSpeed: 22,
    location: "London",
  },
  cloudy: {
    temperature: 21,
    humidity: 55,
    windSpeed: 15,
    location: "Paris",
  },
};

function App() {
  const [currentWeather, setCurrentWeather] = useState('tropical');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const weatherStates = Object.keys(mockWeatherData);

  const toggleWeather = () => {
    const currentIndex = weatherStates.indexOf(currentWeather);
    const nextIndex = (currentIndex + 1) % weatherStates.length;
    setCurrentWeather(weatherStates[nextIndex]);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden px-4 bg-transparent">
      {/* Background with z-0 to ensure it's at the back but visible */}
      <div className="fixed inset-0 z-0">
        <BackgroundGradient weather={currentWeather} />
      </div>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-white text-4xl md:text-5xl font-extralight tracking-[0.3em] mb-3 uppercase drop-shadow-2xl">
                Atmosphere
              </h1>
              <p className="text-white/40 text-xs md:text-sm font-medium tracking-[0.4em] uppercase">
                Your daily ambient guide
              </p>
            </motion.div>

            <WeatherCard
              weather={currentWeather}
              {...mockWeatherData[currentWeather]}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleWeather}
                className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-2xl hover:shadow-white/10"
              >
                Change Atmosphere
              </motion.button>
              
              <p className="text-white/20 text-[10px] tracking-widest uppercase font-semibold">
                Tap to explore conditions
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
