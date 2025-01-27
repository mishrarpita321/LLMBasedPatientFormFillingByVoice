async function checkMicrophoneAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone is accessible');
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone is not accessible:', error);
      return false;
    }
  }
  
  checkMicrophoneAccess();
  