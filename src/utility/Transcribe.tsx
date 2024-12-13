import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, TextField } from '@mui/material';
import { FaMicrophone } from 'react-icons/fa';
import Grid from '@mui/material/Grid2';
// import { handleStartRecording } from './utils';

interface ParsedJson {
  first_name?: string;
  last_name?: string;
}

export default function Transcribe() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  // const [parsedJson, setParsedJson] = useState(null);
  const [parsedJson, setParsedJson] = useState<ParsedJson>({ first_name: '', last_name: '' });

  const handleRecordingStates = {
    setTranscription,
    setParsedJson,
    setIsRecording,
    setMediaRecorder,
    parsedJson,
  };

  const handleClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      // handleStartRecording({ handleRecordingStates });
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaRecorder]);

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      console.log('Recording stopped');
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4">Voice Input Form</Typography>

        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            mt: 4,
            backgroundColor: isRecording ? '#FF6347' : '#4CAF50',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
          }}
        >
          <FaMicrophone size={30} color="#fff" />
        </Button>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Transcription: {transcription || 'Press the mic button to start recording'}
        </Typography>

        {parsedJson && (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Parsed JSON: {JSON.stringify(parsedJson)}
          </Typography>
        )}
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 4 }}>
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              value={parsedJson.first_name || ''}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              value={parsedJson.last_name || ''}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}