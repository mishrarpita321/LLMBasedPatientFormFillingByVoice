import React, { useState } from 'react';
import styles from './FlightBookingForm.module.css';
import { fillFormByText, fillFormByVoice } from 'ai-form-field-extractor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import styles
import { travelPrompt } from '../constants/constants';

interface FlightBookingData {
    passengerName: string;
    email: string;
    phoneNumber: string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    travelType: string;
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
        travelType: '',
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
        const extractedData = await fillFormByText('flight-booking-form', formData.additionalRequests);
        const endExtraction = performance.now();
        console.log(`Time taken for model extraction: ${endExtraction - startExtraction} ms`);

        setFormData((prevState) => ({
            ...prevState,
            ...extractedData,
        }));
    };

    const triggerVoice = async (e: React.FormEvent) => {
        e.preventDefault();
        const startExtraction = performance.now();
        const extractedData = await fillFormByVoice('flight-booking-form', travelPrompt);
        const endExtraction = performance.now();
        console.log(`Time taken for model extraction: ${(endExtraction - startExtraction)/1000} s`);
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
            travelType: '',
            departureDate: '',
            returnDate: '',
            numberOfPassengers: '',
            travelClass: '',
            additionalRequests: '',
        });
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.header}>
                <h2>Flight Booking Form</h2>
            </div>

            <form id="flight-booking-form" className={styles.gridForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="passengerName">Passenger Name:</label>
                    <input type="text" id="passengerName" name="passengerName" value={formData.passengerName} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="departureCity">Departure City:</label>
                    <input type="text" id="departureCity" name="departureCity" value={formData.departureCity} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="destinationCity">Destination City:</label>
                    <input type="text" id="destinationCity" name="destinationCity" value={formData.destinationCity} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Travel Type</label>
                    <div className={styles.checkboxGroup}>
                        <label>
                            <input type="radio" name="travelType" value="one-way" checked={formData.travelType === 'one-way'} onChange={handleChange} />
                            One-way
                        </label>
                        <label>
                            <input type="radio" name="travelType" value="round-trip" checked={formData.travelType === 'round-trip'} onChange={handleChange} />
                            Round-trip
                        </label>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="departureDate">Departure Date:</label>
                    <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="returnDate">Return Date:</label>
                    <input type="date" id="returnDate" name="returnDate" value={formData.returnDate} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="numberOfPassengers">Number of Passengers:</label>
                    <input type="number" id="numberOfPassengers" name="numberOfPassengers" value={formData.numberOfPassengers} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="travelClass">Travel Class:</label>
                    <select id="travelClass" name="travelClass" value={formData.travelClass} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first-class">First Class</option>
                    </select>
                </div>

                <div className={styles.formGroup} style={{ gridColumn: "1 / span 2" }}>
                    <label htmlFor="additionalRequests">Additional Requests:</label>
                    <textarea id="additionalRequests" name="additionalRequests" value={formData.additionalRequests} onChange={handleChange} rows={3} />
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={triggerVoice}>Voice</button>
                    <button onClick={(e) => formSubmit(e)}>Form Submit</button>
                </div>
            </form>

            <ToastContainer />
        </div>

    );
};

export default FlightBookingForm;
