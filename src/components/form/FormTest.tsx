// PatientIntakeForm.js
import styles from './Form.module.css';
import { FaStethoscope } from 'react-icons/fa';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { FormContext } from '../../context/Context';
import MicButton from './MicButton';
import { ToastContainer } from 'react-toastify';

const PatientIntakeForm = () => {
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("parseJson must be used within a FormProvider");
    }
    const { formData, setFormData } = formContext;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <div style={{
                minHeight: "50vh",
                backgroundImage: "url('bg1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                width: "100%",
                zIndex: -1,
            }} />
            {/* Header Section */}
            <div style={{
                display: "flex", padding: "20px", color: "#fff"
            }}>
                <div>
                    <FaStethoscope size={100} />
                </div>
                <div
                    style={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Praxis Jung Patient Intake Form
                    </Typography>
                </div>
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form} id="user-form">
                    <div style={{ backgroundColor: "#DBEBDC" }}>
                        <Typography
                            variant="h6"
                            sx={{ marginBottom: "10px", fontWeight: "bold", color: "#4CAF50", marginLeft: "1%" }}
                        >
                            Patient Details
                        </Typography>
                    </div>
                    <fieldset className={styles.section}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Gender</label>
                                <div className={styles.radioGroup}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={handleChange}
                                        />{' '}
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={handleChange}
                                        />{' '}
                                        Female
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="gender"
                                            value="others"
                                            checked={formData.gender === 'others'}
                                            onChange={handleChange}
                                        />{' '}
                                        Others
                                    </label>
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Type of Insurance</label>
                                <div className={styles.checkboxGroup}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="insuranceType"
                                            id="insuranceType"
                                            value="private"
                                            checked={formData.insuranceType === 'private'}
                                            onChange={handleChange}
                                        />
                                        Private
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="insuranceType"
                                            id="insuranceType"
                                            value="public"
                                            checked={formData.insuranceType === 'public'}
                                            onChange={handleChange}
                                        />
                                        Public
                                    </label>
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="insuranceNumber">Insurance Number</label>
                                <input
                                    type="text"
                                    id="insuranceNumber"
                                    name="insuranceNumber"
                                    value={formData.insuranceNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <div style={{ backgroundColor: "#DBEBDC" }}>
                        <Typography
                            variant="h6"
                            sx={{ margin: "20px 0 10px", fontWeight: "bold", color: "#4CAF50", marginLeft: "1%" }}
                        >
                            More Information
                        </Typography>
                    </div>
                    <fieldset className={styles.section}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="visitReason">Reason for Visit</label>
                                <input
                                    type="text"
                                    id="visitReason"
                                    name="visitReason"
                                    value={formData.visitReason}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="medicalTreatments">Undergoing Medical Treatments</label>
                                <select
                                    id="medicalTreatments"
                                    name="medicalTreatments"
                                    value={formData.medicalTreatments}
                                    onChange={handleChange}
                                    style={{ border: "1px solid #ccc", borderRadius: '4px', padding: '5px' }}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldFull}>
                                <label htmlFor="treatmentDescription">Description</label>
                                <textarea
                                    id="treatmentDescription"
                                    name="treatmentDescription"
                                    rows={4}
                                    value={formData.treatmentDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <div className={styles.microphone}>
                        <MicButton />
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default PatientIntakeForm;
