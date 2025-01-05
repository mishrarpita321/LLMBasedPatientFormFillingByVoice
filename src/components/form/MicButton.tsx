import { useContext, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { fillFormByVoice } from 'form-field-extractor';
import { FormContext } from '../../context/Context';
import styles from './MicrophoneButton.module.css';
import { DATA_EXTRACTION_PROMPT, FORM_SUBMISSION_MESSAGE_DE, FORM_SUBMISSION_MESSAGE_EN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { getSynthesizeText } from '../../utility/utils';

const token = import.meta.env.VITE_GPT_API_KEY;
const ttsKey = import.meta.env.VITE_TTS_API_KEY;

export default function MicButton() {
  const formContext = useContext(FormContext);
  const [isRecording, setIsRecording] = useState(false); // Tracks microphone state
  const navigate = useNavigate();
  if (!formContext) {
    throw new Error('MicButton must be used within a FormProvider');
  }

  const { formData, setFormData, language } = formContext;

  // Check if all form details are collected
  const allDetailsCollected = Object.values(formData).every((value) => value);

  // Handle microphone click logic
  const handleMicClick = async () => {
    setIsRecording(true); // Start recording
    try {
      const extractedData = await fillFormByVoice(
        'user-form',
        token,
        ttsKey,
        DATA_EXTRACTION_PROMPT,
      );

      // Update form data with extracted data
      setFormData((prevState) => ({
        ...prevState,
        ...(typeof extractedData === 'object' && extractedData !== null
          ? extractedData
          : {}),
      }));

      toast.success('Details filled successfully!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error during data extraction:', error);
      toast.error('Failed to extract data. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsRecording(false); // Stop recording after completion
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const message = language === 'en' ? FORM_SUBMISSION_MESSAGE_EN : FORM_SUBMISSION_MESSAGE_DE;
    const audioSrc = await getSynthesizeText(message, language);

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
      audio.onended = () => {
        setFormData({
          city: '',
          country: '',
          dateOfBirth: '',
          email: '',
          firstName: '',
          gender: '',
          insuranceNumber: '',
          insuranceType: '',
          lastName: '',
          medicalTreatments: '',
          treatmentDescription: '',
          visitReason: '',
        });
        navigate('/'); // Navigate after audio finishes
      };
    } else {
      navigate('/'); // Navigate if audioSrc is not available
    }
    console.log('Form data:', formData); // Log form data
  };

  return (
    <Button
      variant="contained"
      onClick={allDetailsCollected ? handleSubmit : handleMicClick}
      className={`${styles.microphoneButton} ${isRecording ? styles.speaking : ''
        }`}
      sx={{
        backgroundColor: '#4CAF50',
        width: isRecording || allDetailsCollected ? '160px' : '80px',
        height: '80px',
        borderRadius: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'all 0.3s ease-in-out',
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
}