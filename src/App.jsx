import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/interview" element={<Interview />} />
        <Route path="/interview-setup" element={<InterviewSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;