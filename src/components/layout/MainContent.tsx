import React from 'react';
import ClinicImage from '../ClinicImage';
import VoiceInputSection from '../voiceinput/VoiceInputSection';
import WelcomeHeader from '../WelcomeHeader';

const MainContent: React.FC= () => {
  return (
    <div className="flex-1 bg-green-50 flex flex-col items-center justify-center p-8">
      <WelcomeHeader />
      <ClinicImage />
      <VoiceInputSection />
    </div>
  );
};

export default MainContent;