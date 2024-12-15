import React from 'react';
import SoundWave from './SoundWave';
import VoiceInputButton from './VoiceInputButton';

const VoiceInputSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  return (
    <div className="flex items-center justify-center space-x-8">
      {isPlaying && <SoundWave isPlaying={isPlaying} />}
      <VoiceInputButton isPlaying={isPlaying} onPlayingChange={setIsPlaying} />
      {isPlaying && <SoundWave isPlaying={isPlaying} />}
    </div>
  );
};

export default VoiceInputSection;