import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { FaMicrophone } from 'react-icons/fa';
import styles from './MicrophoneButton.module.css';
import { checkAndPromptMissingDetails, extractFromModel, getSynthesizeText, handleStartRecord } from '../../../utility/utils';
import { FormContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import { FORM_SUBMISSION_MESSAGE_DE, FORM_SUBMISSION_MESSAGE_EN } from '../../../constants/constants';


const MicrophoneButton: React.FC= () => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { formData, setFormData, language, inputIds } = formContext;

  const flowControlFn = async () => {
    setIsRecording(true);
    const transcribedText = await handleStartRecord(setIsRecording, language);
    if (transcribedText) {
      const parsedJson = await extractFromModel(transcribedText, formData, inputIds);
      console.log('parsedJson:', parsedJson);
      // const parsedJson = await handleTranscription(inputIds, transcribedText);
      setFormData(parsedJson);
      checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording, inputIds, language);
    }
  };

  const handleSubmitButton = async () => {
    const message = language === 'en' ? FORM_SUBMISSION_MESSAGE_EN : FORM_SUBMISSION_MESSAGE_DE;
    const audioSrc = await getSynthesizeText(message, language);

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
      audio.onended = () => {
        navigate('/'); // Navigate after audio finishes
      };
    } else {
      navigate('/'); // Navigate if audioSrc is not available
    }
  };

  const allDetailsCollected = Object.values(formData).every((value) => value);

  useEffect(() => {
    flowControlFn();
  }, []);


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