import React, { useState } from 'react';
import styles from './FlightForm.module.css';
import { fillFormByVoice } from 'ai-form-field-extractor';
import { travelPrompt } from '../constants/constants';

interface FlightFormData {
    name: string;
    email: string;
    phone: string;
    departureCity: string;
    destinationCity: string;
    travelType: 'one-way' | 'two-way';
    departDate: string;
    returnDate: string;
    travelClass: 'economy' | 'premium' | 'business' | 'first';
    additionalReq: string;
}

const FlightForm: React.FC = () => {
    const [formData, setFormData] = useState<FlightFormData>({
        name: '',
        email: '',
        phone: '',
        departureCity: '',
        destinationCity: '',
        travelType: 'one-way',
        departDate: '',
        returnDate: '',
        travelClass: 'economy',
        additionalReq: ''
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const startExtraction = performance.now();
        const extractedData = await fillFormByVoice('flight-booking-form', travelPrompt);
        const endExtraction = performance.now();
        console.log(`Time taken for model extraction: ${(endExtraction - startExtraction) / 1000} s`);
        setFormData((prevState) => ({
            ...prevState,
            ...(typeof extractedData === 'object' && extractedData !== null ? extractedData : {}),
        }));
    };

    return (
        <div className={styles.formContainer}>
            <h2>Book Your Flight</h2>
            <form onSubmit={handleSubmit} className={styles.bookingForm} id='flight-booking-form'>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.twoColumn}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.twoColumn}>
                    <div className={styles.formGroup}>
                        <label htmlFor="departureCity">Departure City</label>
                        <input
                            type="text"
                            id="departureCity"
                            name="departureCity"
                            value={formData.departureCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="destinationCity">Destination City</label>
                        <input
                            type="text"
                            id="destinationCity"
                            name="destinationCity"
                            value={formData.destinationCity}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Travel Type</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="travelType"
                                value="one-way"
                                checked={formData.travelType === 'one-way'}
                                onChange={handleChange}
                            />
                            One-way
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="travelType"
                                value="two-way"
                                checked={formData.travelType === 'two-way'}
                                onChange={handleChange}
                            />
                            Round-trip
                        </label>
                    </div>
                </div>

                <div className={styles.twoColumn}>
                    <div className={styles.formGroup}>
                        <label htmlFor="departDate">Depart Date</label>
                        <input
                            type="date"
                            id="departDate"
                            name="departDate"
                            value={formData.departDate}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.travelType === 'two-way' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="returnDate">Return Date</label>
                            <input
                                type="date"
                                id="returnDate"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="travelClass">Travel Class</label>
                    <select
                        id="travelClass"
                        name="travelClass"
                        value={formData.travelClass}
                        onChange={handleChange}
                    >
                        <option value="economy">Economy</option>
                        <option value="premium">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First Class</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="additionalReq">Additional Requirements</label>
                    <textarea
                        id="additionalReq"
                        name="additionalReq"
                        value={formData.additionalReq}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Book Flight
                </button>
            </form>
        </div>
    );
};

export default FlightForm;