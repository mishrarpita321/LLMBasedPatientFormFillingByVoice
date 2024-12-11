import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './components/form/Form'
import Welcome from './components/welcome/Welcome'
import Transcribe from './utility/Transcribe'
import WelcomePage from './components/welcome/WelcomePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<Form />} />
        <Route path='/transcribe' element={<Transcribe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
