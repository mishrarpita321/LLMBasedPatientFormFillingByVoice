import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";
import { getSynthesizeText } from "../../utility/utils";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    const text = "Hello! Welcome to our clinic. I’ll be helping you fill out a quick intake form. You can answer each question out loud. Let’s get started! Please tell me your first name and last name.";

    const handleClick = () => {
        getSynthesizeText(text, navigate);
    };
    return (
        <Box display="flex" height="100vh" sx={{ backgroundColor: "#e8f5e9" }}>
            {/* Sidebar */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                sx={{
                    width: "25%",
                    bgcolor: "#4caf50",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                }}
            >
                <Box>
                    <FaStethoscope size={100} />
                </Box>
                <Typography variant="h3" sx={{ fontSize: "2.5rem", textAlign: "center", mt: "10px" }}>
                    Praxis Jung
                </Typography>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                }}
            >
                {/* Welcome Text */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    textAlign="center"
                    mb={4}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ fontSize: "2.5rem", fontWeight: "bold", color: "#666" }}
                    >
                        Welcome to Praxis Jung
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ color: "#666", fontSize: "1.5rem", maxWidth: "600px", mx: "auto" }}
                    >
                        Please click on the start button to fill out the
                        patient intake form using your voice.
                    </Typography>
                </Box>

                {/* Image Section */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    mb={4}
                >
                    <Box
                        component="img"
                        src="5703586.png"
                        alt="Patient using application"
                        sx={{
                            width: "400px",
                            height: "auto",
                            animation: "float 3s ease-in-out infinite",
                        }}
                    />
                </Box>

                {/* Start Button */}
                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        fontSize: "1.25rem",
                        padding: "10px 40px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "#388e3c",
                        },
                    }}
                >
                    Start
                </Button>
            </Box>
        </Box>
    );
};

export default WelcomePage;