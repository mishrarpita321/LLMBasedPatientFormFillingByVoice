import axios from "axios";
import { DATA_EXTRACTION_PROMPT, ENGLISH_LANGUAGE_CODE, ENGLISH_LANGUAGE_NAME, GERMAN_LANGUAGE_CODE, GERMAN_LANGUAGE_NAME, MISSING_DETAILS_PROMPT_DE, MISSING_DETAILS_PROMPT_EN, THANK_YOU_MESSAGE_DE, THANK_YOU_MESSAGE_EN } from "../constants/constants";
import React from "react";
const url = "https://api.openai.com/v1/chat/completions";
const token = import.meta.env.VITE_GPT_API_KEY;
const ttsKey = import.meta.env.VITE_TTS_API_KEY;

//Handle Text to Speech
export const getSynthesizeText = async (text: string, language: string) => {
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
            languageCode: language === 'en' ? ENGLISH_LANGUAGE_CODE : GERMAN_LANGUAGE_CODE,
            name: language === 'en' ? ENGLISH_LANGUAGE_NAME : GERMAN_LANGUAGE_NAME,
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
export const handleStartRecord = (setIsRecording: (state: boolean) => void, language: string): Promise<string> => {
    setIsRecording(true); // Update recording state
    return new Promise((resolve, reject) => {
        try {
            const SpeechRecognition =
                (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (!SpeechRecognition) {
                console.error("Speech Recognition is not supported in this browser.");
                reject("Speech Recognition not supported");
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = language === 'en' ? ENGLISH_LANGUAGE_CODE : GERMAN_LANGUAGE_CODE;

            // Start recognition
            recognition.start();

            recognition.onresult = (event: any) => {
                const transcribedText = event.results[0][0].transcript;
                console.log("Transcribed Text:", transcribedText);
                setIsRecording(false); // Reset recording state
                resolve(transcribedText);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsRecording(false); // Reset recording state
                reject(event.error);
            };

            recognition.onend = () => {
                console.log("Speech recognition ended.");
                setIsRecording(false); // Ensure state reset
            };
        } catch (error) {
            console.error("Error starting speech recognition:", error);
            setIsRecording(false); // Reset recording state
            reject(error);
        }
    });
};

// Extract data from the model
export const extractFromModel = async (transcribedText: string, formData: Record<string, any>, inputIds: string[] | null = null) => {
    console.log("Extracting data from model...", formatString(DATA_EXTRACTION_PROMPT, inputIds ? inputIds.join(', ') : ''));
    const requestData = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                // content: DATA_EXTRACTION_PROMPT,
                content: formatString(DATA_EXTRACTION_PROMPT, inputIds ? inputIds.join(', ') : ''),
                // content: `You are a helpful assistant and you only reply with JSON. Extract only the following keys from the provided text: Required keys: ${inputIds}. Empty values for missing keys.`,
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
        response_format: {
            type: "json_object",
        },
        temperature: 0.7
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        const completion = JSON.parse(data.choices[0].message.content);
        console.log("Extracted Data:", completion);
        // const content = response.data.choices[0].message.content
        // const jsonResponse = content.replace(/```json\n|\n```/g, '').trim();
        // const parsedJson = JSON.parse(jsonResponse);
        // console.log("Parsed JSON:", parsedJson);
        return completion;
    } catch (error) {
        console.error("LLM Error:", error);
    }
};

// Check for missing details and prompt the user
export const checkAndPromptMissingDetails = async (
    formData: Record<string, any>,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    setIsRecording: (state: boolean) => void,
    inputIds: string[],
    language: string
) => {

    const patientDetailsFields = [
        "firstName", "lastName", "gender", "city", "country",
        "insuranceType", "insuranceNumber", "email"
    ];
    let missingFields: string[] = [];

    // Check for missing fields except dateOfBirth
    patientDetailsFields.forEach(field => {
        if (!formData[field]) {
            missingFields.push(field);
        }
    });

    // Special check for dateOfBirth
    if (!formData.dateOfBirth) {
        const dobMessage = "Please provide your date of birth. Say the day, month, and year.";
        const audioSrc = await getSynthesizeText(dobMessage, language);

        if (audioSrc) {
            await playAudio(audioSrc);
            const transcribedText = await handleStartRecord(setIsRecording, language);
            if (transcribedText) {
                const parsedJson = await extractFromModel(transcribedText, formData, inputIds);
                setFormData(parsedJson);
                await checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording, inputIds, language);
                return;
            }
        } else {
            console.error("Failed to get audio source for date of birth.");
        }
    }

    // Prompt for other missing fields
    if (missingFields.length > 0) {
        const missingFieldsText = missingFields.join(', ');
        const text = language === 'en' ? MISSING_DETAILS_PROMPT_EN : MISSING_DETAILS_PROMPT_DE;
        const message = formatString(text, missingFieldsText);
        const audioSrc = await getSynthesizeText(message, language);

        if (audioSrc) {
            await playAudio(audioSrc);
            const transcribedText = await handleStartRecord(setIsRecording, language);
            if (transcribedText) {
                const parsedJson = await extractFromModel(transcribedText, formData, inputIds);
                setFormData(parsedJson);
                await checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording, inputIds, language);
            }
        } else {
            console.error("Failed to get audio source.");
        }
        return;
    }

    // Check More Information fields
    // Step 2: Check More Information (visitReason and medicalTreatments)
    missingFields = [];
    const moreInfoFields = ["visitReason", "medicalTreatments"];

    moreInfoFields.forEach(field => {
        if (!formData[field]) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        const missingFieldsText = missingFields.join(", ");
        const text = language === 'en' ? MISSING_DETAILS_PROMPT_EN : MISSING_DETAILS_PROMPT_DE;
        const message = formatString(text, missingFieldsText);
        const audioSrc = await getSynthesizeText(message, language);

        if (audioSrc) {
            await playAudio(audioSrc);
            const transcribedText = await handleStartRecord(setIsRecording, language);

            if (transcribedText) {
                const parsedJson = await extractFromModel(transcribedText, formData, inputIds);
                setFormData(parsedJson);
                await checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording, inputIds, language);
                return;
            }
        } else {
            console.error("Failed to get audio source.");
        }
    }

    // Step 3: Ask for treatmentDescription only if medicalTreatments is "yes"
    if (formData.medicalTreatments?.toLowerCase() === "yes" && !formData.treatmentDescription) {
        const message = "Please describe the medical treatments you have received.";
        const audioSrc = await getSynthesizeText(message, language);

        if (audioSrc) {
            await playAudio(audioSrc);
            const transcribedText = await handleStartRecord(setIsRecording, language);

            if (transcribedText) {
                const parsedJson = await extractFromModel(transcribedText, formData);
                setFormData(parsedJson);
                await checkAndPromptMissingDetails(parsedJson, setFormData, setIsRecording, inputIds, language);
                return;
            }
        } else {
            console.error("Failed to get audio source for treatment description.");
        }
    }

    // Step 4: Confirmation Message
    const thankYouMessage = language === 'en' ? THANK_YOU_MESSAGE_EN : THANK_YOU_MESSAGE_DE;
    const thankYouAudioSource = await getSynthesizeText(thankYouMessage, language);
    if (thankYouAudioSource) {
        await playAudio(thankYouAudioSource);
    } else {
        console.error("Failed to get audio source for thank you message.");
    }
};


// utils.js (or any other file you prefer)
export function formatString(template: string, value: string): string {
    return template.replace("%s", value);
}


export const handleTranscription = async (inputIds: string[], prompt: string) => {
    // const prompt = "My name is John Doe, I am 30 years old, born on May 15, 1993. My email is john.doe@example.com, and I live in Germany.";
    const url = "https://api.openai.com/v1/chat/completions";
    const token = "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";
    // const requiredKeys = ["name", "age", "dob", "email", "country"];
    const requestData = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant and you only reply with JSON. Extract only the following keys from the provided text: Required keys: ${inputIds}. Empty values for missing keys.`,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        response_format: {
            type: "json_object",
        },
        temperature: 0.7
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        const completion = data.choices[0].message.content;
        // console.log(completion);
        return completion;
    } catch (error) {
        console.error(error);
    }
};
