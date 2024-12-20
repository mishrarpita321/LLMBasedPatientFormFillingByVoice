import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Select, MenuItem, Container, Checkbox, FormControl, InputLabel } from '@mui/material';
import { FaStethoscope } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from 'react';
import { FormContext } from '../../context/Context';
import MicrophoneButton from '../animation/Button/MicrophoneButton';

export default function Form() {
    const formRef = useRef<HTMLDivElement>(null);
    const [inputIds, setInputIds] = useState<string[]>([]);
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("parseJson must be used within a FormProvider");
    }
    const { formData, setFormData } = formContext;

    useEffect(() => {
        if (formRef.current) {
            const elements = formRef.current.querySelectorAll('[id]');
            const ids: string[] = Array.from(elements)
                .map((el) => el.id)
                .filter((id) => !id.endsWith('-label')); // Exclude label IDs

            setInputIds([...new Set(ids)]); // Remove duplicates if any
        }
    }, []);

    console.log('inputIds:', inputIds);

    return (
        <Box sx={{ position: "relative" }}>
            <Box sx={{
                minHeight: "50vh",
                backgroundImage: "url('bg1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                width: "100%",
                zIndex: -1,
            }} />
            {/* Header Section */}
            <Box sx={{
                display: "flex", padding: "20px", color: "#fff"
            }}>
                <Box>
                    <FaStethoscope size={100} />
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Praxis Jung Patient Intake Form
                    </Typography>
                </Box>
            </Box>

            {/* Form Section */}
            <Container id="user-form" ref={formRef}>
                <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: 3 }}>
                    <Box sx={{ backgroundColor: "#DBEBDC" }}>
                        <Typography
                            variant="h6"
                            sx={{ marginBottom: "10px", fontWeight: "bold", color: "#4CAF50", marginLeft: "1%" }}
                        >
                            Patient Details
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField
                                label="First Name"
                                id='firstName'
                                fullWidth
                                variant="outlined"
                                value={formData?.firstName || ''}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Last Name"
                                fullWidth
                                id='lastName'
                                variant="outlined"
                                value={formData?.lastName || ''}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Date of Birth"
                                type="date" fullWidth
                                id='dateOfBirth'
                                InputLabelProps={{ shrink: true }}
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <FormLabel id="gender">Sex</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="gender"
                                id='gender'
                                name="gender"
                                value={formData?.gender || ''}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                <FormControlLabel value="female" control={<Radio />} label="female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="others" control={<Radio />} label="Others" />
                            </RadioGroup>
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField
                                label="City"
                                id='city'
                                fullWidth
                                variant="outlined"
                                value={formData?.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField
                                label="Country"
                                id='country'
                                fullWidth
                                variant="outlined"
                                value={formData?.country || ''}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <FormLabel>Type of Insurance</FormLabel>
                            <Grid container direction="row">
                                <FormControlLabel value={formData?.insuranceType || ''}
                                    control={
                                        <Checkbox
                                            checked={formData.insuranceType === "public"}
                                            id='insuranceType'
                                            onChange={(e) => setFormData({ ...formData, insuranceType: e.target.checked ? "public" : "" })}
                                        />
                                    }
                                    label="Public"
                                />
                                <FormControlLabel value={formData.insuranceType}
                                    control={
                                        <Checkbox
                                            checked={formData.insuranceType === "private"}
                                            onChange={(e) => setFormData({ ...formData, insuranceType: e.target.checked ? "private" : "" })}
                                        />
                                    }
                                    label="Private"
                                />
                            </Grid>
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField
                                label="Insurance Number"
                                id='insuranceNumber'
                                fullWidth variant="outlined"
                                value={formData?.insuranceNumber || ''}
                                onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField
                                label="Email"
                                id='email'
                                type="email" fullWidth
                                variant="outlined"
                                value={formData?.email || ''}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </Grid>
                    </Grid>

                    {/* More Information */}
                    <Box sx={{ backgroundColor: "#DBEBDC" }}>
                        <Typography
                            variant="h6"
                            sx={{ margin: "20px 0 10px", fontWeight: "bold", color: "#4CAF50", marginLeft: "1%" }}
                        >
                            More Information
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 6 }}>
                            <TextField
                                label="Describe the reason for your visit"
                                id='visitReason'
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                value={formData?.visitReason || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, visitReason: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel>Are you undergoing any other medical treatments?</InputLabel>
                                <Select
                                    labelId="medicalTreatments-label"
                                    id="medicalTreatments"
                                    value={formData?.medicalTreatments || ''}
                                    label="Are you undergoing any other medical treatments"
                                    onChange={(e) => setFormData({ ...formData, medicalTreatments: e.target.value })}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Conditionally render TextField if value is "Yes" */}
                        <Grid size={{ xs: 6, md: 6 }}>
                            <TextField
                                label="If yes, describe the reasons here"
                                id='treatmentDescription'
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                value={formData?.treatmentDescription || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, treatmentDescription: e.target.value })
                                }
                            />
                        </Grid>
                    </Grid>
                    {/* Voice Input */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "30px",
                        }}
                    >
                        <MicrophoneButton inputIds={inputIds} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}