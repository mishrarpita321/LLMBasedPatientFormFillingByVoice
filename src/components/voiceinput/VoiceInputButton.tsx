import React, { useContext } from 'react';
import { speakWelcomeMessage } from '../../utility/utils';
import { Box } from '@mui/material';
import { WELCOME_MESSAGE_EN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../context/Context';

const VoiceInputButton: React.FC = () => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { isPlaying, setIsPlaying } = formContext;

  const navigate = useNavigate();
  const handleStart = () => {
    speakWelcomeMessage(
      WELCOME_MESSAGE_EN,
      () => setIsPlaying(true),
      () => {
        setIsPlaying(false),
        navigate('/form')
      }
    );
  };

  return (
    <Box>
      <button
        onClick={handleStart}
        disabled={isPlaying}
        className={`
        px-8 py-4 rounded-full text-lg font-semibold
        transition-all duration-300 transform hover:scale-105
        ${isPlaying
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
          }
      `}
      >
        {isPlaying ? 'Listening...' : 'Start Voice Input'}
      </button>
    </Box>
  );
};

export default VoiceInputButton;