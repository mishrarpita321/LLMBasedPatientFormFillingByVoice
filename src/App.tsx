import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import { FormProvider } from './provider/ContextProvider'
import PatientIntakeForm from './forms/PatientIntakeForm'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import FormTest from './components/form/FormTest'
import DataExtractor from './components/DataExtracter'
import FlightForm from './forms/FlightForm'
import TestTTS from './components/TestTTS';


function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/patientForm" element={<FormTest />} />
          <Route path="/patient" element={<PatientIntakeForm />} />
          <Route path="/flightBooking" element={<FlightForm />} />
          <Route path="/dataExtracter" element={<DataExtractor />} />
          <Route path="/test" element={<TestTTS />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  )
}

export default App
