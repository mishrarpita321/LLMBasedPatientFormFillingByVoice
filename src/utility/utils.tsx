import axios from "axios";
const url = "https://api.openai.com/v1/chat/completions";
const token = import.meta.env.VITE_GPT_API_KEY;
const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
const ttsKey = import.meta.env.VITE_TTS_API_KEY;

interface ApiResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

export const parseJson = (transcribedText: string, setParsedJson: any, parsedJson: any) => {
    // The data you want to send in the request
    console.log("Transcribed Text:", transcribedText);
    const requestData = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "you are a data extraction assistant. Persist data in JSON format by analyzing and extracting relevant information. If context exists from a previous response, merge it with the new data. Required keys: first_name:str, last_name:str, birth_date:str, city:str, country:str, insurance_type:str, insurance_number:str, email:str, reason_for_visit:str, undergoing_treatment:bool, treatment_reason:str. Include missing fields from context if they are not provided in the new input."
            },
            {
                role: "user",
                content: `Previous Response (if any): ${JSON.stringify(parsedJson)}`
            },
            {
                role: "user",
                // content: "Context: My name is Arpita Mishra, age 23, from India."
                content: `New Input: ${transcribedText}`
            }
        ],
        temperature: 0.7
    };
    // Make the POST request
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json() as Promise<ApiResponse>) // Parse the JSON response
        .then(data => {
            // console.log("Response Data:", data); // Log the response
            // Now you can extract the relevant part of the response
            const content = data.choices[0].message.content;
            const jsonResponse = content.replace(/```json\n|\n```/g, '').trim();
            const parsedJson = JSON.parse(jsonResponse);
            setParsedJson(parsedJson);
            console.log("Parsed JSON:", parsedJson);
        })
        .catch(error => {
            console.error("Error:", error);
        });

};

// Start Recording
interface RecordingStates {
    setTranscription: (transcription: string) => void;
    setParsedJson: (parsedJson: any) => void;
    setIsRecording: (isRecording: boolean) => void;
    setMediaRecorder: (mediaRecorder: MediaRecorder) => void;
    parsedJson: any;
}

export const handleStartRecording = async ({ handleRecordingStates }: { handleRecordingStates: RecordingStates }) => {
    const { setTranscription, setParsedJson, setIsRecording, setMediaRecorder, parsedJson } = handleRecordingStates;
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = async (event) => {
            const audioBlob = event.data;
            const base64Audio = await audioBlobToBase64(audioBlob);

            try {
                const response = await axios.post(
                    `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
                    {
                        config: {
                            encoding: 'WEBM_OPUS',  // Correct format for browser recordings
                            sampleRateHertz: 48000, // Matches browser audio recording
                            languageCode: 'en-US',
                        },
                        audio: {
                            content: base64Audio,
                        },
                    }
                );

                if (response.data.results && response.data.results.length > 0) {
                    const newTranscription = response.data.results[0].alternatives[0].transcript;
                    setTranscription(newTranscription);  // Update state

                    // Use the updated transcription directly
                    parseJson(newTranscription, setParsedJson, parsedJson);
                } else {
                    console.log('No transcription results in the API response:', response.data);
                    setTranscription('No transcription available');
                }
            } catch (error) {
                console.error('Error with Google Speech-to-Text API:', error);
            }
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        console.log('Recording started');
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
};

// Convert Blob to Base64
const audioBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                const base64Audio = btoa(
                    new Uint8Array(reader.result as ArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                resolve(base64Audio);
            } else {
                reject(new Error('FileReader result is null'));
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
};

//Handle TTS
export const getSynthesizeText = async (text: string, navigate: (path: string) => void) => {
    const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${ttsKey}`;
    const payload = {
        audioConfig: {
            audioEncoding: "MP3",
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
            pitch: 0,
            speakingRate: 0,
        },
        input: { text },
        voice: {
            languageCode: "en-US",
            name: "en-US-Journey-F",
        },
    };

    try {
        const response = await axios.post(endpoint, payload);
        const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
        const audio = new Audio(audioSrc);
        audio.play();
        navigate('/form');
    } catch (error) {
        console.error(error);
    }
};