import React, { useState } from 'react';
import { Button } from '@mui/material';
import { FaMicrophone } from 'react-icons/fa';
import styles from './MicrophoneButton.module.css';

const MicrophoneButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecord = async () => {
    setIsRecording(true);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate speech detection
    setIsRecording(false);
    return "Sample transcribed text";
  };

  const flowControlFn = async () => {
    const transcribedText = await handleStartRecord();
    console.log("Transcribed Text from flow control:", transcribedText);
    if (transcribedText) {
      //   const parsedJson = await extractFromModel(transcribedText, {});
      console.log("Parsed JSON:", "parsedJson");
    }
  };

  return (
    <Button
      variant="contained"
      onClick={flowControlFn}
      className={`${styles.microphoneButton} ${isRecording ? styles.speaking : ''}`}
      sx={{
        backgroundColor: "#4CAF50",
        width: isRecording ? "160px" : "80px",
        height: "80px",
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <FaMicrophone
        className={`
        ${isRecording ? styles.iconActive : styles.iconDefault}
      `}
        size={30}
        color="#fff"
      />
      {isRecording && (
        <span className={styles.buttonText}>
          Listening...
        </span>
      )}
    </Button>


    // <div className="flex justify-center pt-6">
    //   <button
    //     onClick={flowControlFn}
    //     disabled={isRecording}
    //     className={`
    //     relative group flex items-center space-x-2 px-6 py-3 rounded-full
    //     transition-all duration-300 transform hover:scale-105
    //     ${isRecording
    //         ? 'bg-red-500 animate-pulse'
    //         : 'bg-green-500 hover:bg-green-600'
    //       }
    //     text-white font-semibold shadow-lg hover:shadow-xl
    //   `}
    //   >
    //     <FaMicrophone className={`
    //     w-6 h-6 transition-transform duration-300
    //     ${isRecording ? 'scale-110' : 'group-hover:scale-110'}
    //   `} />
    //     <span>{isRecording ? 'Listening...' : 'Start Speaking'}</span>

    //     {/* Ripple effect when recording */}
    //     {isRecording && (
    //       <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></span>
    //     )}
    //   </button>
    // </div>
  );
};

export default MicrophoneButton;
