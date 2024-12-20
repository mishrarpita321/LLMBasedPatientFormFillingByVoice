import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { GERMAN_LANGUAGE_CODE, GERMAN_LANGUAGE_NAME, WELCOME_MESSAGE_DE, WELCOME_MESSAGE_EN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../context/Context';
import axios from 'axios';

const VoiceInputButton: React.FC = () => {
  const ttsKey = import.meta.env.VITE_TTS_API_KEY;
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { isPlaying, setIsPlaying } = formContext;
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const navigate = useNavigate();

  const preloadAudio = async () => {
    try {
      const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${ttsKey}`;
      const payload = {
        audioConfig: { audioEncoding: "MP3" },
        input: { text: WELCOME_MESSAGE_DE },
        voice: { languageCode: GERMAN_LANGUAGE_CODE, name: GERMAN_LANGUAGE_NAME },
      };
      const response = await axios.post(endpoint, payload);
      setAudioSrc(`data:audio/mp3;base64,${response.data.audioContent}`);
    } catch (error) {
      console.error('Error preloading audio:', error);
    }
  };

  const handleStart = () => {
    if (!audioSrc) {
      console.error("Audio not preloaded.");
      return;
    }
    console.log('handleStart');
    setIsPlaying(true);

    const audio = new Audio(audioSrc);
    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
      navigate('/form');
    };
  };

  React.useEffect(() => {
    preloadAudio();
  }, []);

  console.log('audioSrc:', audioSrc);

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
        {isPlaying ? 'Listening...' : 'Start Voice Input'}
      </button>
    </Box>
  );
};

export default VoiceInputButton;