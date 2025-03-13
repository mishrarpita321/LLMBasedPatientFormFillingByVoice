import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ENGLISH_LANGUAGE_CODE, ENGLISH_LANGUAGE_NAME, GERMAN_LANGUAGE_CODE, GERMAN_LANGUAGE_NAME, WELCOME_MESSAGE_DE, WELCOME_MESSAGE_EN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../context/Context';

const VoiceInputButton: React.FC = () => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { isPlaying, setIsPlaying, language } = formContext;
  const navigate = useNavigate();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
  
    const voices = synth.getVoices();
  
    const selectedVoice =
      language === "en"
        ? voices.find((voice) => voice.name === ENGLISH_LANGUAGE_NAME)
        : voices.find((voice) => voice.name === GERMAN_LANGUAGE_NAME);
  
    // Assign voice and language
    utterance.voice = selectedVoice || null;
    utterance.lang = language === "en" ? ENGLISH_LANGUAGE_CODE : GERMAN_LANGUAGE_CODE;
  
    utterance.onend = () => {
      setIsPlaying(false);
      navigate("/patientForm");
    };
  
    synth.speak(utterance);
  };  

  const handleStart = () => {
    setIsPlaying(true);
    const message = language === 'en' ? WELCOME_MESSAGE_EN : WELCOME_MESSAGE_DE;
    speakText(message);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;

    const populateVoiceList = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    // Populate voices immediately if available
    populateVoiceList();

    // Add event listener for when voices change
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }

    return () => {
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = null; // Cleanup
      }
    };
  }, []);

  console.log(voices)

  return (
    <Box>
      <button
        onClick={handleStart}
        disabled={isPlaying}
        className={`px-8 py-4 rounded-full text-lg font-semibold
          transition-all duration-300 transform hover:scale-105
          ${isPlaying
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
          }`}
      >
        {isPlaying
          ? (language === 'en' ? 'Listening...' : 'Hören...')
          : (language === 'en' ? 'Start' : 'Starten')}
      </button>
    </Box>
  );
};

export default VoiceInputButton;