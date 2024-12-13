export const DATA_EXTRACTION_PROMPT = `You are a data extraction assistant. Extract relevant information and persist it in JSON format. Merge previous context if available. Required keys: firstName, lastName, dateOfBirth, gender, city, country, insuranceType, insuranceNumber, email, visitReason, medicalTreatments, and treatmentDescription.
First and Last Name: Ensure they start with a capital letter.
Email: Ensure it is lowercase and without spaces.
Insurance Type: Respond only as 'public' or 'private' (no other text).
Insurance Number: Ensure no spaces and use uppercase letters only.
MedicalTreatments: Yes or No.
TreatmentDescription: If medical treatment is Yes, provide a description if not respond with None.`

export const WELCOME_MESSAGE_DE = "Hallo! Willkommen in unserer Klinik. Ich werde Ihnen helfen, ein kurzes Aufnahmeformular auszufüllen. Sie können jede Frage laut beantworten. Lassen Sie uns anfangen! Bitte nennen Sie mir Ihren Vor- und Nachnamen.";

export const WELCOME_MESSAGE_EN = "Hello! Welcome to our clinic. I’ll be helping you fill out a quick intake form. You can answer each question out loud. Let’s get started! Please tell me your first name and last name.";

export const MISSING_DETAILS_PROMPT = "Please provide the missing details: %s";

export const MORE_DETAILS_PROMPT = "Please provide more details about %s";

export const THANK_YOU_MESSAGE = "Thank you for providing the information. Please confirm if the details are correct, you can edit any incorrect details and submit the form by clicking on the submit button.";   

export const ENGLISH_LANGUAGE_CODE = "en-US";

export const GERMAN_LANGUAGE_CODE = "de-DE";

export const GERMAN_LANGUAGE_NAME = "de-DE-Standard-F";

export const ENGLISH_LANGUAGE_NAME = "en-US-Journey-F";