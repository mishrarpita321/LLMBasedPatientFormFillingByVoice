export const DATA_EXTRACTION_PROMPT = `First and Last Name: Ensure they start with a capital letter.
Email: Ensure it is lowercase and without spaces and includes '@'.
Date of Birth: Ensure it is in the format YYYY-MM-DD.'
Gender: male, female or others.
Insurance Type: Respond only as 'public' or 'private' (no other text).
Insurance Number: Ensure no spaces and use uppercase letters only.
MedicalTreatments: Yes or No.
reasonForVisit: Make sure it starts with a capital letter.
TreatmentDescription: If medical treatment is Yes, provide a description if not respond with None.`

export const WELCOME_MESSAGE_DE = "Hallo! Willkommen in unserer Klinik. Ich helfe Ihnen dabei, ein kurzes Aufnahmeformular auszufüllen. Sie können jede Frage laut beantworten. Bitte klicken Sie auf die Mikrofontaste.";

export const WELCOME_MESSAGE_EN = "Hello! Welcome to our clinic. I’ll be helping you fill out a quick intake form. You can answer each question out loud. Please keep your health insurance card ready and Click on the microphone button to start.";

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

export const travelPrompt = `
Travel class: if user wants to travel in economy class, respond with 'economy'. If user wants to travel in business class, respond with 'business'. If user wants to travel in first class, respond with 'first-class'. Departure date and Return date: please provide the departure date in the format YYYY-MM-DD. and future date. If return date is null Travel type is one-way. If return date is not null Travel type is round-trip. If there is no return date , don't include the returnDate key in the json response.

   Example:
    - If the user says, "I want to book a flight for a round trip on the 15th of August and return on the 20th of August in economy class."
    - The JSON output should be:
    {
      "travelClass": "economy",
    "departureDate": "2025-08-15",
      "returnDate": "2025-08-20",
      "tripType": "round-trip"
    }

    - If the user says, "I want to book a flight for a one-way trip on the 15th of August in business class."
    - The JSON output should be:
    {
      "travelClass": "business",
      "tripType": "one-way"
    }
`;
