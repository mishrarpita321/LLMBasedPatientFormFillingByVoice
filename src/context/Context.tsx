import { createContext } from "react";
  
interface FormContextType {
    formData: Record<string, any>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);
