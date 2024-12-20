import React, { useState } from 'react';
import styles from './PatientIntakeForm.module.css';
import { handleTranscription } from '../utility/utils';

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
    const [inputIds, setInputIds] = useState<string[]>([]);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Patient Data Submitted:', formData);
        const data = await handleTranscription(inputIds, formData.testinput);
        if (data) {
            const parsedData = JSON.parse(data);

            // Ensure all fields are strings
            const sanitizedData: PatientFormData = {
                firstName: parsedData.firstName || '',
                lastName: parsedData.lastName || '',
                dateOfBirth: parsedData.dateOfBirth || '',
                phoneNumber: parsedData.phoneNumber || '',
                email: parsedData.email || '',
                address: parsedData.address || '',
                medicalHistory: parsedData.medicalHistory || '',
                testinput: formData.testinput, // keep original testinput
            };

            setFormData(sanitizedData);
            console.log('Transcription Data:', sanitizedData);
        }
    };


    React.useEffect(() => {
        const form = document.getElementById('user-form') as HTMLFormElement;
        const inputs = form?.querySelectorAll('input');
        const ids: string[] = [];
        inputs?.forEach(input => {
            if (input.id) {
                ids.push(input.id);
            }
        });

        setInputIds(ids);
    }, []);

    return (
        <div className={styles.formContainer}>
            <h2>Patient Intake Form</h2>
            <form onSubmit={handleSubmit} id="user-form">
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
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

                <div className={styles.formGroup}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PatientIntakeForm;