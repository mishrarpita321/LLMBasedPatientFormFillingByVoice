import { useState } from "react";
import { FormContext, FormData } from "../context/Context";
import { ReactNode } from "react";

interface FormProviderProps {
    children: ReactNode;
}

// Initial form data with a well-defined structure
const initialFormData: FormData = {
    city: "",
    country: "",
    dateOfBirth: "",
    email: "",
    firstName: "",
    gender: "",
    insuranceNumber: "",
    insuranceType: "",
    lastName: "",
    medicalTreatments: "",
    treatmentDescription: "",
    visitReason: "",
};

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    // Use specific type for form data
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <FormContext.Provider value={{ formData, setFormData, isPlaying, setIsPlaying }}>
            {children}
        </FormContext.Provider>
    );
};
