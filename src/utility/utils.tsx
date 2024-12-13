import axios from "axios";
import { DATA_EXTRACTION_PROMPT, GERMAN_LANGUAGE_CODE, GERMAN_LANGUAGE_NAME, MISSING_DETAILS_PROMPT, MORE_DETAILS_PROMPT, THANK_YOU_MESSAGE, WELCOME_MESSAGE_DE } from "../constants/constants";
const url = "https://api.openai.com/v1/chat/completions";
const token = import.meta.env.VITE_GPT_API_KEY;
const ttsKey = import.meta.env.VITE_TTS_API_KEY;

//original

//Handle TTS with navigation
interface SynthesizeTextProps {
    navigate: (path: string) => void;
    formData: Record<string, any>;  // Adjust type as needed
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const getSynthesizeText = async (speechProps: SynthesizeTextProps) => {
    const { navigate, formData, setFormData } = speechProps;
    const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${ttsKey}`;
    const payload = {
        audioConfig: {
            audioEncoding: "MP3",
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
            pitch: 0,
            speakingRate: 0,
        },
        // input: { WELCOME_MESSAGE_DE },
        input: { text: WELCOME_MESSAGE_DE },
        voice: {
            // languageCode: "en-US",
            // name: "en-US-Journey-F",
            languageCode: "de-DE",
            name: "de-DE-Standard-F",
        },
    };

    try {
        const response = await axios.post(endpoint, payload);
        const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
        const audio = new Audio(audioSrc);
        audio.play();
        audio.onended = () => {
            navigate('/form');
            handleStartRecord({ formData, setFormData });
        }
    } catch (error) {
        console.error(error);
    }
};

// Handles SpeechRecognition using Web Speech API
export const handleStartRecord = async ({ formData, setFormData }: { formData: Record<string, any>, setFormData: React.Dispatch<React.SetStateAction<any>> }): Promise<void> => {
    interface SpeechRecognitionEvent {
        results: SpeechRecognitionResultList;
    }
    try {
        // Check browser compatibility
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech Recognition is not supported in this browser.");
            return;
        }

        // Create an instance of SpeechRecognition
        const recognition = new SpeechRecognition();

        // Set properties
        recognition.lang = GERMAN_LANGUAGE_CODE;  // Adjust language as needed
        // recognition.continuous = true;

        // Start recognition
        recognition.start();

        // Handle recognition results
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcribedText = event.results[0][0].transcript;
            console.log("Transcribed Text:", transcribedText);

            // Call parseJson function with the result
            extractFromModel(transcribedText, formData, setFormData);
        };

        // Handle errors
        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
        };

        // Handle speech end
        // recognition.onend = () => {
        //     console.log("Speech recognition ended.");
        // };
    } catch (error) {
        console.error("Error starting speech recognition:", error);
    }
};

// Extract data from the model
export const extractFromModel = async (transcribedText: string, formData: Record<string, any>, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
    console.log(transcribedText, formData);
    const requestData = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: DATA_EXTRACTION_PROMPT
            },
            {
                role: "user",
                content: `Previous data: ${JSON.stringify(formData)}`
            },
            {
                role: "user",
                // content: "Context: My name is Arpita Mishra, age 23, from India."
                content: `New Input: ${transcribedText}`
            }
        ],
        temperature: 0.7
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const content = response.data.choices[0].message.content
        const jsonResponse = content.replace(/```json\n|\n```/g, '').trim();
        const parsedJson = JSON.parse(jsonResponse);
        setFormData(parsedJson);
        console.log("Extracted Data:", parsedJson);
        console.log("formData:", formData);
        checkAndPromptMissingDetails(parsedJson, setFormData);
    } catch (error) {
        console.error("LLM Error:", error);
    }
};

// Check for missing details and prompt the user
const checkAndPromptMissingDetails = async (formData: Record<string, any>, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
    // Check for missing fields in Patient Details
    let record; //flag to record audio when missing fields are found
    const patientDetailsFields = [
        "firstName", "lastName", "dateOfBirth", "gender", "city", "country", "insuranceType", "insuranceNumber", "email"
    ];
    let missingFields: string[] = [];

    // Collect missing fields from Patient Details
    patientDetailsFields.forEach(field => {
        if (!formData[field]) {
            missingFields.push(field);
        }
    });

    console.log("Missing Fields:", missingFields);
    if (missingFields.length > 0) {
        // If there are missing fields in the Patient Details, prompt the user for each missing field
        const missingFieldsText = missingFields.join(', '); // Create a message with missing fields
        const message: string = formatString(MISSING_DETAILS_PROMPT, missingFieldsText);

        // Call the TTS function to ask the user for the missing details
        handleTextToSpeech(message, formData, setFormData, record='Y');

        return; // Stop here if there are missing patient details
    }

    // If Patient Details are complete, check More Information section for missing fields
    const moreInformationFields = [
        "visitReason", "medicalTreatments", "treatmentDescription"
    ];
    missingFields = [];

    // Collect missing fields from More Information section
    moreInformationFields.forEach(field => {
        if (!formData[field]) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        // If there are missing fields in the More Information section, prompt the user for each missing field
        const missingFieldsText = missingFields.join(', '); // Create a message with missing fields
        // const message = `Please provide the following missing details: ${missingFieldsText}`;
        const message: string = formatString(MORE_DETAILS_PROMPT, missingFieldsText);

        // Call the TTS function to ask the user for the missing details
        handleTextToSpeech(message, formData, setFormData, record='Y');
    } else {
        // If all fields are complete, you can either proceed to the next step or display a success message.
        console.log("All fields are filled in.");
        handleTextToSpeech(THANK_YOU_MESSAGE, formData, setFormData, record='N');
    }
};

// Handle Text to Speech without navigation
const handleTextToSpeech = async (message: string, formData: Record<string, any>, setFormData: React.Dispatch<React.SetStateAction<any>>, record: string) => {
    const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${ttsKey}`;
    const payload = {
        audioConfig: {
            audioEncoding: "MP3",
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
            pitch: 0,
            speakingRate: 0,
        },
        input: { text: message },
        voice: {
            languageCode: GERMAN_LANGUAGE_CODE,
            name: GERMAN_LANGUAGE_NAME,
        },
    };

    try {
        const response = await axios.post(endpoint, payload);
        const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
        const audio = new Audio(audioSrc);
        audio.play();
        audio.onended = () => {
            if (record === 'Y') {
                handleStartRecord({ formData, setFormData });
            }
        }
    } catch (error) {
        console.error(error);
    }
};

// utils.js (or any other file you prefer)
export function formatString(template: string, value: string): string {
    return template.replace("%s", value);
  }  
