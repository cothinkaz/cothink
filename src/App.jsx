
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import LearningGoal from './pages/LearningGoal';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LearningGoal" element={<LearningGoal />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
