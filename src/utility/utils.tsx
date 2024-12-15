import axios from "axios";
import { DATA_EXTRACTION_PROMPT, ENGLISH_LANGUAGE_CODE, GERMAN_LANGUAGE_CODE, GERMAN_LANGUAGE_NAME, MISSING_DETAILS_PROMPT, MORE_DETAILS_PROMPT, THANK_YOU_MESSAGE, WELCOME_MESSAGE_DE } from "../constants/constants";
import React from "react";
const url = "https://api.openai.com/v1/chat/completions";
const token = import.meta.env.VITE_GPT_API_KEY;
const ttsKey = import.meta.env.VITE_TTS_API_KEY;

//Handle Text to Speech
export const getSynthesizeText = async (text: string) => {
    console.log("Text to Synthesize:", text);
    // const { navigate, formData, setFormData } = speechProps;
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
        return audioSrc;
    } catch (error) {
        console.error(error);
    }
};

//Play audio function
export const playAudio = async (
    audioSrc: string,
    navigate: ((path: string) => void) | null = null
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            if (!audioSrc) {
                console.error("Failed to get audio source");
                reject("Audio source not provided");
                return;
            }

            const audio = new Audio(audioSrc);

            // Play audio
            audio.play().then(() => {
                console.log("Audio playing...");
            }).catch((error) => {
                console.error("Failed to play audio:", error);
                reject(error);
                return;
            });

            // Handle when audio ends
            audio.onended = () => {
                console.log("Audio playback ended");

                if (navigate) {
                    navigate('/form');
                } else {
                    console.error("Navigation function not provided");
                }
                resolve(true);  // Resolve on successful completion
            };

            // Handle errors
            audio.onerror = () => {
                console.error("Error during audio playback");
                reject("Audio playback error");
            };

        } catch (error) {
            console.error("Error in playAudio:", error);
            reject(error);
        }
    });
};

// Handles SpeechRecognition using Web Speech API
export const handleStartRecord = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // Check browser compatibility
            const SpeechRecognition =
                (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (!SpeechRecognition) {
                console.error("Speech Recognition is not supported in this browser.");
                reject("Speech Recognition not supported");
                return;
            }

            // Create an instance of SpeechRecognition
            const recognition = new SpeechRecognition();

            // Set properties
            recognition.lang = ENGLISH_LANGUAGE_CODE;

            // Start recognition
            recognition.start();

            // Handle recognition results
            recognition.onresult = (event: any) => {
                const transcribedText = event.results[0][0].transcript;
                console.log("Transcribed Text:", transcribedText);
                resolve(transcribedText);
            };

            // Handle errors
            recognition.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                reject(event.error);
            };

            // Handle speech end (optional)
            recognition.onend = () => {
                console.log("Speech recognition ended.");
            };
        } catch (error) {
            console.error("Error starting speech recognition:", error);
            reject(error);
        }
    });
};

// Extract data from the model
export const extractFromModel = async (transcribedText: string, formData: Record<string, any>) => {
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
        return parsedJson;
    } catch (error) {
        console.error("LLM Error:", error);
    }
};

// Check for missing details and prompt the user
export const checkAndPromptMissingDetails = async (formData: Record<string, any>, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
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

        const audioSrc = await getSynthesizeText(message);
        if (audioSrc) {
            await playAudio(audioSrc);
            const transcribedText = await handleStartRecord();
            console.log("Transcribed Text from missing:", transcribedText);

            if (transcribedText) {
                const parsedJson = await extractFromModel(transcribedText, formData);
                setFormData(parsedJson);
                checkAndPromptMissingDetails(parsedJson, setFormData);
                console.log("Parsed JSON from check:", parsedJson);
            }
        } else {
            console.error("Failed to get audio source");
        }

        return; // Stop here if there are missing patient details
    }

    console.log("Patient Details are complete go for more data.");

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
        const message: string = formatString(MORE_DETAILS_PROMPT, missingFieldsText);

        // Call the TTS function to ask the user for the missing details
        const audioSrc = await getSynthesizeText(message);
        if (audioSrc) {
            const audioPlayed = await playAudio(audioSrc);
            console.log("Audio played:", audioPlayed);
            const transcribedText = await handleStartRecord();
            console.log("Transcribed Text from missing:", transcribedText);

            if (transcribedText) {
                const parsedJson = await extractFromModel(transcribedText, formData);
                setFormData(parsedJson);
                console.log("Parsed JSON from check:", parsedJson);
                checkAndPromptMissingDetails(parsedJson, setFormData);
            }
        } else {
            console.error("Failed to get audio source");
        }
    } else {
        // If all fields are complete, you can either proceed to the next step or display a success message.
        console.log("All fields are filled in.");
        const thankYouAudioSource = await getSynthesizeText(THANK_YOU_MESSAGE);

        if (thankYouAudioSource) {
            const audioPlayed = await playAudio(thankYouAudioSource);
            console.log("Thank you audio played:", audioPlayed);
            return
        } else {
            console.error("Failed to get audio source for thank you message");
        }
    }
};

// utils.js (or any other file you prefer)
export function formatString(template: string, value: string): string {
    return template.replace("%s", value);
}


// export const speakWelcomeMessage = (onStart: () => void, onEnd: () => void) => {
//     onStart();
//     const speech = new SpeechSynthesisUtterance(
//       "Welcome to Praxis Jung. Please prepare to fill out your patient intake form using voice commands. I'll guide you through the process step by step."
//     );

//     speech.onend = onEnd;
//     window.speechSynthesis.speak(speech);
//   };

export const speakWelcomeMessage = async (text: string, onStart: () => void, onEnd: () => void) => {
    onStart();
    try {
        //   const response = await fetch(
        //     'https://texttospeech.googleapis.com/v1/text:synthesize?key=YOUR_GOOGLE_API_KEY',
        //     {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify({
        //         input: { text },
        //         voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
        //         audioConfig: { audioEncoding: 'MP3' }
        //       })
        //     }
        //   );
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
        const response = await axios.post(endpoint, payload);
        // const data = await response.json();
        const audio = new Audio(`data:audio/mp3;base64,${response.data.audioContent}`);

        audio.onended = onEnd;
        audio.play();
    } catch (error) {
        console.error('Error using Google Text-to-Speech:', error);
        onEnd();
    }
};