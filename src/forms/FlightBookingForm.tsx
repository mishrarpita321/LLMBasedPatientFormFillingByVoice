import React, { useState } from 'react';
import styles from './FlightBookingForm.module.css';
import { fillFormByText, fillFormByVoice } from 'form-field-extractor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import styles
const token = import.meta.env.VITE_GPT_API_KEY;
const ttsKey = import.meta.env.VITE_TTS_API_KEY;

interface FlightBookingData {
    passengerName: string;
    email: string;
    phoneNumber: string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    returnDate: string;
    numberOfPassengers: string;
    travelClass: string;
    additionalRequests: string;
}

const FlightBookingForm: React.FC = () => {
    const [formData, setFormData] = useState<FlightBookingData>({
        passengerName: '',
        email: '',
        phoneNumber: '',
        departureCity: '',
        destinationCity: '',
        departureDate: '',
        returnDate: '',
        numberOfPassengers: '',
        travelClass: '',
        additionalRequests: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const startExtraction = performance.now();
        const extractedData = await fillFormByText('flight-booking-form', token, formData.additionalRequests);
        const endExtraction = performance.now();
        console.log(`Time taken for model extraction: ${endExtraction - startExtraction} ms`);

        setFormData((prevState) => ({
            ...prevState,
            ...extractedData,
        }));
    };

    const triggerVoice = async (e: React.FormEvent) => {
        e.preventDefault();
        const extractedData = await fillFormByVoice('flight-booking-form', token, ttsKey);
        setFormData((prevState) => ({
            ...prevState,
            ...(typeof extractedData === 'object' && extractedData !== null ? extractedData : {}),
        }));
    };

    const formSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        toast.success('Flight Booking Submitted Successfully!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setFormData({
            passengerName: '',
            email: '',
            phoneNumber: '',
            departureCity: '',
            destinationCity: '',
            departureDate: '',
            returnDate: '',
            numberOfPassengers: '',
            travelClass: '',
            additionalRequests: '',
        });
    };

    const extractDataWithRegex = (inputText: string) => {
        const regexPatterns = {
            passengerName: /Passenger Name:\s*(.+)/i,
            email: /Email:\s*([\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,})/i,
            phoneNumber: /Phone Number:\s*(\d{10,15})/i,
            departureCity: /Departure City:\s*(.+)/i,
            destinationCity: /Destination City:\s*(.+)/i,
            departureDate: /Departure Date:\s*(\d{4}-\d{2}-\d{2})/i,
            returnDate: /Return Date:\s*(\d{4}-\d{2}-\d{2})/i,
            numberOfPassengers: /Number of Passengers:\s*(\d+)/i,
            travelClass: /Travel Class:\s*(economy|business|first-class)/i,
            additionalRequests: /Additional Requests:\s*(.+)/i,
        };

        const extractedData: Partial<FlightBookingData> = {};

        for (const [key, regex] of Object.entries(regexPatterns)) {
            const match = inputText.match(regex);
            extractedData[key as keyof FlightBookingData] = match ? match[1] : '';
        }

        return extractedData;
    };

    const handleComparison = async (e: React.FormEvent) => {
        e.preventDefault();
        //     const sampleInputText = `
        //     Passenger Name: John Doe
        //     Email: john.doe@example.com
        //     Phone Number: 1234567890
        //     Departure City: New York
        //     Destination City: Los Angeles
        //     Departure Date: 2025-01-15
        //     Return Date: 2025-01-20
        //     Number of Passengers: 2
        //     Travel Class: economy
        //     Additional Requests: Window seat preferred
        // `;
        const sampleInputText = `
        Arpita. Flight: Delhi to Berlin. Date: 05-03-2025. Window seat. Vegetarian. travelling alone in economy class returning on 31st march 2025. mail is test@gmail.com , num: 7978640399
        `;

        // Model-based extraction
        const modelExtractedData = await fillFormByText('flight-booking-form', token, sampleInputText);
        console.log('Model extracted data:', modelExtractedData);

        // Regex-based extraction
        const startRegex = performance.now();
        const regexExtractedData = extractDataWithRegex(sampleInputText);
        const endRegex = performance.now();
        console.log(`Regex extraction time: ${endRegex - startRegex} ms`);

        // Form filling
        // console.log('Filling form with model data...');
        // const 
        // const transformedModelData = modelExtractedData.reduce((acc, { id, value }) => {
        //     acc[id as keyof FlightBookingData] = value;
        //     return acc;
        // }, {} as Partial<FlightBookingData>);
        // fillFormFields(transformedModelData, setFormData);

        console.log('Filling form with regex data...');
        const startFill = performance.now();
        fillFormFields(regexExtractedData, setFormData);
        const endFill = performance.now();
        console.log(`Form filling time by regex data: ${endFill - startFill} ms`);
    };

    const fillFormFields = (data: Partial<FlightBookingData>, setFormData: React.Dispatch<React.SetStateAction<FlightBookingData>>) => {
        setFormData((prevState) => ({
            ...prevState,
            ...data,
        }));
        console.log('Form filled with regex data:', formData);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Flight Booking Form</h2>
            <form id="flight-booking-form">
                <div className={styles.formGroup}>
                    <label htmlFor="passengerName">Passenger Name:</label>
                    <input
                        type="text"
                        id="passengerName"
                        name="passengerName"
                        value={formData.passengerName}
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
                    <label htmlFor="departureCity">Departure City:</label>
                    <input
                        type="text"
                        id="departureCity"
                        name="departureCity"
                        value={formData.departureCity}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="destinationCity">Destination City:</label>
                    <input
                        type="text"
                        id="destinationCity"
                        name="destinationCity"
                        value={formData.destinationCity}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="departureDate">Departure Date:</label>
                    <input
                        type="date"
                        id="departureDate"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="returnDate">Return Date:</label>
                    <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="numberOfPassengers">Number of Passengers:</label>
                    <input
                        type="number"
                        id="numberOfPassengers"
                        name="numberOfPassengers"
                        value={formData.numberOfPassengers}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="travelClass">Travel Class:</label>
                    <select
                        id="travelClass"
                        name="travelClass"
                        value={formData.travelClass}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first-class">First Class</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="additionalRequests">Additional Requests:</label>
                    <textarea
                        id="additionalRequests"
                        name="additionalRequests"
                        value={formData.additionalRequests}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={handleSubmit}>Text</button>
                    <button onClick={triggerVoice}>Voice</button>
                    <button onClick={(e) => formSubmit(e)}>Form Submit</button>
                    <button onClick={handleComparison}>Compare Extraction Methods</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default FlightBookingForm;
