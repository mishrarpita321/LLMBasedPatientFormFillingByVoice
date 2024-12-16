import React, { useContext } from 'react';
import SoundWave from './SoundWave';
import VoiceInputButton from './VoiceInputButton';
import { FormContext } from '../../context/Context';

const VoiceInputSection: React.FC = () => {
    const formContext = useContext(FormContext);
    if (!formContext) {
      throw new Error("parseJson must be used within a FormProvider");
    }
    const { isPlaying } = formContext;
  return (
    <div className="flex items-center justify-center space-x-8">
      {isPlaying && <SoundWave isPlaying={isPlaying} />}
      <VoiceInputButton/>
      {isPlaying && <SoundWave isPlaying={isPlaying} />}
    </div>
  );
};

export default VoiceInputSection;