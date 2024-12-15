import React from 'react';

const SoundWave: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  return (
    <div className="flex items-center justify-center gap-2 h-24">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`
            w-2 bg-green-500 rounded-full transform transition-all duration-300
            ${isPlaying ? 'animate-soundwave' : 'h-1'}
          `}
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;