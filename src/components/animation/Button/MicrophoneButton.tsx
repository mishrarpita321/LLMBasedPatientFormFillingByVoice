import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { FaMicrophone } from 'react-icons/fa';
import styles from './MicrophoneButton.module.css';
import { checkAndPromptMissingDetails, extractFromModel, handleStartRecord, speakWelcomeMessage } from '../../../utility/utils';
import { FormContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import { FORM_SUBMISSION_MESSAGE } from '../../../constants/constants';

const MicrophoneButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { formData, setFormData, setIsPlaying } = formContext;

  const flowControlFn = async () => {
    const transcribedText = await handleStartRecord(setIsRecording);
    if (transcribedText) {
      const parsedJson = await extractFromModel(transcribedText, formData);
      setFormData(parsedJson);
      checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording);
    }
  };

  const handleSubmitButton = () => {
    navigate('/');
    speakWelcomeMessage(
      FORM_SUBMISSION_MESSAGE,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  };
  const allDetailsCollected = Object.values(formData).every((value) => value);

  return (
    <Button
      variant="contained"
      // onClick={flowControlFn}
      onClick={allDetailsCollected ? handleSubmitButton : flowControlFn}
      // onClick={handleSubmitButton}
      className={`${styles.microphoneButton} ${isRecording ? styles.speaking : ''}`}
      sx={{
        backgroundColor: "#4CAF50",
        width: isRecording || allDetailsCollected ? "160px" : "80px",
        height: "80px",
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {allDetailsCollected ? (
        <span style={{ fontSize: '20px' }}>Submit</span>
      ) : (
        <>
          <FaMicrophone
            className={isRecording ? styles.iconActive : styles.iconDefault}
            size={30}
            color="#fff"
          />
          {isRecording && <span>Listening...</span>}
        </>
      )}
    </Button>
  );
};

export default MicrophoneButton;