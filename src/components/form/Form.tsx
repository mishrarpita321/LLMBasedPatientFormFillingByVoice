import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Select, MenuItem, Button, Container, Checkbox } from '@mui/material';
import { FaStethoscope, FaMicrophone } from "react-icons/fa";

export default function Form() {
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
            <Container>
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
                            <TextField label="First Name" fullWidth variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Last Name" fullWidth variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <FormLabel id="gender-label">Sex</FormLabel>
                            <RadioGroup row aria-labelledby="gender-label" name="gender">
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="others" control={<Radio />} label="Others" />
                            </RadioGroup>
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="City" fullWidth variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Country" fullWidth variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <FormLabel>Type of Insurance</FormLabel>
                            <Grid container direction="row">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        // checked={selectedInsurance === "public"}
                                        // onChange={() => handleCheckboxChange("public")}
                                        />
                                    }
                                    label="Public"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        // checked={selectedInsurance === "private"}
                                        // onChange={() => handleCheckboxChange("private")}
                                        />
                                    }
                                    label="Private"
                                />
                            </Grid>
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Insurance Number" fullWidth variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField label="Email" type="email" fullWidth variant="outlined" />
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
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }}>
                            <Select fullWidth displayEmpty defaultValue="">
                                <MenuItem value="" disabled>
                                    Are you undergoing any other medical treatments?
                                </MenuItem>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }}>
                            <TextField
                                label="If yes, describe the reasons here"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
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
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#4CAF50",
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}
                        >
                            <FaMicrophone size={30} color="#fff" />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}