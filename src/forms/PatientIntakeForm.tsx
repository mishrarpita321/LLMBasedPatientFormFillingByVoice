import React, { useState } from 'react';
import styles from './PatientIntakeForm.module.css';
import { fillFormByText, fillFormByVoice } from 'ai-form-field-extractor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import styles

interface PatientFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    address: string;
    medicalHistory: string;
    testinput: string;
}

const PatientIntakeForm: React.FC = () => {
    const [formData, setFormData] = useState<PatientFormData>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        medicalHistory: '',
        testinput: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const prompt = "Medical history: if user doesnt have any medical history, respond with 'none'. If user has medical history, provide a brief description.";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const extractedData = await fillFormByText('user-form', formData.testinput);
        setFormData((prevState) => ({
            ...prevState,
            ...extractedData,
        }));
    };

    const triggerVoice = async (e: React.FormEvent) => {
        e.preventDefault();
        const extractedData = await fillFormByVoice('user-form', prompt);
        setFormData((prevState) => ({
            ...prevState,
            ...(typeof extractedData === 'object' && extractedData !== null ? extractedData : {}),
        }));
    };

    const formSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const inputFields = document.querySelectorAll('input, textarea');
        inputFields.forEach((field) => {
            (field as HTMLInputElement | HTMLTextAreaElement).style.border = '1px solid #ccc';
        });
        
        toast.success('Patient Data Submitted Successfully!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            address: '',
            medicalHistory: '',
            testinput: '',
        });
    };
    
    return (
        <div className={styles.formContainer}>
            <h2>Patient Intake Form</h2>
            <form id="user-form">
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="medicalHistory">Medical History:</label>
                    <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        rows={4}
                    // required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="medicalHistory">Test input:</label>
                    <textarea
                        id="testinput"
                        name="testinput"
                        value={formData.testinput}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={handleSubmit}>Text</button>
                    <button onClick={triggerVoice}>Voice</button>
                    <button onClick={(e) => formSubmit(e)}>Form Submit</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default PatientIntakeForm;