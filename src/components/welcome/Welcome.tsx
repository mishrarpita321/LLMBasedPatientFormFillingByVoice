import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSynthesizeText } from '../../utility/utils';

export default function Welcome() {
    const navigate = useNavigate();
    const text = "Hello! Welcome to our clinic. I’ll be helping you fill out a quick intake form. You can answer each question out loud. Let’s get started!";

    const handleClick = () => {
        getSynthesizeText(text, navigate);
    };

    return (
        <Container sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Welcome to Our Clinic
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                aria-label="Click to hear the welcome message"
            >
                PLAY WELCOME MESSAGE
            </Button>
        </Container>
    );
}