import { useState } from "react";
import { FormContext } from "../context/Context";
import { ReactNode } from "react";

interface FormProviderProps {
    children: ReactNode;
}
const initialFormData = {
    city: "",
    country: "",
    dateOfBirth: "",
    email: "",
    firstName: "",
    gender: "female",
    insuranceNumber: "",
    insuranceType: "",
    lastName: "",
    medicalTreatments: "",
    treatmentDescription: "",
    visitReason: "",
};

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialFormData);  // Use initialFormData

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};
