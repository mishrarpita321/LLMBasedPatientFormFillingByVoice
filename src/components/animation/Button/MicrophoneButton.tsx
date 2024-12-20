import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { FaMicrophone } from 'react-icons/fa';
import styles from './MicrophoneButton.module.css';
import { checkAndPromptMissingDetails, extractFromModel, getSynthesizeText, handleStartRecord, handleTranscription } from '../../../utility/utils';
import { FormContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import { FORM_SUBMISSION_MESSAGE } from '../../../constants/constants';

interface MicrophoneButtonProps {
  inputIds: string[];
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ inputIds }) => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { formData, setFormData } = formContext;

  const flowControlFn = async () => {
    const transcribedText = await handleStartRecord(setIsRecording);
    if (transcribedText) {
      const parsedJson = await extractFromModel(transcribedText, formData, inputIds);
      console.log('parsedJson:', parsedJson);
      // const parsedJson = await handleTranscription(inputIds, transcribedText);
      setFormData(parsedJson);
      checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording, inputIds);
    }
  };

  const handleSubmitButton = async () => {
    const audioSrc = await getSynthesizeText(FORM_SUBMISSION_MESSAGE);

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
    setIsRecording(true);
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