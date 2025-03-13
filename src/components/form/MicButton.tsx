import { useContext, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { fillFormByVoice } from 'ai-form-field-extractor';
import { FormContext } from '../../context/Context';
import styles from './MicrophoneButton.module.css';
import { DATA_EXTRACTION_PROMPT, FORM_SUBMISSION_MESSAGE_DE, FORM_SUBMISSION_MESSAGE_EN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { getSynthesizeText } from '../../utility/utils';
import SoundWave from '../voiceinput/SoundWave';

export default function MicButton() {
  const formContext = useContext(FormContext);
  const [isRecording, setIsRecording] = useState(false); // Tracks microphone state
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  if (!formContext) {
    throw new Error('MicButton must be used within a FormProvider');
  }

  const { formData, setFormData, language } = formContext;

  // Check if all form details are collected
  const allDetailsCollected = Object.values(formData).every((value) => value);

  const statusCallback = (status: { isPlaying: boolean; isRecording: boolean }) => {
    setIsPlaying(status.isPlaying);
    setIsRecording(status.isRecording);
  };

  // Handle microphone click logic
  const handleMicClick = async () => {
    try {
      const startExtraction = performance.now();
      const extractedData = await fillFormByVoice(
        'user-form',
        DATA_EXTRACTION_PROMPT,
        language,
        statusCallback
      );
      const endExtraction = performance.now();
      const timeTaken = (endExtraction - startExtraction) / 1000;
      console.log(`Time taken for model extraction: ${timeTaken} s`);

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
      console.log('Form data:', formData);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const message = language === 'en' ? FORM_SUBMISSION_MESSAGE_EN : FORM_SUBMISSION_MESSAGE_DE;
    
    try {
      // Wait until the text has been spoken
      await getSynthesizeText(message, language);
      
      // Reset form fields and navigate after speech ends
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
    } catch (error) {
      console.error("Error during speech synthesis:", error);
      navigate('/'); // Navigate if there's an error
    }
    
    console.log('Form data:', formData); // Log form data
  };  

  // const handleSubmit = async () => {
  //   const message = language === 'en' ? FORM_SUBMISSION_MESSAGE_EN : FORM_SUBMISSION_MESSAGE_DE;
  //   const audioSrc = await getSynthesizeText(message, language);

  //   if (audioSrc) {
  //     const audio = new Audio(audioSrc);
  //     audio.play();
  //     audio.onended = () => {
  //       setFormData({
  //         city: '',
  //         country: '',
  //         dateOfBirth: '',
  //         email: '',
  //         firstName: '',
  //         gender: '',
  //         insuranceNumber: '',
  //         insuranceType: '',
  //         lastName: '',
  //         medicalTreatments: '',
  //         treatmentDescription: '',
  //         visitReason: '',
  //       });
  //       navigate('/'); // Navigate after audio finishes
  //     };
  //   } else {
  //     navigate('/'); // Navigate if audioSrc is not available
  //   }
  //   console.log('Form data:', formData); // Log form data
  // };

  return (
    <div className="flex items-center justify-center space-x-8">
      {isPlaying && <SoundWave isPlaying={isPlaying} />}
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
              // className={isRecording ? styles.iconActive : styles.iconDefault}
              size={30}
              color="#fff"
            />
            {isRecording && <span>Listening...</span>}
          </>
        )}
      </Button>
      {isPlaying && <SoundWave isPlaying={isPlaying} />}
    </div>
  );
}