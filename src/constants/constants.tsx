export const DATA_EXTRACTION_PROMPT = `You are a data extraction assistant. Extract relevant information and persist it in JSON format. Merge previous context if available. Required keys: %s.
First and Last Name: Ensure they start with a capital letter.
Email: Ensure it is lowercase and without spaces.
Date of Birth: Ensure it is in the format YYYY-MM-DD.
Insurance Type: Respond only as 'public' or 'private' (no other text).
Insurance Number: Ensure no spaces and use uppercase letters only.
MedicalTreatments: Yes or No.
TreatmentDescription: If medical treatment is Yes, provide a description if not respond with None.`

export const WELCOME_MESSAGE_DE = "Hallo! Willkommen in unserer Klinik. Ich werde Ihnen helfen, ein kurzes Aufnahmeformular auszufüllen. Sie können jede Frage laut beantworten. Lassen Sie uns anfangen! Bitte nennen Sie mir Ihren Vor- und Nachnamen.";

export const WELCOME_MESSAGE_EN = "Hello! Welcome to our clinic. I’ll be helping you fill out a quick intake form. You can answer each question out loud. Let’s get started! Please tell me your first name and last name.";

export const ENGLISH_LANGUAGE_CODE = "en-US";

export const GERMAN_LANGUAGE_CODE = "de-DE";

export const GERMAN_LANGUAGE_NAME = "de-DE-Standard-F";

export const ENGLISH_LANGUAGE_NAME = "en-US-Journey-F";

export const TEST_AUDIO = "HELLO";

export const MISSING_DETAILS_PROMPT_EN = "Please provide the missing details: %s"; 

export const MISSING_DETAILS_PROMPT_DE = "Bitte geben Sie die fehlenden Details an: %s";

export const MORE_DETAILS_PROMPT_EN = "Please provide more details about %s"; 

export const MORE_DETAILS_PROMPT_DE = "Bitte geben Sie mehr Details zu %s an";

export const THANK_YOU_MESSAGE_EN = "Thank you for providing the information. Please confirm if the details are correct, you can edit any incorrect details and submit the form by clicking on the submit button."; 

export const THANK_YOU_MESSAGE_DE = "Vielen Dank für die Bereitstellung der Informationen. Bitte bestätigen Sie, ob die Angaben korrekt sind. Sie können falsche Angaben bearbeiten und das Formular absenden, indem Sie auf die Schaltfläche 'Absenden' klicken.";

export const FORM_SUBMISSION_MESSAGE_EN = "Thank you for providing your information. Please wait in the waiting room. Our staff will call you shortly for your checkup."; 

export const FORM_SUBMISSION_MESSAGE_DE = "Vielen Dank für die Bereitstellung Ihrer Informationen. Bitte warten Sie im Wartezimmer. Unser Personal wird Sie in Kürze zu Ihrem Check-up aufrufen.";
