import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './notused/Form'
import WelcomePage from './pages/WelcomePage'
import { FormProvider } from './provider/ContextProvider'
import PatientIntakeForm from './forms/PatientIntakeForm'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import FormTest from './components/form/FormTest'
import FlightBookingForm from './forms/FlightBookingForm'


function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/formTest" element={<FormTest />} />
          <Route path="/form" element={<Form />} />
          <Route path="/patient" element={<PatientIntakeForm />} />
          <Route path="/flightBooking" element={<FlightBookingForm />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  )
}

export default App
