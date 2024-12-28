import { createContext } from "react";

// Define the structure of the form data
export interface FormData {
    city: string;
    country: string;
    dateOfBirth: string;
    email: string;
    firstName: string;
    gender: string;
    insuranceNumber: string;
    insuranceType: string;
    lastName: string;
    medicalTreatments: string;
    treatmentDescription: string;
    visitReason: string;
}

// Define the context type for form data
interface FormContextType {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    inputIds: string[];
    setInputIds: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create context with undefined initial value
export const FormContext = createContext<FormContextType | undefined>(undefined);
